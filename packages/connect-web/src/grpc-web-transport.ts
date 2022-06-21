// Copyright 2021-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type {
  AnyMessage,
  BinaryReadOptions,
  BinaryWriteOptions,
  IMessageTypeRegistry,
  Message,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { ConnectError } from "./connect-error.js";
import { Code, codeFromGrpcWebHttpStatus } from "./code.js";
import { decodeBinaryHeader } from "./http-headers.js";
import { Status } from "./grpc/status/v1/status_pb.js";
import type { ClientTransport } from "./client-transport.js";
import type { StreamResponse, UnaryResponse } from "./client-interceptor.js";
import {
  Interceptor,
  runServerStream,
  runUnary,
  UnaryRequest,
} from "./client-interceptor.js";
import { createEnvelopeReadableStream, encodeEnvelopes } from "./envelope.js";
import { grpcStatusDetailsBinName } from "./private/grpc-status.js";
import { connectErrorFromFetchError } from "./private/connect-error-from-fetch-error.js";

export interface GrpcWebTransportOptions {
  /**
   * Base URI for all HTTP requests.
   *
   * Requests will be made to <baseUrl>/<package>.<service>/method
   *
   * Example: `baseUrl: "https://example.com/my-api"`
   *
   * This will make a `POST /my-api/my_package.MyService/Foo` to
   * `example.com` via HTTPS.
   */
  baseUrl: string;

  /**
   * Controls what the fetch client will do with credentials, such as
   * Cookies. The default value is "same-origin". For reference, see
   * https://fetch.spec.whatwg.org/#concept-request-credentials-mode
   */
  credentials?: RequestCredentials;

  // TODO explain
  // TODO instead of requiring the registry upfront, provide a function to parse raw details?
  errorDetailRegistry?: IMessageTypeRegistry;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;

  // TODO
  interceptors?: Interceptor[];
}

export function createGrpcWebTransport(
  options: GrpcWebTransportOptions
): ClientTransport {
  const transportOptions = options;
  return {
    async unary<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: Headers,
      message: PartialMessage<I>
    ): Promise<UnaryResponse<O>> {
      try {
        return runUnary<I, O>(
          {
            stream: false,
            service,
            method,
            url: `${options.baseUrl}/${service.typeName}/${method.name}`,
            init: {
              method: "POST",
              credentials: options.credentials ?? "same-origin",
              redirect: "error",
              mode: "cors",
            },
            header: createGrpcWebRequestHeaders(header, timeoutMs),
            message:
              message instanceof method.I ? message : new method.I(message),
            signal: signal ?? new AbortController().signal,
          },
          async (unaryRequest) => {
            const response = await fetch(unaryRequest.url, {
              ...unaryRequest.init,
              headers: unaryRequest.header,
              signal: unaryRequest.signal,
              body: createGrpcWebRequestBody(
                unaryRequest.message,
                options.binaryOptions
              ),
            });
            const headError =
              extractHttpStatusError(response) ??
              extractContentTypeError(response.headers) ??
              extractDetailsError(
                response.headers,
                transportOptions.errorDetailRegistry
              ) ??
              extractHeadersError(response.headers);
            if (headError) {
              throw headError;
            }
            if (!response.body) {
              throw "missing response body";
            }
            const reader = createEnvelopeReadableStream(
              response.body
            ).getReader();
            const messageResult = await reader.read();
            if (messageResult.done) {
              throw "missing message";
            }
            if (messageResult.value.flags !== 0b00000000) {
              throw "unexpected trailer";
            }
            const message = method.O.fromBinary(
              messageResult.value.data,
              transportOptions.binaryOptions
            );
            const trailerResult = await reader.read();
            if (trailerResult.done) {
              throw "missing trailer";
            }
            if ((trailerResult.value.flags & trailerFlag) !== trailerFlag) {
              throw "missing trailer";
            }
            const trailer = parseGrpcWebTrailer(trailerResult.value.data);
            const trailerError =
              extractDetailsError(
                trailer,
                transportOptions.errorDetailRegistry
              ) ?? extractHeadersError(trailer);
            if (trailerError) {
              throw trailerError;
            }
            const eofResult = await reader.read();
            if (!eofResult.done) {
              throw "extraneous data";
            }
            return <UnaryResponse<O>>{
              stream: false,
              header: response.headers,
              message,
              trailer,
            };
          },
          transportOptions.interceptors
        );
      } catch (e) {
        throw connectErrorFromFetchError(e);
      }
    },
    async serverStream<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      message: PartialMessage<I>
    ): Promise<StreamResponse<O>> {
      try {
        return runServerStream<I, O>(
          <UnaryRequest<I>>{
            stream: false,
            service,
            method,
            url: `${options.baseUrl}/${service.typeName}/${method.name}`,
            init: {
              method: "POST",
              credentials: options.credentials ?? "same-origin",
              redirect: "error",
              mode: "cors",
            },
            header: createGrpcWebRequestHeaders(header, timeoutMs),
            message:
              message instanceof method.I ? message : new method.I(message),
            signal: signal ?? new AbortController().signal,
          },
          async (unaryRequest: UnaryRequest<I>): Promise<StreamResponse<O>> => {
            const response = await fetch(unaryRequest.url, {
              ...unaryRequest.init,
              headers: unaryRequest.header,
              signal: unaryRequest.signal,
              body: createGrpcWebRequestBody(
                unaryRequest.message,
                options.binaryOptions
              ),
            });

            const err =
              extractHttpStatusError(response) ??
              extractContentTypeError(response.headers) ??
              extractDetailsError(
                response.headers,
                transportOptions.errorDetailRegistry
              ) ??
              extractHeadersError(response.headers);
            if (err) {
              throw err;
            }
            if (!response.body) {
              throw "missing response body";
            }

            const reader = createEnvelopeReadableStream(
              response.body
            ).getReader();

            let endStreamReceived = false;
            let messageReceived = false;
            return <StreamResponse<O>>{
              stream: true,
              service,
              method,
              header: response.headers,
              trailer: new Headers(),
              async read(): Promise<ReadableStreamDefaultReadResult<O>> {
                const result = await reader.read();
                if (result.done) {
                  if (messageReceived && !endStreamReceived) {
                    throw new ConnectError("missing trailers", Code.Internal);
                  }
                  return {
                    done: true,
                    value: undefined,
                  };
                }
                if ((result.value.flags & trailerFlag) === trailerFlag) {
                  endStreamReceived = true;
                  const trailer = parseGrpcWebTrailer(result.value.data);
                  const err =
                    extractDetailsError(
                      trailer,
                      transportOptions.errorDetailRegistry
                    ) ?? extractHeadersError(trailer);
                  if (err) {
                    throw err;
                  }
                  // TODO should strip everything but user payload
                  trailer.forEach((value, key) =>
                    this.trailer.append(key, value)
                  );
                  return {
                    done: true,
                    value: undefined,
                  };
                }
                messageReceived = true;
                return {
                  done: false,
                  value: method.O.fromBinary(
                    result.value.data,
                    options.binaryOptions
                  ),
                };
              },
            };
          },
          options.interceptors
        );
      } catch (e) {
        throw connectErrorFromFetchError(e);
      }
    },
  };
}

function createGrpcWebRequestBody(
  message: AnyMessage,
  options: Partial<BinaryWriteOptions> | undefined
): BodyInit {
  return encodeEnvelopes({
    data: message.toBinary(options),
    flags: messageFlag,
  });
}

const messageFlag = 0b00000000;
const trailerFlag = 0b10000000;

function createGrpcWebRequestHeaders(
  headers: HeadersInit | undefined,
  timeoutMs: number | undefined
): Headers {
  const result = new Headers(headers);
  // We provide the most explicit description for our content type.
  // Note that we do not support the grpc-web-text format.
  // https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md#protocol-differences-vs-grpc-over-http2
  result.set("Content-Type", "application/grpc-web+proto");
  // Some servers may rely on the request header `X-Grpc-Web` to identify
  // gRPC-web requests. For example the proxy by improbable:
  // https://github.com/improbable-eng/grpc-web/blob/53aaf4cdc0fede7103c1b06f0cfc560c003a5c41/go/grpcweb/wrapper.go#L231
  result.set("X-Grpc-Web", "1");
  // Note that we do not comply with recommended structure for the
  // user-agent string.
  // https://github.com/grpc/grpc/blob/c462bb8d485fc1434ecfae438823ca8d14cf3154/doc/PROTOCOL-HTTP2.md#user-agents
  result.set("X-User-Agent", "@bufbuild/connect-web");
  if (timeoutMs !== undefined) {
    result.set("Grpc-Timeout", `${timeoutMs}m`);
  }
  return result;
}

function extractContentTypeError(header: Headers): ConnectError | undefined {
  const type = header.get("Content-Type");
  switch (type?.toLowerCase()) {
    case "application/grpc-web":
    case "application/grpc-web+proto":
      return undefined;
    case "application/grpc-web-text":
    case "application/grpc-web-text+proto":
      return new ConnectError("grpc-web-text is not supported", Code.Internal);
    case undefined:
    case null:
    default:
      return new ConnectError(
        `unexpected content type: ${String(type)}`,
        Code.Internal
      );
  }
}

function extractHttpStatusError(response: Response): ConnectError | undefined {
  const code = codeFromGrpcWebHttpStatus(response.status);
  if (!code) {
    return undefined;
  }
  return new ConnectError(
    decodeURIComponent(response.headers.get("grpc-message") ?? ""),
    code
  );
}

function extractHeadersError(header: Headers): ConnectError | undefined {
  const value = header.get("grpc-status");
  if (value === null) {
    return undefined;
  }
  const code = parseInt(value);
  if (code === 0) {
    return undefined;
  }
  if (!(code in Code)) {
    return new ConnectError(
      `invalid grpc-status: ${value}`,
      Code.Internal,
      undefined,
      header
    );
  }
  return new ConnectError(
    decodeURIComponent(header.get("grpc-message") ?? ""),
    code,
    undefined,
    header
  );
}

function extractDetailsError(
  header: Headers,
  typeRegistry?: IMessageTypeRegistry
): ConnectError | undefined {
  const grpcStatusDetailsBin = header.get(grpcStatusDetailsBinName);
  if (grpcStatusDetailsBin == null) {
    return undefined;
  }
  try {
    const status = decodeBinaryHeader(grpcStatusDetailsBin, Status);
    // Prefer the protobuf-encoded data to the headers.
    if (status.code == 0) {
      return undefined;
    }
    const error = new ConnectError(
      status.message,
      status.code,
      undefined,
      header
    );
    // TODO deduplicate with similar logic in ConnectError
    for (const any of status.details) {
      const typeName = any.typeUrl.substring(any.typeUrl.lastIndexOf("/") + 1);
      if (!typeRegistry) {
        error.rawDetails.push(any);
        continue;
      }
      const messageType = typeRegistry.findMessage(typeName);
      if (messageType) {
        const message = new messageType();
        if (any.unpackTo(message)) {
          error.details.push(message);
        }
      }
    }
    return error;
  } catch (e) {
    return new ConnectError(
      grpcStatusDetailsBinName,
      Code.Internal,
      undefined,
      header
    );
  }
}

function parseGrpcWebTrailer(data: Uint8Array): Headers {
  const headers = new Headers();
  const lines = String.fromCharCode(...data).split("\r\n");
  for (const line of lines) {
    if (line === "") {
      continue;
    }
    const i = line.indexOf(":");
    if (i > 0) {
      const name = line.substring(0, i).trim();
      const value = line.substring(i + 1).trim();
      headers.append(name, value);
    }
  }
  return headers;
}
