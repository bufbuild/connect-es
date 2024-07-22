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

// @generated by protoc-gen-es v2.0.0-beta.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/registry/module/v1/resource_service.proto (package buf.registry.module.v1, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage, GenDescService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Resource, ResourceRef } from "./resource_pb";
import { file_buf_registry_module_v1_resource } from "./resource_pb";
import { file_buf_validate_validate } from "../../../validate/validate_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/registry/module/v1/resource_service.proto.
 */
export const file_buf_registry_module_v1_resource_service: GenDescFile = /*@__PURE__*/
  fileDesc("Ci1idWYvcmVnaXN0cnkvbW9kdWxlL3YxL3Jlc291cmNlX3NlcnZpY2UucHJvdG8SFmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjEiXgoTR2V0UmVzb3VyY2VzUmVxdWVzdBJHCg1yZXNvdXJjZV9yZWZzGAEgAygLMiMuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5SZXNvdXJjZVJlZkILukgIkgEFCAEQ+gEiVQoUR2V0UmVzb3VyY2VzUmVzcG9uc2USPQoJcmVzb3VyY2VzGAEgAygLMiAuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5SZXNvdXJjZUIIukgFkgECCAEygQEKD1Jlc291cmNlU2VydmljZRJuCgxHZXRSZXNvdXJjZXMSKy5idWYucmVnaXN0cnkubW9kdWxlLnYxLkdldFJlc291cmNlc1JlcXVlc3QaLC5idWYucmVnaXN0cnkubW9kdWxlLnYxLkdldFJlc291cmNlc1Jlc3BvbnNlIgOQAgFCTlpMYnVmLmJ1aWxkL2dlbi9nby9idWZidWlsZC9yZWdpc3RyeS9wcm90b2NvbGJ1ZmZlcnMvZ28vYnVmL3JlZ2lzdHJ5L21vZHVsZS92MWIGcHJvdG8z", [file_buf_registry_module_v1_resource, file_buf_validate_validate]);

/**
 * @generated from message buf.registry.module.v1.GetResourcesRequest
 */
export type GetResourcesRequest = Message<"buf.registry.module.v1.GetResourcesRequest"> & {
  /**
   * References to request a Resource for.
   *
   * See the documentation on ResourceRef for resource resolution details.
   *
   * @generated from field: repeated buf.registry.module.v1.ResourceRef resource_refs = 1;
   */
  resourceRefs: ResourceRef[];
};

/**
 * Describes the message buf.registry.module.v1.GetResourcesRequest.
 * Use `create(GetResourcesRequestSchema)` to create a new message.
 */
export const GetResourcesRequestSchema: GenDescMessage<GetResourcesRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_resource_service, 0);

/**
 * @generated from message buf.registry.module.v1.GetResourcesResponse
 */
export type GetResourcesResponse = Message<"buf.registry.module.v1.GetResourcesResponse"> & {
  /**
   * The found Resources in the same order as requested.
   *
   * @generated from field: repeated buf.registry.module.v1.Resource resources = 1;
   */
  resources: Resource[];
};

/**
 * Describes the message buf.registry.module.v1.GetResourcesResponse.
 * Use `create(GetResourcesResponseSchema)` to create a new message.
 */
export const GetResourcesResponseSchema: GenDescMessage<GetResourcesResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_resource_service, 1);

/**
 * Operate on Resources.
 *
 * @generated from service buf.registry.module.v1.ResourceService
 */
export const ResourceService: GenDescService<{
  /**
   * Get Resources.
   *
   * @generated from rpc buf.registry.module.v1.ResourceService.GetResources
   */
  getResources: {
    methodKind: "unary";
    input: typeof GetResourcesRequestSchema;
    output: typeof GetResourcesResponseSchema;
  },
}
> = /*@__PURE__*/
  serviceDesc(file_buf_registry_module_v1_resource_service, 0);

