// Copyright 2023 The Connect Authors
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

// @generated by protoc-gen-es v1.4.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file connectrpc/conformance/v1/server_compat.proto (package connectrpc.conformance.v1, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { HTTPVersion, Protocol } from "./config_pb.js";

/**
 * Describes one configuration for an RPC server. The server is
 * expected to expose the connectrpc.conformance.v1.ConformanceService
 * RPC service. The configuration does not include a port. The
 * process should pick an available port, which is typically
 * done by using port zero (0) when creating a network listener
 * so that the OS selects an available ephemeral port.
 *
 * These properties are read from stdin. Once the server is
 * listening, details about the server, in the form of a
 * ServerCompatResponse, are written to stdout.
 *
 * Each test process is expected to start only one RPC server.
 * When testing multiple configurations, multiple test processes
 * will be started, each with different properties.
 *
 * @generated from message connectrpc.conformance.v1.ServerCompatRequest
 */
export class ServerCompatRequest extends Message<ServerCompatRequest> {
  /**
   * @generated from field: connectrpc.conformance.v1.Protocol protocol = 1;
   */
  protocol = Protocol.UNSPECIFIED;

  /**
   * @generated from field: connectrpc.conformance.v1.HTTPVersion http_version = 2;
   */
  httpVersion = HTTPVersion.HTTP_VERSION_UNSPECIFIED;

  /**
   * if true, generate a self-signed cert and include it in the
   * ServerCompatResponse along with the actual port
   *
   * @generated from field: bool use_tls = 4;
   */
  useTls = false;

  /**
   * If non-empty, the clients will use certificates to authenticate
   * themselves. This value is a PEM-encoded cert that should be
   * trusted by the server. When non-empty, the server should require
   * that clients provide certificates and they should validate that
   * the certificate presented is valid.
   *
   * This will always be empty if use_tls is false.
   *
   * @generated from field: bytes client_tls_cert = 5;
   */
  clientTlsCert = new Uint8Array(0);

  /**
   * If non-zero, indicates the maximum size in bytes for a message.
   * If the client sends anything larger, the server should reject it.
   *
   * @generated from field: uint32 message_receive_limit = 6;
   */
  messageReceiveLimit = 0;

  constructor(data?: PartialMessage<ServerCompatRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "connectrpc.conformance.v1.ServerCompatRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "protocol", kind: "enum", T: proto3.getEnumType(Protocol) },
    { no: 2, name: "http_version", kind: "enum", T: proto3.getEnumType(HTTPVersion) },
    { no: 4, name: "use_tls", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "client_tls_cert", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 6, name: "message_receive_limit", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ServerCompatRequest {
    return new ServerCompatRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ServerCompatRequest {
    return new ServerCompatRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ServerCompatRequest {
    return new ServerCompatRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ServerCompatRequest | PlainMessage<ServerCompatRequest> | undefined, b: ServerCompatRequest | PlainMessage<ServerCompatRequest> | undefined): boolean {
    return proto3.util.equals(ServerCompatRequest, a, b);
  }
}

/**
 * The outcome of one ServerCompatRequest.
 *
 * @generated from message connectrpc.conformance.v1.ServerCompatResponse
 */
export class ServerCompatResponse extends Message<ServerCompatResponse> {
  /**
   * @generated from field: string host = 1;
   */
  host = "";

  /**
   * @generated from field: uint32 port = 2;
   */
  port = 0;

  /**
   * The server's PEM-encoded certificate, so the
   * client can verify it when connecting via TLS.
   *
   * @generated from field: bytes pem_cert = 3;
   */
  pemCert = new Uint8Array(0);

  constructor(data?: PartialMessage<ServerCompatResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "connectrpc.conformance.v1.ServerCompatResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "host", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "port", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "pem_cert", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ServerCompatResponse {
    return new ServerCompatResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ServerCompatResponse {
    return new ServerCompatResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ServerCompatResponse {
    return new ServerCompatResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ServerCompatResponse | PlainMessage<ServerCompatResponse> | undefined, b: ServerCompatResponse | PlainMessage<ServerCompatResponse> | undefined): boolean {
    return proto3.util.equals(ServerCompatResponse, a, b);
  }
}

/**
 * The server doesn't support the requested protocol, or had a runtime error
 * while starting up.
 *
 * @generated from message connectrpc.conformance.v1.ServerErrorResult
 */
export class ServerErrorResult extends Message<ServerErrorResult> {
  /**
   * @generated from field: string message = 1;
   */
  message = "";

  constructor(data?: PartialMessage<ServerErrorResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "connectrpc.conformance.v1.ServerErrorResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ServerErrorResult {
    return new ServerErrorResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ServerErrorResult {
    return new ServerErrorResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ServerErrorResult {
    return new ServerErrorResult().fromJsonString(jsonString, options);
  }

  static equals(a: ServerErrorResult | PlainMessage<ServerErrorResult> | undefined, b: ServerErrorResult | PlainMessage<ServerErrorResult> | undefined): boolean {
    return proto3.util.equals(ServerErrorResult, a, b);
  }
}

