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

// @generated by protoc-gen-es v2.0.0-beta.3 with parameter "target=ts"
// @generated from file buf/registry/module/v1beta1/digest.proto (package buf.registry.module.v1beta1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import { file_buf_validate_validate } from "../../../validate/validate_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/registry/module/v1beta1/digest.proto.
 */
export const file_buf_registry_module_v1beta1_digest: GenFile = /*@__PURE__*/
  fileDesc("CihidWYvcmVnaXN0cnkvbW9kdWxlL3YxYmV0YTEvZGlnZXN0LnByb3RvEhtidWYucmVnaXN0cnkubW9kdWxlLnYxYmV0YTEiYwoGRGlnZXN0EkIKBHR5cGUYASABKA4yJy5idWYucmVnaXN0cnkubW9kdWxlLnYxYmV0YTEuRGlnZXN0VHlwZUILukgIyAEBggECEAESFQoFdmFsdWUYAiABKAxCBrpIA8gBASpRCgpEaWdlc3RUeXBlEhsKF0RJR0VTVF9UWVBFX1VOU1BFQ0lGSUVEEAASEgoORElHRVNUX1RZUEVfQjQQARISCg5ESUdFU1RfVFlQRV9CNRACQlNaUWJ1Zi5idWlsZC9nZW4vZ28vYnVmYnVpbGQvcmVnaXN0cnkvcHJvdG9jb2xidWZmZXJzL2dvL2J1Zi9yZWdpc3RyeS9tb2R1bGUvdjFiZXRhMWIGcHJvdG8z", [file_buf_validate_validate]);

/**
 * A digest of a Commit's content.
 *
 * A digest represents all content for a single Commit, including its .proto files, documentation
 * files, license files, and the digests of its dependencies.
 *
 * @generated from message buf.registry.module.v1beta1.Digest
 */
export type Digest = Message<"buf.registry.module.v1beta1.Digest"> & {
  /**
   * The type of the Digest.
   *
   * @generated from field: buf.registry.module.v1beta1.DigestType type = 1;
   */
  type: DigestType;

  /**
   * The value of the Digest.
   *
   * @generated from field: bytes value = 2;
   */
  value: Uint8Array;
};

/**
 * Describes the message buf.registry.module.v1beta1.Digest.
 * Use `create(DigestSchema)` to create a new message.
 */
export const DigestSchema: GenMessage<Digest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_digest, 0);

/**
 * The type of Digest.
 *
 * @generated from enum buf.registry.module.v1beta1.DigestType
 */
export enum DigestType {
  /**
   * @generated from enum value: DIGEST_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * The b4 digest function.
   *
   * @generated from enum value: DIGEST_TYPE_B4 = 1;
   */
  B4 = 1,

  /**
   * The b5 digest function.
   *
   * @generated from enum value: DIGEST_TYPE_B5 = 2;
   */
  B5 = 2,
}

/**
 * Describes the enum buf.registry.module.v1beta1.DigestType.
 */
export const DigestTypeSchema: GenEnum<DigestType> = /*@__PURE__*/
  enumDesc(file_buf_registry_module_v1beta1_digest, 0);

