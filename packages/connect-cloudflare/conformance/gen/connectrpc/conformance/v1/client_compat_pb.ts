// Copyright 2021-2024 The Connect Authors
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

// @generated by protoc-gen-es v2.0.0 with parameter "target=ts,import_extension=.js"
// @generated from file connectrpc/conformance/v1/client_compat.proto (package connectrpc.conformance.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type {
  Codec,
  Compression,
  HTTPVersion,
  Protocol,
  StreamType,
  TLSCreds,
} from "./config_pb.js";
import { file_connectrpc_conformance_v1_config } from "./config_pb.js";
import type {
  ConformancePayload,
  Error,
  Header,
  RawHTTPRequest,
} from "./service_pb.js";
import { file_connectrpc_conformance_v1_service } from "./service_pb.js";
import type { Any, Empty } from "@bufbuild/protobuf/wkt";
import {
  file_google_protobuf_any,
  file_google_protobuf_empty,
  file_google_protobuf_struct,
} from "@bufbuild/protobuf/wkt";
import type { JsonObject, Message } from "@bufbuild/protobuf";

/**
 * Describes the file connectrpc/conformance/v1/client_compat.proto.
 */
export const file_connectrpc_conformance_v1_client_compat: GenFile =
  /*@__PURE__*/
  fileDesc(
    "Ci1jb25uZWN0cnBjL2NvbmZvcm1hbmNlL3YxL2NsaWVudF9jb21wYXQucHJvdG8SGWNvbm5lY3RycGMuY29uZm9ybWFuY2UudjEi/QcKE0NsaWVudENvbXBhdFJlcXVlc3QSEQoJdGVzdF9uYW1lGAEgASgJEjwKDGh0dHBfdmVyc2lvbhgCIAEoDjImLmNvbm5lY3RycGMuY29uZm9ybWFuY2UudjEuSFRUUFZlcnNpb24SNQoIcHJvdG9jb2wYAyABKA4yIy5jb25uZWN0cnBjLmNvbmZvcm1hbmNlLnYxLlByb3RvY29sEi8KBWNvZGVjGAQgASgOMiAuY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5Db2RlYxI7Cgtjb21wcmVzc2lvbhgFIAEoDjImLmNvbm5lY3RycGMuY29uZm9ybWFuY2UudjEuQ29tcHJlc3Npb24SDAoEaG9zdBgGIAEoCRIMCgRwb3J0GAcgASgNEhcKD3NlcnZlcl90bHNfY2VydBgIIAEoDBI9ChBjbGllbnRfdGxzX2NyZWRzGAkgASgLMiMuY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5UTFNDcmVkcxIdChVtZXNzYWdlX3JlY2VpdmVfbGltaXQYCiABKA0SFAoHc2VydmljZRgLIAEoCUgAiAEBEhMKBm1ldGhvZBgMIAEoCUgBiAEBEjoKC3N0cmVhbV90eXBlGA0gASgOMiUuY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5TdHJlYW1UeXBlEhsKE3VzZV9nZXRfaHR0cF9tZXRob2QYDiABKAgSOgoPcmVxdWVzdF9oZWFkZXJzGA8gAygLMiEuY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5IZWFkZXISLgoQcmVxdWVzdF9tZXNzYWdlcxgQIAMoCzIULmdvb2dsZS5wcm90b2J1Zi5BbnkSFwoKdGltZW91dF9tcxgRIAEoDUgCiAEBEhgKEHJlcXVlc3RfZGVsYXlfbXMYEiABKA0SRQoGY2FuY2VsGBMgASgLMjUuY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5DbGllbnRDb21wYXRSZXF1ZXN0LkNhbmNlbBI+CgtyYXdfcmVxdWVzdBgUIAEoCzIpLmNvbm5lY3RycGMuY29uZm9ybWFuY2UudjEuUmF3SFRUUFJlcXVlc3QajAEKBkNhbmNlbBIzChFiZWZvcmVfY2xvc2Vfc2VuZBgBIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eUgAEh0KE2FmdGVyX2Nsb3NlX3NlbmRfbXMYAiABKA1IABIdChNhZnRlcl9udW1fcmVzcG9uc2VzGAMgASgNSABCDwoNY2FuY2VsX3RpbWluZ0IKCghfc2VydmljZUIJCgdfbWV0aG9kQg0KC190aW1lb3V0X21zIrcBChRDbGllbnRDb21wYXRSZXNwb25zZRIRCgl0ZXN0X25hbWUYASABKAkSQwoIcmVzcG9uc2UYAiABKAsyLy5jb25uZWN0cnBjLmNvbmZvcm1hbmNlLnYxLkNsaWVudFJlc3BvbnNlUmVzdWx0SAASPQoFZXJyb3IYAyABKAsyLC5jb25uZWN0cnBjLmNvbmZvcm1hbmNlLnYxLkNsaWVudEVycm9yUmVzdWx0SABCCAoGcmVzdWx0IuYCChRDbGllbnRSZXNwb25zZVJlc3VsdBI7ChByZXNwb25zZV9oZWFkZXJzGAEgAygLMiEuY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5IZWFkZXISPwoIcGF5bG9hZHMYAiADKAsyLS5jb25uZWN0cnBjLmNvbmZvcm1hbmNlLnYxLkNvbmZvcm1hbmNlUGF5bG9hZBIvCgVlcnJvchgDIAEoCzIgLmNvbm5lY3RycGMuY29uZm9ybWFuY2UudjEuRXJyb3ISPAoRcmVzcG9uc2VfdHJhaWxlcnMYBCADKAsyIS5jb25uZWN0cnBjLmNvbmZvcm1hbmNlLnYxLkhlYWRlchIbChNudW1fdW5zZW50X3JlcXVlc3RzGAUgASgFEh0KEGh0dHBfc3RhdHVzX2NvZGUYBiABKAVIAIgBARIQCghmZWVkYmFjaxgHIAMoCUITChFfaHR0cF9zdGF0dXNfY29kZSIkChFDbGllbnRFcnJvclJlc3VsdBIPCgdtZXNzYWdlGAEgASgJIuABCgtXaXJlRGV0YWlscxIaChJhY3R1YWxfc3RhdHVzX2NvZGUYASABKAUSMgoRY29ubmVjdF9lcnJvcl9yYXcYAiABKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0Ej8KFGFjdHVhbF9odHRwX3RyYWlsZXJzGAMgAygLMiEuY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5IZWFkZXISJAoXYWN0dWFsX2dycGN3ZWJfdHJhaWxlcnMYBCABKAlIAIgBAUIaChhfYWN0dWFsX2dycGN3ZWJfdHJhaWxlcnNiBnByb3RvMw",
    [
      file_connectrpc_conformance_v1_config,
      file_connectrpc_conformance_v1_service,
      file_google_protobuf_any,
      file_google_protobuf_empty,
      file_google_protobuf_struct,
    ],
  );

/**
 * Describes one call the client should make. The client reads
 * these from stdin and, for each one, invokes an RPC as directed
 * and writes the results (in the form of a ClientCompatResponse
 * message) to stdout.
 *
 * @generated from message connectrpc.conformance.v1.ClientCompatRequest
 */
export type ClientCompatRequest =
  Message<"connectrpc.conformance.v1.ClientCompatRequest"> & {
    /**
     * The name of the test that this request is performing.
     * When writing test cases, this is a required field.
     *
     * @generated from field: string test_name = 1;
     */
    testName: string;

    /**
     * Test suite YAML definitions should NOT set values for these next
     * nine fields (fields 2 - 10). They are automatically populated by the test
     * runner. If a test is specific to one of these values, it should instead be
     * indicated in the test suite itself (where it defines the required
     * features and relevant values for these fields).
     *
     * The HTTP version to use for the test (i.e. HTTP/1.1, HTTP/2, HTTP/3).
     *
     * @generated from field: connectrpc.conformance.v1.HTTPVersion http_version = 2;
     */
    httpVersion: HTTPVersion;

    /**
     * The protocol to use for the test (i.e. Connect, gRPC, gRPC-web).
     *
     * @generated from field: connectrpc.conformance.v1.Protocol protocol = 3;
     */
    protocol: Protocol;

    /**
     * The codec to use for the test (i.e. JSON, proto/binary).
     *
     * @generated from field: connectrpc.conformance.v1.Codec codec = 4;
     */
    codec: Codec;

    /**
     * The compression to use for the test (i.e. brotli, gzip, identity).
     *
     * @generated from field: connectrpc.conformance.v1.Compression compression = 5;
     */
    compression: Compression;

    /**
     * The server host that this request will be sent to.
     *
     * @generated from field: string host = 6;
     */
    host: string;

    /**
     * The server port that this request will be sent to.
     *
     * @generated from field: uint32 port = 7;
     */
    port: number;

    /**
     * If non-empty, the server is using TLS. The bytes are the
     * server's PEM-encoded certificate, which the client should
     * verify and trust.
     *
     * @generated from field: bytes server_tls_cert = 8;
     */
    serverTlsCert: Uint8Array;

    /**
     * If present, the client certificate credentials to use to
     * authenticate with the server. This will only be present
     * when server_tls_cert is non-empty.
     *
     * @generated from field: connectrpc.conformance.v1.TLSCreds client_tls_creds = 9;
     */
    clientTlsCreds?: TLSCreds;

    /**
     * If non-zero, indicates the maximum size in bytes for a message.
     * If the server sends anything larger, the client should reject it.
     *
     * @generated from field: uint32 message_receive_limit = 10;
     */
    messageReceiveLimit: number;

    /**
     * The fully-qualified name of the service this test will interact with.
     * If specified, method must also be specified.
     * If not specified, defaults to "connectrpc.conformance.v1.ConformanceService".
     *
     * @generated from field: optional string service = 11;
     */
    service?: string;

    /**
     * The method on `service` that will be called.
     * If specified, service must also be specified.
     * If not specified, the test runner will auto-populate this field based on the stream_type.
     *
     * @generated from field: optional string method = 12;
     */
    method?: string;

    /**
     * The stream type of `method` (i.e. unary, client stream, server stream, full-duplex bidi
     * stream, or half-duplex bidi stream).
     * When writing test cases, this is a required field.
     *
     * @generated from field: connectrpc.conformance.v1.StreamType stream_type = 13;
     */
    streamType: StreamType;

    /**
     * If protocol indicates Connect and stream type indicates
     * Unary, this instructs the client to use a GET HTTP method
     * when making the request.
     *
     * @generated from field: bool use_get_http_method = 14;
     */
    useGetHttpMethod: boolean;

    /**
     * Any request headers that should be sent as part of the request.
     * These include only custom header metadata. Headers that are
     * part of the relevant protocol (such as "content-type", etc) should
     * not be stated here.
     *
     * @generated from field: repeated connectrpc.conformance.v1.Header request_headers = 15;
     */
    requestHeaders: Header[];

    /**
     * The actual request messages that will sent to the server.
     * The type URL for all entries should be equal to the request type of the
     * method.
     * There must be exactly one for unary and server stream methods but
     * can be zero or more for client and bidi stream methods.
     * For client and bidi stream methods, all entries will have the
     * same type URL.
     *
     * @generated from field: repeated google.protobuf.Any request_messages = 16;
     */
    requestMessages: Any[];

    /**
     * The timeout, in milliseconds, for the request. This is equivalent to a
     * deadline for the request. If unset, there will be no timeout.
     *
     * @generated from field: optional uint32 timeout_ms = 17;
     */
    timeoutMs?: number;

    /**
     * Wait this many milliseconds before sending a request message.
     * For client or bidi stream methods, this delay should be
     * applied before each request sent.
     *
     * @generated from field: uint32 request_delay_ms = 18;
     */
    requestDelayMs: number;

    /**
     * If present, the client should cancel the RPC instead of
     * allowing to complete normally.
     *
     * @generated from field: connectrpc.conformance.v1.ClientCompatRequest.Cancel cancel = 19;
     */
    cancel?: ClientCompatRequest_Cancel;

    /**
     * The following field is only used by the reference client. If
     * you are implementing a client under test, you may ignore it
     * or respond with an error if the client receives a request where
     * it is set.
     *
     * When this field is present, it defines the actual HTTP request
     * that will be sent. The above group of fields must still be
     * provided and valid so that the reference client knows how it
     * should try to interpret the server's response.
     *
     * @generated from field: connectrpc.conformance.v1.RawHTTPRequest raw_request = 20;
     */
    rawRequest?: RawHTTPRequest;
  };

/**
 * Describes the message connectrpc.conformance.v1.ClientCompatRequest.
 * Use `create(ClientCompatRequestSchema)` to create a new message.
 */
export const ClientCompatRequestSchema: GenMessage<ClientCompatRequest> =
  /*@__PURE__*/
  messageDesc(file_connectrpc_conformance_v1_client_compat, 0);

/**
 * @generated from message connectrpc.conformance.v1.ClientCompatRequest.Cancel
 */
export type ClientCompatRequest_Cancel =
  Message<"connectrpc.conformance.v1.ClientCompatRequest.Cancel"> & {
    /**
     * These fields determine the timing of cancellation.
     * If none are present, the client should cancel immediately
     * after all request messages are sent and the send side is
     * closed (as if the after_close_send_ms field were present
     * and zero).
     *
     * @generated from oneof connectrpc.conformance.v1.ClientCompatRequest.Cancel.cancel_timing
     */
    cancelTiming:
      | {
          /**
           * When present, the client should cancel *instead of*
           * closing the send side of the stream, after all requests
           * have been sent.
           *
           * This applies only to client and bidi stream RPCs.
           *
           * @generated from field: google.protobuf.Empty before_close_send = 1;
           */
          value: Empty;
          case: "beforeCloseSend";
        }
      | {
          /**
           * When present, the client should delay for this many
           * milliseconds after closing the send side of the stream
           * and then cancel.
           *
           * This applies to all types of RPCs.
           *
           * For unary and server stream RPCs, where the API usually
           * does not allow explicitly closing the send side, the
           * cancellation should be done immediately after invoking
           * the RPC (which should implicitly send the one-and-only
           * request and then close the send-side).
           *
           * For APIs where unary RPCs block until the response
           * is received, there is no point after the request is
           * sent but before a response is received to cancel. So
           * the client must arrange for the RPC to be canceled
           * asynchronously before invoking the blocking unary call.
           *
           * @generated from field: uint32 after_close_send_ms = 2;
           */
          value: number;
          case: "afterCloseSendMs";
        }
      | {
          /**
           * When present, the client should cancel right after
           * reading this number of response messages from the stream.
           * When present, this will be greater than zero.
           *
           * This applies only to server and bidi stream RPCs.
           *
           * @generated from field: uint32 after_num_responses = 3;
           */
          value: number;
          case: "afterNumResponses";
        }
      | { case: undefined; value?: undefined };
  };

/**
 * Describes the message connectrpc.conformance.v1.ClientCompatRequest.Cancel.
 * Use `create(ClientCompatRequest_CancelSchema)` to create a new message.
 */
export const ClientCompatRequest_CancelSchema: GenMessage<ClientCompatRequest_Cancel> =
  /*@__PURE__*/
  messageDesc(file_connectrpc_conformance_v1_client_compat, 0, 0);

/**
 * The outcome of one ClientCompatRequest.
 *
 * @generated from message connectrpc.conformance.v1.ClientCompatResponse
 */
export type ClientCompatResponse =
  Message<"connectrpc.conformance.v1.ClientCompatResponse"> & {
    /**
     * The test name that this response applies to.
     *
     * @generated from field: string test_name = 1;
     */
    testName: string;

    /**
     * These fields determine the outcome of the request.
     *
     * With regards to errors, any unexpected errors that prevent the client from
     * issuing the RPC and following the instructions implied by the request can
     * be reported as an error. These would be errors creating an RPC client from
     * the request parameters or unsupported/illegal values in the request
     * (e.g. a unary request that defines zero or multiple request messages).
     *
     * However, once the RPC is issued, any resulting error should instead be encoded in response.
     *
     * @generated from oneof connectrpc.conformance.v1.ClientCompatResponse.result
     */
    result:
      | {
          /**
           * @generated from field: connectrpc.conformance.v1.ClientResponseResult response = 2;
           */
          value: ClientResponseResult;
          case: "response";
        }
      | {
          /**
           * @generated from field: connectrpc.conformance.v1.ClientErrorResult error = 3;
           */
          value: ClientErrorResult;
          case: "error";
        }
      | { case: undefined; value?: undefined };
  };

/**
 * Describes the message connectrpc.conformance.v1.ClientCompatResponse.
 * Use `create(ClientCompatResponseSchema)` to create a new message.
 */
export const ClientCompatResponseSchema: GenMessage<ClientCompatResponse> =
  /*@__PURE__*/
  messageDesc(file_connectrpc_conformance_v1_client_compat, 1);

/**
 * The result of a ClientCompatRequest, which may or may not be successful.
 * The client will build this message and return it back to the test runner.
 *
 * @generated from message connectrpc.conformance.v1.ClientResponseResult
 */
export type ClientResponseResult =
  Message<"connectrpc.conformance.v1.ClientResponseResult"> & {
    /**
     * All response headers read from the response.
     *
     * @generated from field: repeated connectrpc.conformance.v1.Header response_headers = 1;
     */
    responseHeaders: Header[];

    /**
     * Servers should echo back payloads that they received as part of the request.
     * This field should contain all the payloads the server echoed back. Note that
     * There will be zero-to-one for unary and client stream methods and
     * zero-to-many for server and bidi stream methods.
     *
     * @generated from field: repeated connectrpc.conformance.v1.ConformancePayload payloads = 2;
     */
    payloads: ConformancePayload[];

    /**
     * The error received from the actual RPC invocation. Note this is not representative
     * of a runtime error and should always be the proto equivalent of a Connect
     * or gRPC error.
     *
     * @generated from field: connectrpc.conformance.v1.Error error = 3;
     */
    error?: Error;

    /**
     * All response headers read from the response.
     *
     * @generated from field: repeated connectrpc.conformance.v1.Header response_trailers = 4;
     */
    responseTrailers: Header[];

    /**
     * The number of messages that were present in the request but that could not be
     * sent because an error occurred before finishing the upload.
     *
     * @generated from field: int32 num_unsent_requests = 5;
     */
    numUnsentRequests: number;

    /**
     * The following field is only set by the reference client. It communicates
     * the underlying HTTP status code of the server's response.
     * If you are implementing a client-under-test, you should ignore this field
     * and leave it unset.
     *
     * @generated from field: optional int32 http_status_code = 6;
     */
    httpStatusCode?: number;

    /**
     * This field is used only by the reference client, and it can be used
     * to provide additional feedback about problems observed in the server
     * response or in client processing of the response. If non-empty, the test
     * case is considered failed even if the result above matches all expectations.
     * If you are implementing a client-under-test, you should ignore this field
     * and leave it unset.
     *
     * @generated from field: repeated string feedback = 7;
     */
    feedback: string[];
  };

/**
 * Describes the message connectrpc.conformance.v1.ClientResponseResult.
 * Use `create(ClientResponseResultSchema)` to create a new message.
 */
export const ClientResponseResultSchema: GenMessage<ClientResponseResult> =
  /*@__PURE__*/
  messageDesc(file_connectrpc_conformance_v1_client_compat, 2);

/**
 * The client is not able to fulfill the ClientCompatRequest. This may be due
 * to a runtime error or an unexpected internal error such as the requested protocol
 * not being supported. This is completely independent of the actual RPC invocation.
 *
 * @generated from message connectrpc.conformance.v1.ClientErrorResult
 */
export type ClientErrorResult =
  Message<"connectrpc.conformance.v1.ClientErrorResult"> & {
    /**
     * A message describing the error that occurred. This string will be shown to
     * users running conformance tests so it should include any relevant details
     * that may help troubleshoot or remedy the error.
     *
     * @generated from field: string message = 1;
     */
    message: string;
  };

/**
 * Describes the message connectrpc.conformance.v1.ClientErrorResult.
 * Use `create(ClientErrorResultSchema)` to create a new message.
 */
export const ClientErrorResultSchema: GenMessage<ClientErrorResult> =
  /*@__PURE__*/
  messageDesc(file_connectrpc_conformance_v1_client_compat, 3);

/**
 * Details about various values as observed on the wire. This message is used
 * only by the reference client when reporting results and should not be populated
 * by clients under test.
 *
 * @generated from message connectrpc.conformance.v1.WireDetails
 */
export type WireDetails = Message<"connectrpc.conformance.v1.WireDetails"> & {
  /**
   * The HTTP status code of the response.
   *
   * @generated from field: int32 actual_status_code = 1;
   */
  actualStatusCode: number;

  /**
   * When processing an error from a Connect server, this should contain
   * the actual JSON received on the wire.
   *
   * @generated from field: google.protobuf.Struct connect_error_raw = 2;
   */
  connectErrorRaw?: JsonObject;

  /**
   * Any HTTP trailers observed after the response body. These do NOT
   * include trailers that conveyed via the body, as done in the gRPC-Web
   * and Connect streaming protocols.
   *
   * @generated from field: repeated connectrpc.conformance.v1.Header actual_http_trailers = 3;
   */
  actualHttpTrailers: Header[];

  /**
   * Any trailers that were transmitted in the final message of the
   * response body for a gRPC-Web response. This could differ from the
   * ClientResponseResult.response_trailers field since the RPC client
   * library might canonicalize keys and it might choose to remove
   * "grpc-status" et al from the set of metadata. This field will
   * capture all of the entries and their exact on-the-wire spelling
   * and formatting.
   *
   * @generated from field: optional string actual_grpcweb_trailers = 4;
   */
  actualGrpcwebTrailers?: string;
};

/**
 * Describes the message connectrpc.conformance.v1.WireDetails.
 * Use `create(WireDetailsSchema)` to create a new message.
 */
export const WireDetailsSchema: GenMessage<WireDetails> =
  /*@__PURE__*/
  messageDesc(file_connectrpc_conformance_v1_client_compat, 4);
