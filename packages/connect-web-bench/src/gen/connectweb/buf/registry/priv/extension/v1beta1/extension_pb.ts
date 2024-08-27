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
// @generated from file buf/registry/priv/extension/v1beta1/extension.proto (package buf.registry.priv.extension.v1beta1, syntax proto3)
/* eslint-disable */

import type { GenExtension, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { MessageOptions } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_descriptor } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/registry/priv/extension/v1beta1/extension.proto.
 */
export const file_buf_registry_priv_extension_v1beta1_extension: GenFile = /*@__PURE__*/
  fileDesc("CjNidWYvcmVnaXN0cnkvcHJpdi9leHRlbnNpb24vdjFiZXRhMS9leHRlbnNpb24ucHJvdG8SI2J1Zi5yZWdpc3RyeS5wcml2LmV4dGVuc2lvbi52MWJldGExIl8KEk1lc3NhZ2VDb25zdHJhaW50cxIUCgxyZXF1ZXN0X29ubHkYASABKAgSFQoNcmVzcG9uc2Vfb25seRgCIAEoCBIcChRub19zaWRlX2VmZmVjdHNfb25seRgDIAEoCDp0CgdtZXNzYWdlEh8uZ29vZ2xlLnByb3RvYnVmLk1lc3NhZ2VPcHRpb25zGN24BSABKAsyNy5idWYucmVnaXN0cnkucHJpdi5leHRlbnNpb24udjFiZXRhMS5NZXNzYWdlQ29uc3RyYWludHNSB21lc3NhZ2VCW1pZYnVmLmJ1aWxkL2dlbi9nby9idWZidWlsZC9yZWdpc3RyeS9wcm90b2NvbGJ1ZmZlcnMvZ28vYnVmL3JlZ2lzdHJ5L3ByaXYvZXh0ZW5zaW9uL3YxYmV0YTFiBnByb3RvMw", [file_google_protobuf_descriptor]);

/**
 * Constraints on a message.
 *
 * @generated from message buf.registry.priv.extension.v1beta1.MessageConstraints
 */
export type MessageConstraints = Message<"buf.registry.priv.extension.v1beta1.MessageConstraints"> & {
  /**
   * The given message should only be recursively used as part of RPC requests and should
   * never be part of an RPC response.
   *
   * This is not just for request/response messages, this is also for any message that
   * is part of a request. It says that the message cannot form part of a response.
   *
   * This applies to all nested messages within the message that are marked as request_only.
   *
   * Exclusive with response_only.
   *
   * TODO: Also have a marker for specific request/response messages?
   * TODO: enum?
   *
   * @generated from field: bool request_only = 1;
   */
  requestOnly: boolean;

  /**
   * The given message should only be recursively used as part of RPC responses and should
   * never be part of an RPC request.
   *
   * This is not just for request/response messages, this is also for any message that
   * is part of a response. It says that the message cannot form part of a request.
   *
   * This applies to all nested messages within the message that are marked as response_only.
   *
   * Exclusive with request_only.
   *
   * TODO: Also have a marker for specific request/response messages?
   * TODO: enum?
   *
   * @generated from field: bool response_only = 2;
   */
  responseOnly: boolean;

  /**
   * The given message should only be recursively used as part of RPCs that are marked
   * as NO_SIDE_EFFECTS. Typically used to denote that a message should
   * only be used in read-only contexts.
   *
   * This applies to all nested messages within the message that are marked as no_side_effects_only.
   *
   * This is not just for request/response messages, this is also for any message that
   * is part of an RPC.
   *
   * @generated from field: bool no_side_effects_only = 3;
   */
  noSideEffectsOnly: boolean;
};

/**
 * Describes the message buf.registry.priv.extension.v1beta1.MessageConstraints.
 * Use `create(MessageConstraintsSchema)` to create a new message.
 */
export const MessageConstraintsSchema: GenMessage<MessageConstraints> = /*@__PURE__*/
  messageDesc(file_buf_registry_priv_extension_v1beta1_extension, 0);

/**
 * Constraints on a message.
 *
 * Prototyping for now - we will want to change this to a number in Buf's reserved range if
 * this goes further.
 *
 * @generated from extension: buf.registry.priv.extension.v1beta1.MessageConstraints message = 89181;
 */
export const message: GenExtension<MessageOptions, MessageConstraints> = /*@__PURE__*/
  extDesc(file_buf_registry_priv_extension_v1beta1_extension, 0);

