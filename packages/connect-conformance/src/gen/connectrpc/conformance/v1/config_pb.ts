// Copyright 2023-2024 The Connect Authors
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

// @generated by protoc-gen-es v1.10.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file connectrpc/conformance/v1/config.proto (package connectrpc.conformance.v1, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum connectrpc.conformance.v1.HTTPVersion
 */
export enum HTTPVersion {
  /**
   * @generated from enum value: HTTP_VERSION_UNSPECIFIED = 0;
   */
  HTTP_VERSION_UNSPECIFIED = 0,

  /**
   * @generated from enum value: HTTP_VERSION_1 = 1;
   */
  HTTP_VERSION_1 = 1,

  /**
   * @generated from enum value: HTTP_VERSION_2 = 2;
   */
  HTTP_VERSION_2 = 2,

  /**
   * @generated from enum value: HTTP_VERSION_3 = 3;
   */
  HTTP_VERSION_3 = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(HTTPVersion)
proto3.util.setEnumType(HTTPVersion, "connectrpc.conformance.v1.HTTPVersion", [
  { no: 0, name: "HTTP_VERSION_UNSPECIFIED" },
  { no: 1, name: "HTTP_VERSION_1" },
  { no: 2, name: "HTTP_VERSION_2" },
  { no: 3, name: "HTTP_VERSION_3" },
]);

/**
 * @generated from enum connectrpc.conformance.v1.Protocol
 */
export enum Protocol {
  /**
   * @generated from enum value: PROTOCOL_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: PROTOCOL_CONNECT = 1;
   */
  CONNECT = 1,

  /**
   * @generated from enum value: PROTOCOL_GRPC = 2;
   */
  GRPC = 2,

  /**
   * TODO: Support add'l protocols:
   * PROTOCOL_GRPC_WEB_TEXT = 4;
   * PROTOCOL_REST_TRANSCODING = 5;
   *
   * @generated from enum value: PROTOCOL_GRPC_WEB = 3;
   */
  GRPC_WEB = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(Protocol)
proto3.util.setEnumType(Protocol, "connectrpc.conformance.v1.Protocol", [
  { no: 0, name: "PROTOCOL_UNSPECIFIED" },
  { no: 1, name: "PROTOCOL_CONNECT" },
  { no: 2, name: "PROTOCOL_GRPC" },
  { no: 3, name: "PROTOCOL_GRPC_WEB" },
]);

/**
 * @generated from enum connectrpc.conformance.v1.Codec
 */
export enum Codec {
  /**
   * @generated from enum value: CODEC_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: CODEC_PROTO = 1;
   */
  PROTO = 1,

  /**
   * @generated from enum value: CODEC_JSON = 2;
   */
  JSON = 2,

  /**
   * @generated from enum value: CODEC_TEXT = 3;
   */
  TEXT = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(Codec)
proto3.util.setEnumType(Codec, "connectrpc.conformance.v1.Codec", [
  { no: 0, name: "CODEC_UNSPECIFIED" },
  { no: 1, name: "CODEC_PROTO" },
  { no: 2, name: "CODEC_JSON" },
  { no: 3, name: "CODEC_TEXT" },
]);

/**
 * @generated from enum connectrpc.conformance.v1.Compression
 */
export enum Compression {
  /**
   * @generated from enum value: COMPRESSION_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: COMPRESSION_IDENTITY = 1;
   */
  IDENTITY = 1,

  /**
   * @generated from enum value: COMPRESSION_GZIP = 2;
   */
  GZIP = 2,

  /**
   * @generated from enum value: COMPRESSION_BR = 3;
   */
  BR = 3,

  /**
   * @generated from enum value: COMPRESSION_ZSTD = 4;
   */
  ZSTD = 4,

  /**
   * @generated from enum value: COMPRESSION_DEFLATE = 5;
   */
  DEFLATE = 5,

  /**
   * @generated from enum value: COMPRESSION_SNAPPY = 6;
   */
  SNAPPY = 6,
}
// Retrieve enum metadata with: proto3.getEnumType(Compression)
proto3.util.setEnumType(Compression, "connectrpc.conformance.v1.Compression", [
  { no: 0, name: "COMPRESSION_UNSPECIFIED" },
  { no: 1, name: "COMPRESSION_IDENTITY" },
  { no: 2, name: "COMPRESSION_GZIP" },
  { no: 3, name: "COMPRESSION_BR" },
  { no: 4, name: "COMPRESSION_ZSTD" },
  { no: 5, name: "COMPRESSION_DEFLATE" },
  { no: 6, name: "COMPRESSION_SNAPPY" },
]);

/**
 * @generated from enum connectrpc.conformance.v1.StreamType
 */
export enum StreamType {
  /**
   * @generated from enum value: STREAM_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: STREAM_TYPE_UNARY = 1;
   */
  UNARY = 1,

  /**
   * @generated from enum value: STREAM_TYPE_CLIENT_STREAM = 2;
   */
  CLIENT_STREAM = 2,

  /**
   * @generated from enum value: STREAM_TYPE_SERVER_STREAM = 3;
   */
  SERVER_STREAM = 3,

  /**
   * @generated from enum value: STREAM_TYPE_HALF_DUPLEX_BIDI_STREAM = 4;
   */
  HALF_DUPLEX_BIDI_STREAM = 4,

  /**
   * @generated from enum value: STREAM_TYPE_FULL_DUPLEX_BIDI_STREAM = 5;
   */
  FULL_DUPLEX_BIDI_STREAM = 5,
}
// Retrieve enum metadata with: proto3.getEnumType(StreamType)
proto3.util.setEnumType(StreamType, "connectrpc.conformance.v1.StreamType", [
  { no: 0, name: "STREAM_TYPE_UNSPECIFIED" },
  { no: 1, name: "STREAM_TYPE_UNARY" },
  { no: 2, name: "STREAM_TYPE_CLIENT_STREAM" },
  { no: 3, name: "STREAM_TYPE_SERVER_STREAM" },
  { no: 4, name: "STREAM_TYPE_HALF_DUPLEX_BIDI_STREAM" },
  { no: 5, name: "STREAM_TYPE_FULL_DUPLEX_BIDI_STREAM" },
]);

/**
 * @generated from enum connectrpc.conformance.v1.Code
 */
export enum Code {
  /**
   * @generated from enum value: CODE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: CODE_CANCELED = 1;
   */
  CANCELED = 1,

  /**
   * @generated from enum value: CODE_UNKNOWN = 2;
   */
  UNKNOWN = 2,

  /**
   * @generated from enum value: CODE_INVALID_ARGUMENT = 3;
   */
  INVALID_ARGUMENT = 3,

  /**
   * @generated from enum value: CODE_DEADLINE_EXCEEDED = 4;
   */
  DEADLINE_EXCEEDED = 4,

  /**
   * @generated from enum value: CODE_NOT_FOUND = 5;
   */
  NOT_FOUND = 5,

  /**
   * @generated from enum value: CODE_ALREADY_EXISTS = 6;
   */
  ALREADY_EXISTS = 6,

  /**
   * @generated from enum value: CODE_PERMISSION_DENIED = 7;
   */
  PERMISSION_DENIED = 7,

  /**
   * @generated from enum value: CODE_RESOURCE_EXHAUSTED = 8;
   */
  RESOURCE_EXHAUSTED = 8,

  /**
   * @generated from enum value: CODE_FAILED_PRECONDITION = 9;
   */
  FAILED_PRECONDITION = 9,

  /**
   * @generated from enum value: CODE_ABORTED = 10;
   */
  ABORTED = 10,

  /**
   * @generated from enum value: CODE_OUT_OF_RANGE = 11;
   */
  OUT_OF_RANGE = 11,

  /**
   * @generated from enum value: CODE_UNIMPLEMENTED = 12;
   */
  UNIMPLEMENTED = 12,

  /**
   * @generated from enum value: CODE_INTERNAL = 13;
   */
  INTERNAL = 13,

  /**
   * @generated from enum value: CODE_UNAVAILABLE = 14;
   */
  UNAVAILABLE = 14,

  /**
   * @generated from enum value: CODE_DATA_LOSS = 15;
   */
  DATA_LOSS = 15,

  /**
   * @generated from enum value: CODE_UNAUTHENTICATED = 16;
   */
  UNAUTHENTICATED = 16,
}
// Retrieve enum metadata with: proto3.getEnumType(Code)
proto3.util.setEnumType(Code, "connectrpc.conformance.v1.Code", [
  { no: 0, name: "CODE_UNSPECIFIED" },
  { no: 1, name: "CODE_CANCELED" },
  { no: 2, name: "CODE_UNKNOWN" },
  { no: 3, name: "CODE_INVALID_ARGUMENT" },
  { no: 4, name: "CODE_DEADLINE_EXCEEDED" },
  { no: 5, name: "CODE_NOT_FOUND" },
  { no: 6, name: "CODE_ALREADY_EXISTS" },
  { no: 7, name: "CODE_PERMISSION_DENIED" },
  { no: 8, name: "CODE_RESOURCE_EXHAUSTED" },
  { no: 9, name: "CODE_FAILED_PRECONDITION" },
  { no: 10, name: "CODE_ABORTED" },
  { no: 11, name: "CODE_OUT_OF_RANGE" },
  { no: 12, name: "CODE_UNIMPLEMENTED" },
  { no: 13, name: "CODE_INTERNAL" },
  { no: 14, name: "CODE_UNAVAILABLE" },
  { no: 15, name: "CODE_DATA_LOSS" },
  { no: 16, name: "CODE_UNAUTHENTICATED" },
]);

/**
 * Config defines the configuration for running conformance tests.
 * This enumerates all of the "flavors" of the test suite to run.
 *
 * @generated from message connectrpc.conformance.v1.Config
 */
export class Config extends Message<Config> {
  /**
   * The features supported by the client or server under test.
   * This is used to filter the set of test cases that are run.
   * If absent, an empty message is used. See Features for more
   * on how empty/absent fields are interpreted.
   *
   * @generated from field: connectrpc.conformance.v1.Features features = 1;
   */
  features?: Features;

  /**
   * This can indicate additional permutations that are supported
   * that might otherwise be excluded based on the above features.
   *
   * @generated from field: repeated connectrpc.conformance.v1.ConfigCase include_cases = 2;
   */
  includeCases: ConfigCase[] = [];

  /**
   * This can indicates permutations that are not supported even
   * though their support might be implied by the above features.
   *
   * @generated from field: repeated connectrpc.conformance.v1.ConfigCase exclude_cases = 3;
   */
  excludeCases: ConfigCase[] = [];

  constructor(data?: PartialMessage<Config>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "connectrpc.conformance.v1.Config";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "features", kind: "message", T: Features },
    { no: 2, name: "include_cases", kind: "message", T: ConfigCase, repeated: true },
    { no: 3, name: "exclude_cases", kind: "message", T: ConfigCase, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Config {
    return new Config().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Config {
    return new Config().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Config {
    return new Config().fromJsonString(jsonString, options);
  }

  static equals(a: Config | PlainMessage<Config> | undefined, b: Config | PlainMessage<Config> | undefined): boolean {
    return proto3.util.equals(Config, a, b);
  }
}

/**
 * Features define the feature set that a client or server supports. They are
 * used to determine the server configurations and test cases that
 * will be run. They are defined in YAML files and are specified as part of the
 * --conf flag to the test runner.
 *
 * TODO: we could probably model some of the constraints on what are valid vs.
 *       invalid (i.e. conflicting/impossible) features using protovalidate rules
 *
 * @generated from message connectrpc.conformance.v1.Features
 */
export class Features extends Message<Features> {
  /**
   * Supported HTTP versions.
   * If empty, HTTP 1.1 and HTTP/2 are assumed.
   *
   * @generated from field: repeated connectrpc.conformance.v1.HTTPVersion versions = 1;
   */
  versions: HTTPVersion[] = [];

  /**
   * Supported protocols.
   * If empty, all three are assumed: Connect, gRPC, and gRPC-Web.
   *
   * @generated from field: repeated connectrpc.conformance.v1.Protocol protocols = 2;
   */
  protocols: Protocol[] = [];

  /**
   * Supported codecs.
   * If empty, "proto" and "json" are assumed.
   *
   * @generated from field: repeated connectrpc.conformance.v1.Codec codecs = 3;
   */
  codecs: Codec[] = [];

  /**
   * Supported compression algorithms.
   * If empty, "identity" and "gzip" are assumed.
   *
   * @generated from field: repeated connectrpc.conformance.v1.Compression compressions = 4;
   */
  compressions: Compression[] = [];

  /**
   * Supported stream types.
   * If empty, all stream types are assumed. This is usually for
   * clients, since some client environments may not be able to
   * support certain kinds of streaming operations, especially
   * bidirectional streams.
   *
   * @generated from field: repeated connectrpc.conformance.v1.StreamType stream_types = 5;
   */
  streamTypes: StreamType[] = [];

  /**
   * Whether H2C (unencrypted, non-TLS HTTP/2 over cleartext) is supported.
   * If absent, true is assumed.
   *
   * @generated from field: optional bool supports_h2c = 6;
   */
  supportsH2c?: boolean;

  /**
   * Whether TLS is supported.
   * If absent, true is assumed.
   *
   * @generated from field: optional bool supports_tls = 7;
   */
  supportsTls?: boolean;

  /**
   * Whether the client supports TLS certificates.
   * If absent, false is assumed. This should not be set if
   * supports_tls is false.
   *
   * @generated from field: optional bool supports_tls_client_certs = 8;
   */
  supportsTlsClientCerts?: boolean;

  /**
   * Whether trailers are supported.
   * If absent, true is assumed. If false, implies that gRPC protocol is not allowed.
   *
   * @generated from field: optional bool supports_trailers = 9;
   */
  supportsTrailers?: boolean;

  /**
   * Whether half duplex bidi streams are supported over HTTP/1.1.
   * If absent, false is assumed.
   *
   * @generated from field: optional bool supports_half_duplex_bidi_over_http1 = 10;
   */
  supportsHalfDuplexBidiOverHttp1?: boolean;

  /**
   * Whether Connect via GET is supported.
   * If absent, true is assumed.
   *
   * @generated from field: optional bool supports_connect_get = 11;
   */
  supportsConnectGet?: boolean;

  /**
   * Whether a message receive limit is supported.
   * If absent, true is assumed.
   *
   * @generated from field: optional bool supports_message_receive_limit = 12;
   */
  supportsMessageReceiveLimit?: boolean;

  constructor(data?: PartialMessage<Features>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "connectrpc.conformance.v1.Features";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "versions", kind: "enum", T: proto3.getEnumType(HTTPVersion), repeated: true },
    { no: 2, name: "protocols", kind: "enum", T: proto3.getEnumType(Protocol), repeated: true },
    { no: 3, name: "codecs", kind: "enum", T: proto3.getEnumType(Codec), repeated: true },
    { no: 4, name: "compressions", kind: "enum", T: proto3.getEnumType(Compression), repeated: true },
    { no: 5, name: "stream_types", kind: "enum", T: proto3.getEnumType(StreamType), repeated: true },
    { no: 6, name: "supports_h2c", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    { no: 7, name: "supports_tls", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    { no: 8, name: "supports_tls_client_certs", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    { no: 9, name: "supports_trailers", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    { no: 10, name: "supports_half_duplex_bidi_over_http1", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    { no: 11, name: "supports_connect_get", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    { no: 12, name: "supports_message_receive_limit", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Features {
    return new Features().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Features {
    return new Features().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Features {
    return new Features().fromJsonString(jsonString, options);
  }

  static equals(a: Features | PlainMessage<Features> | undefined, b: Features | PlainMessage<Features> | undefined): boolean {
    return proto3.util.equals(Features, a, b);
  }
}

/**
 * ConfigCase represents a single resolved configuration case. When tests are
 * run, the Config and the supported features therein are used to compute all
 * of the cases relevant to the implementation under test. These configuration
 * cases are then used to select which test cases are applicable.
 *
 * TODO: we could probably model some of the constraints on what is a valid
 *       vs. invalid config case using protovalidate rules
 *
 * @generated from message connectrpc.conformance.v1.ConfigCase
 */
export class ConfigCase extends Message<ConfigCase> {
  /**
   * If unspecified, indicates cases for all versions.
   *
   * @generated from field: connectrpc.conformance.v1.HTTPVersion version = 1;
   */
  version = HTTPVersion.HTTP_VERSION_UNSPECIFIED;

  /**
   * If unspecified, indicates cases for all protocols.
   *
   * @generated from field: connectrpc.conformance.v1.Protocol protocol = 2;
   */
  protocol = Protocol.UNSPECIFIED;

  /**
   * If unspecified, indicates cases for all codecs.
   *
   * @generated from field: connectrpc.conformance.v1.Codec codec = 3;
   */
  codec = Codec.UNSPECIFIED;

  /**
   * If unspecified, indicates cases for all compression algorithms.
   *
   * @generated from field: connectrpc.conformance.v1.Compression compression = 4;
   */
  compression = Compression.UNSPECIFIED;

  /**
   * If unspecified, indicates cases for all stream types.
   *
   * @generated from field: connectrpc.conformance.v1.StreamType stream_type = 5;
   */
  streamType = StreamType.UNSPECIFIED;

  /**
   * If absent, indicates cases for plaintext (no TLS) but also for
   * TLS if features indicate that TLS is supported.
   *
   * @generated from field: optional bool use_tls = 6;
   */
  useTls?: boolean;

  /**
   * If absent, indicates cases without client certs but also cases
   * that use client certs if features indicate they are supported.
   *
   * @generated from field: optional bool use_tls_client_certs = 7;
   */
  useTlsClientCerts?: boolean;

  /**
   * If absent, indicates cases that do not test message receive
   * limits but also cases that do test message receive limits if
   * features indicate they are supported.
   *
   * @generated from field: optional bool use_message_receive_limit = 8;
   */
  useMessageReceiveLimit?: boolean;

  constructor(data?: PartialMessage<ConfigCase>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "connectrpc.conformance.v1.ConfigCase";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "version", kind: "enum", T: proto3.getEnumType(HTTPVersion) },
    { no: 2, name: "protocol", kind: "enum", T: proto3.getEnumType(Protocol) },
    { no: 3, name: "codec", kind: "enum", T: proto3.getEnumType(Codec) },
    { no: 4, name: "compression", kind: "enum", T: proto3.getEnumType(Compression) },
    { no: 5, name: "stream_type", kind: "enum", T: proto3.getEnumType(StreamType) },
    { no: 6, name: "use_tls", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    { no: 7, name: "use_tls_client_certs", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    { no: 8, name: "use_message_receive_limit", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConfigCase {
    return new ConfigCase().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConfigCase {
    return new ConfigCase().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConfigCase {
    return new ConfigCase().fromJsonString(jsonString, options);
  }

  static equals(a: ConfigCase | PlainMessage<ConfigCase> | undefined, b: ConfigCase | PlainMessage<ConfigCase> | undefined): boolean {
    return proto3.util.equals(ConfigCase, a, b);
  }
}

/**
 * TLSCreds represents credentials for TLS. It includes both a
 * certificate and corresponding private key. Both are encoded
 * in PEM format.
 *
 * @generated from message connectrpc.conformance.v1.TLSCreds
 */
export class TLSCreds extends Message<TLSCreds> {
  /**
   * @generated from field: bytes cert = 1;
   */
  cert = new Uint8Array(0);

  /**
   * @generated from field: bytes key = 2;
   */
  key = new Uint8Array(0);

  constructor(data?: PartialMessage<TLSCreds>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "connectrpc.conformance.v1.TLSCreds";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "cert", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "key", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TLSCreds {
    return new TLSCreds().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TLSCreds {
    return new TLSCreds().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TLSCreds {
    return new TLSCreds().fromJsonString(jsonString, options);
  }

  static equals(a: TLSCreds | PlainMessage<TLSCreds> | undefined, b: TLSCreds | PlainMessage<TLSCreds> | undefined): boolean {
    return proto3.util.equals(TLSCreds, a, b);
  }
}

