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

import {
  appendHeaders,
  connectCodeFromHttpStatus,
  connectCreateRequestHeader,
  connectEndStreamFlag,
  connectEndStreamFromJson,
  ConnectError,
  connectErrorFromJson,
  connectExpectContentType,
  connectTrailerDemux,
  createClientMethodSerializers,
  createMethodUrl,
  encodeEnvelope,
  Interceptor,
  runStreaming,
  runUnary,
  StreamingConn,
  Transport,
  UnaryRequest,
  UnaryResponse,
} from "@bufbuild/connect-core";
import type {
  AnyMessage,
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  Message,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { connectErrorFromNodeReason } from "./private/connect-error-from-node.js";
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";
import { defer } from "./private/defer.js";
import { nodeRequest } from "./private/node-http-request.js";
import {
  end,
  jsonParse,
  readEnvelope,
  readToEnd,
  write,
} from "./private/io.js";
import * as http from "http";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./private/web-header-to-node-headers.js";

const messageFlag = 0b00000000;

export interface ConnectHttpTransportOptions {
  /**
   * Base URI for all HTTP requests.
   *
   * Requests will be made to <baseUrl>/<package>.<service>/method
   *
   * Example: `baseUrl: "http://example.com/my-api"`
   *
   * This will make a `POST /my-api/my_package.MyService/Foo` to
   * `example.com` via HTTPS.
   */
  baseUrl: string;

  /**
   * By default, clients use the binary format for gRPC-web, because
   * not all gRPC-web implementations support JSON.
   */
  useBinaryFormat?: boolean;

  /**
   * Interceptors that should be applied to all calls running through
   * this transport. See the Interceptor type for details.
   */
  interceptors?: Interceptor[];

  /**
   * Options for the JSON format.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
}

/**
 * Create a Transport for the connect protocol on Http.
 *
 */
export function createConnectHttpTransport(
  options: ConnectHttpTransportOptions
): Transport {
  const useBinaryFormat = options.useBinaryFormat ?? false;
  return {
    async unary<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      message: PartialMessage<I>
    ): Promise<UnaryResponse<O>> {
      try {
        const { normalize, parse } = createClientMethodSerializers(
          method,
          useBinaryFormat,
          options.jsonOptions,
          options.binaryOptions
        );
        const createRequestHeader = connectCreateRequestHeader.bind(
          null,
          method.kind,
          useBinaryFormat
        );

        const validateContentType = connectExpectContentType.bind(
          null,
          method.kind,
          useBinaryFormat
        );

        return await runUnary<I, O>(
          {
            stream: false,
            service,
            method,
            url: createMethodUrl(options.baseUrl, service, method).toString(),
            init: {},
            header: createRequestHeader(timeoutMs, header),
            message: normalize(message),
            signal: signal ?? new AbortController().signal,
          },
          async (req: UnaryRequest<I>): Promise<UnaryResponse<O>> => {
            const response = await nodeRequest({
              req,
              useBinaryFormat,
              jsonOptions: options.jsonOptions,
              binaryOptions: options.binaryOptions,
            });

            const responseHeaders = nodeHeaderToWebHeader(response.headers);
            await validateResponseHeader(
              response.statusCode as number,
              responseHeaders,
              response
            );
            validateContentType(responseHeaders.get("Content-Type"));

            const [header, trailer] = connectTrailerDemux(responseHeaders);
            return {
              stream: false,
              service,
              method,
              header,
              message: parse(await readToEnd(response)),
              trailer,
            };
          },
          options.interceptors
        );
      } catch (e) {
        throw connectErrorFromNodeReason(e);
      }
    },
    async stream<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined
    ): Promise<StreamingConn<I, O>> {
      const { normalize, serialize, parse } = createClientMethodSerializers(
        method,
        useBinaryFormat,
        options.jsonOptions,
        options.binaryOptions
      );

      const validateContentType = connectExpectContentType.bind(
        null,
        method.kind,
        useBinaryFormat
      );

      const createRequestHeader = connectCreateRequestHeader.bind(
        null,
        method.kind,
        useBinaryFormat
      );
      return runStreaming<I, O>(
        {
          stream: true,
          service,
          method,
          url: createMethodUrl(options.baseUrl, service, method).toString(),
          init: {
            method: "POST",
            redirect: "error",
            mode: "cors",
          },
          signal: signal ?? new AbortController().signal,
          header: createRequestHeader(timeoutMs, header),
        },
        async (req) => {
          try {
            const endpoint = new URL(req.url);
            const stream = http.request(req.url, {
              host: endpoint.hostname,
              port: +endpoint.port,
              headers: webHeaderToNodeHeaders(req.header),
              method: "POST",
              path: endpoint.pathname,
              signal: req.signal,
              protocol: endpoint.protocol,
            });

            const responsePromise = new Promise<http.IncomingMessage>(
              (resolve) => {
                stream.on("response", (res) => {
                  resolve(res);
                });
              }
            );

            let endStreamReceived = false;
            const responseTrailer = defer<Headers>();
            const responseHeader = responsePromise.then((res) =>
              nodeHeaderToWebHeader(res.headers)
            );
            const conn: StreamingConn<I, O> = {
              ...req,
              responseHeader,
              responseTrailer,
              closed: false,
              async send(message: PartialMessage<I>) {
                if (stream.writableEnded) {
                  throw new ConnectError(
                    "cannot send, stream is already closed"
                  );
                }
                const enveloped = encodeEnvelope(
                  messageFlag,
                  serialize(normalize(message))
                );
                await write(stream, enveloped);
              },
              async close() {
                if (stream.writableEnded) {
                  throw new ConnectError(
                    "cannot close, stream is already closed"
                  );
                }
                this.closed = true;
                await end(stream);
              },
              async read(): Promise<ReadableStreamReadResultLike<O>> {
                const response = await responsePromise;
                await validateResponseHeader(
                  response.statusCode as number,
                  await responseHeader,
                  response
                );
                validateContentType((await responseHeader).get("Content-Type"));

                try {
                  const result = await readEnvelope(response);

                  if (result.done) {
                    if (!endStreamReceived) {
                      throw new ConnectError("missing EndStreamResponse");
                    }
                    return {
                      done: true,
                    };
                  }

                  if (
                    (result.value.flags & connectEndStreamFlag) ===
                    connectEndStreamFlag
                  ) {
                    endStreamReceived = true;
                    const endStream = connectEndStreamFromJson(
                      result.value.data
                    );

                    responseTrailer.resolve(endStream.metadata);

                    if (endStream.error) {
                      throw endStream.error;
                    }
                    return {
                      done: true,
                    };
                  }

                  return {
                    done: false,
                    value: parse(result.value.data),
                  };
                } catch (e) {
                  throw connectErrorFromNodeReason(e);
                }
              },
            };
            return Promise.resolve(conn);
          } catch (e) {
            throw connectErrorFromNodeReason(e);
          }
        },
        options.interceptors
      );
    },
  };
}

const validateResponseHeader = async (
  status: number,
  headers: Headers,
  stream: http.IncomingMessage
) => {
  const type = headers.get("content-type") ?? "";
  if (status !== 200) {
    if (type === "application/json") {
      throw connectErrorFromJson(
        jsonParse(await readToEnd(stream)),
        appendHeaders(...connectTrailerDemux(headers))
      );
    }
    throw new ConnectError(`HTTP ${status}`, connectCodeFromHttpStatus(status));
  }
};
