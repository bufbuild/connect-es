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

// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file buf/registry/module/v1/commit_service.proto (package buf.registry.module.v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Commit } from "./commit_pb";
import { file_buf_registry_module_v1_commit } from "./commit_pb";
import type { ResourceRef } from "./resource_pb";
import { file_buf_registry_module_v1_resource } from "./resource_pb";
import { file_buf_validate_validate } from "../../../validate/validate_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/registry/module/v1/commit_service.proto.
 */
export const file_buf_registry_module_v1_commit_service: GenFile = /*@__PURE__*/
  fileDesc("CitidWYvcmVnaXN0cnkvbW9kdWxlL3YxL2NvbW1pdF9zZXJ2aWNlLnByb3RvEhZidWYucmVnaXN0cnkubW9kdWxlLnYxIlwKEUdldENvbW1pdHNSZXF1ZXN0EkcKDXJlc291cmNlX3JlZnMYASADKAsyIy5idWYucmVnaXN0cnkubW9kdWxlLnYxLlJlc291cmNlUmVmQgu6SAiSAQUIARD6ASJPChJHZXRDb21taXRzUmVzcG9uc2USOQoHY29tbWl0cxgBIAMoCzIeLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjEuQ29tbWl0Qgi6SAWSAQIIASLPAgoSTGlzdENvbW1pdHNSZXF1ZXN0EhsKCXBhZ2Vfc2l6ZRgBIAEoDUIIukgFKgMY+gESHAoKcGFnZV90b2tlbhgCIAEoCUIIukgFcgMYgCASQQoMcmVzb3VyY2VfcmVmGAMgASgLMiMuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5SZXNvdXJjZVJlZkIGukgDyAEBEkkKBW9yZGVyGAQgASgOMjAuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MaXN0Q29tbWl0c1JlcXVlc3QuT3JkZXJCCLpIBYIBAhABEhkKCGlkX3F1ZXJ5GAUgASgJQge6SARyAhgkIlUKBU9yZGVyEhUKEU9SREVSX1VOU1BFQ0lGSUVEEAASGgoWT1JERVJfQ1JFQVRFX1RJTUVfREVTQxABEhkKFU9SREVSX0NSRUFURV9USU1FX0FTQxACImkKE0xpc3RDb21taXRzUmVzcG9uc2USIQoPbmV4dF9wYWdlX3Rva2VuGAEgASgJQgi6SAVyAxiAIBIvCgdjb21taXRzGAIgAygLMh4uYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5Db21taXQy5gEKDUNvbW1pdFNlcnZpY2USaAoKR2V0Q29tbWl0cxIpLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjEuR2V0Q29tbWl0c1JlcXVlc3QaKi5idWYucmVnaXN0cnkubW9kdWxlLnYxLkdldENvbW1pdHNSZXNwb25zZSIDkAIBEmsKC0xpc3RDb21taXRzEiouYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MaXN0Q29tbWl0c1JlcXVlc3QaKy5idWYucmVnaXN0cnkubW9kdWxlLnYxLkxpc3RDb21taXRzUmVzcG9uc2UiA5ACAUJOWkxidWYuYnVpbGQvZ2VuL2dvL2J1ZmJ1aWxkL3JlZ2lzdHJ5L3Byb3RvY29sYnVmZmVycy9nby9idWYvcmVnaXN0cnkvbW9kdWxlL3YxYgZwcm90bzM", [file_buf_registry_module_v1_commit, file_buf_registry_module_v1_resource, file_buf_validate_validate]);

/**
 * @generated from message buf.registry.module.v1.GetCommitsRequest
 */
export type GetCommitsRequest = Message<"buf.registry.module.v1.GetCommitsRequest"> & {
  /**
   * References to request a Commit for.
   *
   * See the documentation on ResourceRef for resource resolution details.
   *
   * Resolution is as follows:
   *   - If a Module is referenced, the Commit of the default Label is returned.
   *   - If a Label is referenced, the Commit of this Label is returned.
   *   - If a Commit is referenced, this Commit is returned.
   *
   * @generated from field: repeated buf.registry.module.v1.ResourceRef resource_refs = 1;
   */
  resourceRefs: ResourceRef[];
};

/**
 * Describes the message buf.registry.module.v1.GetCommitsRequest.
 * Use `create(GetCommitsRequestSchema)` to create a new message.
 */
export const GetCommitsRequestSchema: GenMessage<GetCommitsRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_commit_service, 0);

/**
 * @generated from message buf.registry.module.v1.GetCommitsResponse
 */
export type GetCommitsResponse = Message<"buf.registry.module.v1.GetCommitsResponse"> & {
  /**
   * The found Commits in the same order as requested.
   *
   * @generated from field: repeated buf.registry.module.v1.Commit commits = 1;
   */
  commits: Commit[];
};

/**
 * Describes the message buf.registry.module.v1.GetCommitsResponse.
 * Use `create(GetCommitsResponseSchema)` to create a new message.
 */
export const GetCommitsResponseSchema: GenMessage<GetCommitsResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_commit_service, 1);

/**
 * @generated from message buf.registry.module.v1.ListCommitsRequest
 */
export type ListCommitsRequest = Message<"buf.registry.module.v1.ListCommitsRequest"> & {
  /**
   * The maximum number of items to return.
   *
   * The default value is 10.
   *
   * @generated from field: uint32 page_size = 1;
   */
  pageSize: number;

  /**
   * The page to start from.
   *
   * If empty, the first page is returned,
   *
   * @generated from field: string page_token = 2;
   */
  pageToken: string;

  /**
   * The reference to list Commits for.
   *
   * See the documentation on Ref for resource resolution details.
   *
   * Once the resource is resolved, the following Commits are listed (subject to any additional filters in the request):
   *   - If a Module is referenced, all Commits for the Module are returned.
   *   - If a Label is referenced, the Commit the Label points to is returned.
   *     Use ListLabelHistory to get the history of Commits for a Label.
   *   - If a Commit is referenced, this Commit is returned.
   *
   * @generated from field: buf.registry.module.v1.ResourceRef resource_ref = 3;
   */
  resourceRef?: ResourceRef;

  /**
   * The order to return the Commits.
   *
   * If not specified, defaults to ORDER_CREATE_TIME_DESC.
   *
   * @generated from field: buf.registry.module.v1.ListCommitsRequest.Order order = 4;
   */
  order: ListCommitsRequest_Order;

  /**
   * Only return Commits with an id that contains this string using a case-insensitive comparison.
   *
   * @generated from field: string id_query = 5;
   */
  idQuery: string;
};

/**
 * Describes the message buf.registry.module.v1.ListCommitsRequest.
 * Use `create(ListCommitsRequestSchema)` to create a new message.
 */
export const ListCommitsRequestSchema: GenMessage<ListCommitsRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_commit_service, 2);

/**
 * The list order.
 *
 * @generated from enum buf.registry.module.v1.ListCommitsRequest.Order
 */
export enum ListCommitsRequest_Order {
  /**
   * @generated from enum value: ORDER_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Order by create_time newest to oldest.
   *
   * @generated from enum value: ORDER_CREATE_TIME_DESC = 1;
   */
  CREATE_TIME_DESC = 1,

  /**
   * Order by create_time oldest to newest.
   *
   * @generated from enum value: ORDER_CREATE_TIME_ASC = 2;
   */
  CREATE_TIME_ASC = 2,
}

/**
 * Describes the enum buf.registry.module.v1.ListCommitsRequest.Order.
 */
export const ListCommitsRequest_OrderSchema: GenEnum<ListCommitsRequest_Order> = /*@__PURE__*/
  enumDesc(file_buf_registry_module_v1_commit_service, 2, 0);

/**
 * @generated from message buf.registry.module.v1.ListCommitsResponse
 */
export type ListCommitsResponse = Message<"buf.registry.module.v1.ListCommitsResponse"> & {
  /**
   * The next page token.
   *
   * If empty, there are no more pages.
   *
   * @generated from field: string next_page_token = 1;
   */
  nextPageToken: string;

  /**
   * The listed Commits.
   *
   * @generated from field: repeated buf.registry.module.v1.Commit commits = 2;
   */
  commits: Commit[];
};

/**
 * Describes the message buf.registry.module.v1.ListCommitsResponse.
 * Use `create(ListCommitsResponseSchema)` to create a new message.
 */
export const ListCommitsResponseSchema: GenMessage<ListCommitsResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_commit_service, 3);

/**
 * Operate on Commits.
 *
 * @generated from service buf.registry.module.v1.CommitService
 */
export const CommitService: GenService<{
  /**
   * Get Commits.
   *
   * @generated from rpc buf.registry.module.v1.CommitService.GetCommits
   */
  getCommits: {
    methodKind: "unary";
    input: typeof GetCommitsRequestSchema;
    output: typeof GetCommitsResponseSchema;
  },
  /**
   * List Commits for a given Module, Label, or Commit.
   *
   * @generated from rpc buf.registry.module.v1.CommitService.ListCommits
   */
  listCommits: {
    methodKind: "unary";
    input: typeof ListCommitsRequestSchema;
    output: typeof ListCommitsResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_buf_registry_module_v1_commit_service, 0);

