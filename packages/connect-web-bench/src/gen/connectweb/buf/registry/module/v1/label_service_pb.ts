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

// @generated by protoc-gen-es v2.2.0 with parameter "target=ts"
// @generated from file buf/registry/module/v1/label_service.proto (package buf.registry.module.v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Commit } from "./commit_pb";
import { file_buf_registry_module_v1_commit } from "./commit_pb";
import type { CommitCheckState, CommitCheckStatus, Label, LabelRef } from "./label_pb";
import { file_buf_registry_module_v1_label } from "./label_pb";
import type { ResourceRef } from "./resource_pb";
import { file_buf_registry_module_v1_resource } from "./resource_pb";
import { file_buf_validate_validate } from "../../../validate/validate_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/registry/module/v1/label_service.proto.
 */
export const file_buf_registry_module_v1_label_service: GenFile = /*@__PURE__*/
  fileDesc("CipidWYvcmVnaXN0cnkvbW9kdWxlL3YxL2xhYmVsX3NlcnZpY2UucHJvdG8SFmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjEiVQoQR2V0TGFiZWxzUmVxdWVzdBJBCgpsYWJlbF9yZWZzGAEgAygLMiAuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MYWJlbFJlZkILukgIkgEFCAEQ+gEiTAoRR2V0TGFiZWxzUmVzcG9uc2USNwoGbGFiZWxzGAEgAygLMh0uYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MYWJlbEIIukgFkgECCAEi0QUKEUxpc3RMYWJlbHNSZXF1ZXN0EhsKCXBhZ2Vfc2l6ZRgBIAEoDUIIukgFKgMY+gESHAoKcGFnZV90b2tlbhgCIAEoCUIIukgFcgMYgCASQQoMcmVzb3VyY2VfcmVmGAMgASgLMiMuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5SZXNvdXJjZVJlZkIGukgDyAEBEkgKBW9yZGVyGAQgASgOMi8uYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MaXN0TGFiZWxzUmVxdWVzdC5PcmRlckIIukgFggECEAESXAoVY29tbWl0X2NoZWNrX3N0YXR1c2VzGAUgAygOMikuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5Db21taXRDaGVja1N0YXR1c0ISukgPkgEMIgqCAQcQARoDAQIFEhwKCm5hbWVfcXVlcnkYBiABKAlCCLpIBXIDGPoBElkKDmFyY2hpdmVfZmlsdGVyGAcgASgOMjcuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MaXN0TGFiZWxzUmVxdWVzdC5BcmNoaXZlRmlsdGVyQgi6SAWCAQIQASKMAQoFT3JkZXISFQoRT1JERVJfVU5TUEVDSUZJRUQQABIaChZPUkRFUl9DUkVBVEVfVElNRV9ERVNDEAESGQoVT1JERVJfQ1JFQVRFX1RJTUVfQVNDEAISGgoWT1JERVJfVVBEQVRFX1RJTUVfREVTQxADEhkKFU9SREVSX1VQREFURV9USU1FX0FTQxAEIo0BCg1BcmNoaXZlRmlsdGVyEh4KGkFSQ0hJVkVfRklMVEVSX1VOU1BFQ0lGSUVEEAASIgoeQVJDSElWRV9GSUxURVJfVU5BUkNISVZFRF9PTkxZEAESIAocQVJDSElWRV9GSUxURVJfQVJDSElWRURfT05MWRACEhYKEkFSQ0hJVkVfRklMVEVSX0FMTBADImYKEkxpc3RMYWJlbHNSZXNwb25zZRIhCg9uZXh0X3BhZ2VfdG9rZW4YASABKAlCCLpIBXIDGIAgEi0KBmxhYmVscxgCIAMoCzIdLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjEuTGFiZWwiygMKF0xpc3RMYWJlbEhpc3RvcnlSZXF1ZXN0EhsKCXBhZ2Vfc2l6ZRgBIAEoDUIIukgFKgMY+gESHAoKcGFnZV90b2tlbhgCIAEoCUIIukgFcgMYgCASOwoJbGFiZWxfcmVmGAMgASgLMiAuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MYWJlbFJlZkIGukgDyAEBEk4KBW9yZGVyGAQgASgOMjUuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MaXN0TGFiZWxIaXN0b3J5UmVxdWVzdC5PcmRlckIIukgFggECEAESVwoVY29tbWl0X2NoZWNrX3N0YXR1c2VzGAUgAygOMikuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5Db21taXRDaGVja1N0YXR1c0INukgKkgEHIgWCAQIQARIkCg9zdGFydF9jb21taXRfaWQYBiABKAlCC7pICNgBAXIDiAIBEikKIW9ubHlfY29tbWl0c193aXRoX2NoYW5nZWRfZGlnZXN0cxgHIAEoCCI9CgVPcmRlchIVChFPUkRFUl9VTlNQRUNJRklFRBAAEg4KCk9SREVSX0RFU0MQARINCglPUkRFUl9BU0MQAiKVAgoYTGlzdExhYmVsSGlzdG9yeVJlc3BvbnNlEiEKD25leHRfcGFnZV90b2tlbhgBIAEoCUIIukgFcgMYgCASRgoGdmFsdWVzGAIgAygLMjYuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MaXN0TGFiZWxIaXN0b3J5UmVzcG9uc2UuVmFsdWUajQEKBVZhbHVlEjYKBmNvbW1pdBgBIAEoCzIeLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjEuQ29tbWl0Qga6SAPIAQESTAoSY29tbWl0X2NoZWNrX3N0YXRlGAIgASgLMiguYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5Db21taXRDaGVja1N0YXRlQga6SAPIAQEi2wEKG0NyZWF0ZU9yVXBkYXRlTGFiZWxzUmVxdWVzdBJWCgZ2YWx1ZXMYASADKAsyOS5idWYucmVnaXN0cnkubW9kdWxlLnYxLkNyZWF0ZU9yVXBkYXRlTGFiZWxzUmVxdWVzdC5WYWx1ZUILukgIkgEFCAEQ+gEaZAoFVmFsdWUSOwoJbGFiZWxfcmVmGAEgASgLMiAuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MYWJlbFJlZkIGukgDyAEBEh4KCWNvbW1pdF9pZBgCIAEoCUILukgIyAEBcgOIAgEiVwocQ3JlYXRlT3JVcGRhdGVMYWJlbHNSZXNwb25zZRI3CgZsYWJlbHMYASADKAsyHS5idWYucmVnaXN0cnkubW9kdWxlLnYxLkxhYmVsQgi6SAWSAQIIASJZChRBcmNoaXZlTGFiZWxzUmVxdWVzdBJBCgpsYWJlbF9yZWZzGAEgAygLMiAuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MYWJlbFJlZkILukgIkgEFCAEQ+gEiFwoVQXJjaGl2ZUxhYmVsc1Jlc3BvbnNlIlsKFlVuYXJjaGl2ZUxhYmVsc1JlcXVlc3QSQQoKbGFiZWxfcmVmcxgBIAMoCzIgLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjEuTGFiZWxSZWZCC7pICJIBBQgBEPoBIhkKF1VuYXJjaGl2ZUxhYmVsc1Jlc3BvbnNlMtAFCgxMYWJlbFNlcnZpY2USZQoJR2V0TGFiZWxzEiguYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5HZXRMYWJlbHNSZXF1ZXN0GikuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5HZXRMYWJlbHNSZXNwb25zZSIDkAIBEmgKCkxpc3RMYWJlbHMSKS5idWYucmVnaXN0cnkubW9kdWxlLnYxLkxpc3RMYWJlbHNSZXF1ZXN0GiouYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MaXN0TGFiZWxzUmVzcG9uc2UiA5ACARJ6ChBMaXN0TGFiZWxIaXN0b3J5Ei8uYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MaXN0TGFiZWxIaXN0b3J5UmVxdWVzdBowLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjEuTGlzdExhYmVsSGlzdG9yeVJlc3BvbnNlIgOQAgEShgEKFENyZWF0ZU9yVXBkYXRlTGFiZWxzEjMuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5DcmVhdGVPclVwZGF0ZUxhYmVsc1JlcXVlc3QaNC5idWYucmVnaXN0cnkubW9kdWxlLnYxLkNyZWF0ZU9yVXBkYXRlTGFiZWxzUmVzcG9uc2UiA5ACAhJxCg1BcmNoaXZlTGFiZWxzEiwuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5BcmNoaXZlTGFiZWxzUmVxdWVzdBotLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjEuQXJjaGl2ZUxhYmVsc1Jlc3BvbnNlIgOQAgISdwoPVW5hcmNoaXZlTGFiZWxzEi4uYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5VbmFyY2hpdmVMYWJlbHNSZXF1ZXN0Gi8uYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5VbmFyY2hpdmVMYWJlbHNSZXNwb25zZSIDkAICQk5aTGJ1Zi5idWlsZC9nZW4vZ28vYnVmYnVpbGQvcmVnaXN0cnkvcHJvdG9jb2xidWZmZXJzL2dvL2J1Zi9yZWdpc3RyeS9tb2R1bGUvdjFiBnByb3RvMw", [file_buf_registry_module_v1_commit, file_buf_registry_module_v1_label, file_buf_registry_module_v1_resource, file_buf_validate_validate]);

/**
 * @generated from message buf.registry.module.v1.GetLabelsRequest
 */
export type GetLabelsRequest = Message<"buf.registry.module.v1.GetLabelsRequest"> & {
  /**
   * The Labels to request.
   *
   * This may reference archived Labels.
   *
   * @generated from field: repeated buf.registry.module.v1.LabelRef label_refs = 1;
   */
  labelRefs: LabelRef[];
};

/**
 * Describes the message buf.registry.module.v1.GetLabelsRequest.
 * Use `create(GetLabelsRequestSchema)` to create a new message.
 */
export const GetLabelsRequestSchema: GenMessage<GetLabelsRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 0);

/**
 * @generated from message buf.registry.module.v1.GetLabelsResponse
 */
export type GetLabelsResponse = Message<"buf.registry.module.v1.GetLabelsResponse"> & {
  /**
   * The retrieved Labels in the same order as requested.
   *
   * @generated from field: repeated buf.registry.module.v1.Label labels = 1;
   */
  labels: Label[];
};

/**
 * Describes the message buf.registry.module.v1.GetLabelsResponse.
 * Use `create(GetLabelsResponseSchema)` to create a new message.
 */
export const GetLabelsResponseSchema: GenMessage<GetLabelsResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 1);

/**
 * @generated from message buf.registry.module.v1.ListLabelsRequest
 */
export type ListLabelsRequest = Message<"buf.registry.module.v1.ListLabelsRequest"> & {
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
   * The reference to list Labels for.
   *
   * See the documentation on Ref for resource resolution details.
   *
   * Once the resource is resolved, the following Labels are listed (subject to any additional filters in the request):
   *   - If a Module is referenced, all Labels for the Module are returned.
   *   - If a Label is referenced, this Label is returned.
   *   - If a Commit is referenced, all Labels that currently point to the Commit are returned. Note that
   *     Labels only point to passed or approved Commits, or Commits where policy checks were disabled.
   *
   * @generated from field: buf.registry.module.v1.ResourceRef resource_ref = 3;
   */
  resourceRef?: ResourceRef;

  /**
   * The order to return the Labels.
   *
   * If not specified, defaults to ORDER_CREATE_TIME_DESC.
   *
   * @generated from field: buf.registry.module.v1.ListLabelsRequest.Order order = 4;
   */
  order: ListLabelsRequest_Order;

  /**
   * Only return Labels that point to a Commit with one of these CommitCheckStatus values.
   *
   * If not set, Labels that point to a Commit with any CommitCheckStatus value are returned.
   *
   * It is an error to filter on CommitCheckStatuses of pending or rejected, as Labels will only
   * point to Commits that are passed or approved, or that have policy checks disabled.
   *
   * @generated from field: repeated buf.registry.module.v1.CommitCheckStatus commit_check_statuses = 5;
   */
  commitCheckStatuses: CommitCheckStatus[];

  /**
   * Only return Labels with a name that contains this string using a case-insensitive comparison.
   *
   * @generated from field: string name_query = 6;
   */
  nameQuery: string;

  /**
   * The archive filter on the returned Labels.
   *
   * If not specified, defaults to ARCHIVE_FILTER_UNARCHIVED_ONLY.
   *
   * @generated from field: buf.registry.module.v1.ListLabelsRequest.ArchiveFilter archive_filter = 7;
   */
  archiveFilter: ListLabelsRequest_ArchiveFilter;
};

/**
 * Describes the message buf.registry.module.v1.ListLabelsRequest.
 * Use `create(ListLabelsRequestSchema)` to create a new message.
 */
export const ListLabelsRequestSchema: GenMessage<ListLabelsRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 2);

/**
 * The list order.
 *
 * @generated from enum buf.registry.module.v1.ListLabelsRequest.Order
 */
export enum ListLabelsRequest_Order {
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

  /**
   * Order by update_time newest to oldest.
   *
   * @generated from enum value: ORDER_UPDATE_TIME_DESC = 3;
   */
  UPDATE_TIME_DESC = 3,

  /**
   * Order by update_time oldest to newest.
   *
   * @generated from enum value: ORDER_UPDATE_TIME_ASC = 4;
   */
  UPDATE_TIME_ASC = 4,
}

/**
 * Describes the enum buf.registry.module.v1.ListLabelsRequest.Order.
 */
export const ListLabelsRequest_OrderSchema: GenEnum<ListLabelsRequest_Order> = /*@__PURE__*/
  enumDesc(file_buf_registry_module_v1_label_service, 2, 0);

/**
 * A filter on whether a Label is archived or not.
 *
 * @generated from enum buf.registry.module.v1.ListLabelsRequest.ArchiveFilter
 */
export enum ListLabelsRequest_ArchiveFilter {
  /**
   * @generated from enum value: ARCHIVE_FILTER_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Return only unarchived labels.
   *
   * @generated from enum value: ARCHIVE_FILTER_UNARCHIVED_ONLY = 1;
   */
  UNARCHIVED_ONLY = 1,

  /**
   * Return only archived labels.
   *
   * @generated from enum value: ARCHIVE_FILTER_ARCHIVED_ONLY = 2;
   */
  ARCHIVED_ONLY = 2,

  /**
   * Return both archived and unarchived labels.
   *
   * @generated from enum value: ARCHIVE_FILTER_ALL = 3;
   */
  ALL = 3,
}

/**
 * Describes the enum buf.registry.module.v1.ListLabelsRequest.ArchiveFilter.
 */
export const ListLabelsRequest_ArchiveFilterSchema: GenEnum<ListLabelsRequest_ArchiveFilter> = /*@__PURE__*/
  enumDesc(file_buf_registry_module_v1_label_service, 2, 1);

/**
 * @generated from message buf.registry.module.v1.ListLabelsResponse
 */
export type ListLabelsResponse = Message<"buf.registry.module.v1.ListLabelsResponse"> & {
  /**
   * The next page token.
   *
   * If empty, there are no more pages.
   *
   * @generated from field: string next_page_token = 1;
   */
  nextPageToken: string;

  /**
   * The listed Labels.
   *
   * @generated from field: repeated buf.registry.module.v1.Label labels = 2;
   */
  labels: Label[];
};

/**
 * Describes the message buf.registry.module.v1.ListLabelsResponse.
 * Use `create(ListLabelsResponseSchema)` to create a new message.
 */
export const ListLabelsResponseSchema: GenMessage<ListLabelsResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 3);

/**
 * @generated from message buf.registry.module.v1.ListLabelHistoryRequest
 */
export type ListLabelHistoryRequest = Message<"buf.registry.module.v1.ListLabelHistoryRequest"> & {
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
   * If empty, the first page is returned.
   *
   * @generated from field: string page_token = 2;
   */
  pageToken: string;

  /**
   * The Label to list history for.
   *
   * This may reference archived Labels.
   *
   * @generated from field: buf.registry.module.v1.LabelRef label_ref = 3;
   */
  labelRef?: LabelRef;

  /**
   * The order to list the Labels.
   *
   * If not specified, defaults to ORDER_DESC.
   *
   * @generated from field: buf.registry.module.v1.ListLabelHistoryRequest.Order order = 4;
   */
  order: ListLabelHistoryRequest_Order;

  /**
   * Only return Commits that have one of these CommitCheckStatus values for this label.
   *
   * If not set, Commits with any CommitCheckStatus value are returned.
   *
   * @generated from field: repeated buf.registry.module.v1.CommitCheckStatus commit_check_statuses = 5;
   */
  commitCheckStatuses: CommitCheckStatus[];

  /**
   * The Commit id to start from.
   *
   * It is an error to provide a Commit id that doesn't exist on the Label.
   *
   * @generated from field: string start_commit_id = 6;
   */
  startCommitId: string;

  /**
   * Only list Commits where the Digest has changed from the previous Commit in the
   * history of this Label.
   *
   * @generated from field: bool only_commits_with_changed_digests = 7;
   */
  onlyCommitsWithChangedDigests: boolean;
};

/**
 * Describes the message buf.registry.module.v1.ListLabelHistoryRequest.
 * Use `create(ListLabelHistoryRequestSchema)` to create a new message.
 */
export const ListLabelHistoryRequestSchema: GenMessage<ListLabelHistoryRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 4);

/**
 * The list order.
 *
 * @generated from enum buf.registry.module.v1.ListLabelHistoryRequest.Order
 */
export enum ListLabelHistoryRequest_Order {
  /**
   * @generated from enum value: ORDER_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Order by association time newest to oldest.
   *
   * The Commits most recently associated with the Label will be listed first.
   *
   * @generated from enum value: ORDER_DESC = 1;
   */
  DESC = 1,

  /**
   * Order by association time oldest to newest.
   *
   * @generated from enum value: ORDER_ASC = 2;
   */
  ASC = 2,
}

/**
 * Describes the enum buf.registry.module.v1.ListLabelHistoryRequest.Order.
 */
export const ListLabelHistoryRequest_OrderSchema: GenEnum<ListLabelHistoryRequest_Order> = /*@__PURE__*/
  enumDesc(file_buf_registry_module_v1_label_service, 4, 0);

/**
 * @generated from message buf.registry.module.v1.ListLabelHistoryResponse
 */
export type ListLabelHistoryResponse = Message<"buf.registry.module.v1.ListLabelHistoryResponse"> & {
  /**
   * The next page token.
   *
   * If empty, there are no more pages.
   *
   * @generated from field: string next_page_token = 1;
   */
  nextPageToken: string;

  /**
   * The ordered history of the Label.
   *
   * @generated from field: repeated buf.registry.module.v1.ListLabelHistoryResponse.Value values = 2;
   */
  values: ListLabelHistoryResponse_Value[];
};

/**
 * Describes the message buf.registry.module.v1.ListLabelHistoryResponse.
 * Use `create(ListLabelHistoryResponseSchema)` to create a new message.
 */
export const ListLabelHistoryResponseSchema: GenMessage<ListLabelHistoryResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 5);

/**
 * @generated from message buf.registry.module.v1.ListLabelHistoryResponse.Value
 */
export type ListLabelHistoryResponse_Value = Message<"buf.registry.module.v1.ListLabelHistoryResponse.Value"> & {
  /**
   * The Commit.
   *
   * @generated from field: buf.registry.module.v1.Commit commit = 1;
   */
  commit?: Commit;

  /**
   * The CommitCheckState for this Commit on this Label.
   *
   * @generated from field: buf.registry.module.v1.CommitCheckState commit_check_state = 2;
   */
  commitCheckState?: CommitCheckState;
};

/**
 * Describes the message buf.registry.module.v1.ListLabelHistoryResponse.Value.
 * Use `create(ListLabelHistoryResponse_ValueSchema)` to create a new message.
 */
export const ListLabelHistoryResponse_ValueSchema: GenMessage<ListLabelHistoryResponse_Value> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 5, 0);

/**
 * @generated from message buf.registry.module.v1.CreateOrUpdateLabelsRequest
 */
export type CreateOrUpdateLabelsRequest = Message<"buf.registry.module.v1.CreateOrUpdateLabelsRequest"> & {
  /**
   * The Labels to create.
   *
   * @generated from field: repeated buf.registry.module.v1.CreateOrUpdateLabelsRequest.Value values = 1;
   */
  values: CreateOrUpdateLabelsRequest_Value[];
};

/**
 * Describes the message buf.registry.module.v1.CreateOrUpdateLabelsRequest.
 * Use `create(CreateOrUpdateLabelsRequestSchema)` to create a new message.
 */
export const CreateOrUpdateLabelsRequestSchema: GenMessage<CreateOrUpdateLabelsRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 6);

/**
 * An individual request to create or update a Label.
 *
 * @generated from message buf.registry.module.v1.CreateOrUpdateLabelsRequest.Value
 */
export type CreateOrUpdateLabelsRequest_Value = Message<"buf.registry.module.v1.CreateOrUpdateLabelsRequest.Value"> & {
  /**
   * The Labels to create or update.
   *
   * @generated from field: buf.registry.module.v1.LabelRef label_ref = 1;
   */
  labelRef?: LabelRef;

  /**
   * The id of the Commit to associate with the Label.
   *
   * If the Label already existed, the Label will now point to this Commit, as long as this Commit
   * is newer than the Commit that the Label is currently pointing to, otherwise an error is
   * returned.
   * If the Label was archived, it will be unarchived.
   *
   * @generated from field: string commit_id = 2;
   */
  commitId: string;
};

/**
 * Describes the message buf.registry.module.v1.CreateOrUpdateLabelsRequest.Value.
 * Use `create(CreateOrUpdateLabelsRequest_ValueSchema)` to create a new message.
 */
export const CreateOrUpdateLabelsRequest_ValueSchema: GenMessage<CreateOrUpdateLabelsRequest_Value> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 6, 0);

/**
 * @generated from message buf.registry.module.v1.CreateOrUpdateLabelsResponse
 */
export type CreateOrUpdateLabelsResponse = Message<"buf.registry.module.v1.CreateOrUpdateLabelsResponse"> & {
  /**
   * The created or updated Labels in the same order as given on the request.
   *
   * @generated from field: repeated buf.registry.module.v1.Label labels = 1;
   */
  labels: Label[];
};

/**
 * Describes the message buf.registry.module.v1.CreateOrUpdateLabelsResponse.
 * Use `create(CreateOrUpdateLabelsResponseSchema)` to create a new message.
 */
export const CreateOrUpdateLabelsResponseSchema: GenMessage<CreateOrUpdateLabelsResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 7);

/**
 * @generated from message buf.registry.module.v1.ArchiveLabelsRequest
 */
export type ArchiveLabelsRequest = Message<"buf.registry.module.v1.ArchiveLabelsRequest"> & {
  /**
   * The Labels to archive.
   *
   * @generated from field: repeated buf.registry.module.v1.LabelRef label_refs = 1;
   */
  labelRefs: LabelRef[];
};

/**
 * Describes the message buf.registry.module.v1.ArchiveLabelsRequest.
 * Use `create(ArchiveLabelsRequestSchema)` to create a new message.
 */
export const ArchiveLabelsRequestSchema: GenMessage<ArchiveLabelsRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 8);

/**
 * @generated from message buf.registry.module.v1.ArchiveLabelsResponse
 */
export type ArchiveLabelsResponse = Message<"buf.registry.module.v1.ArchiveLabelsResponse"> & {
};

/**
 * Describes the message buf.registry.module.v1.ArchiveLabelsResponse.
 * Use `create(ArchiveLabelsResponseSchema)` to create a new message.
 */
export const ArchiveLabelsResponseSchema: GenMessage<ArchiveLabelsResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 9);

/**
 * @generated from message buf.registry.module.v1.UnarchiveLabelsRequest
 */
export type UnarchiveLabelsRequest = Message<"buf.registry.module.v1.UnarchiveLabelsRequest"> & {
  /**
   * The Labels to unarchive.
   *
   * @generated from field: repeated buf.registry.module.v1.LabelRef label_refs = 1;
   */
  labelRefs: LabelRef[];
};

/**
 * Describes the message buf.registry.module.v1.UnarchiveLabelsRequest.
 * Use `create(UnarchiveLabelsRequestSchema)` to create a new message.
 */
export const UnarchiveLabelsRequestSchema: GenMessage<UnarchiveLabelsRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 10);

/**
 * @generated from message buf.registry.module.v1.UnarchiveLabelsResponse
 */
export type UnarchiveLabelsResponse = Message<"buf.registry.module.v1.UnarchiveLabelsResponse"> & {
};

/**
 * Describes the message buf.registry.module.v1.UnarchiveLabelsResponse.
 * Use `create(UnarchiveLabelsResponseSchema)` to create a new message.
 */
export const UnarchiveLabelsResponseSchema: GenMessage<UnarchiveLabelsResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_label_service, 11);

/**
 * Operate on Labels.
 *
 * @generated from service buf.registry.module.v1.LabelService
 */
export const LabelService: GenService<{
  /**
   * Get Labels by id or name.
   *
   * @generated from rpc buf.registry.module.v1.LabelService.GetLabels
   */
  getLabels: {
    methodKind: "unary";
    input: typeof GetLabelsRequestSchema;
    output: typeof GetLabelsResponseSchema;
  },
  /**
   * List Labels for a given Module, Commit, or CommitDigest.
   *
   * @generated from rpc buf.registry.module.v1.LabelService.ListLabels
   */
  listLabels: {
    methodKind: "unary";
    input: typeof ListLabelsRequestSchema;
    output: typeof ListLabelsResponseSchema;
  },
  /**
   * List the history of a Label.
   *
   * @generated from rpc buf.registry.module.v1.LabelService.ListLabelHistory
   */
  listLabelHistory: {
    methodKind: "unary";
    input: typeof ListLabelHistoryRequestSchema;
    output: typeof ListLabelHistoryResponseSchema;
  },
  /**
   * Create or update Labels on a Module.
   *
   * If the Label does not exist, it will be created.
   * If the Label was archived, it will be unarchived.
   * If the Label already existed, the Commit in the request has to be newer than the Commit that
   * the Label is currently pointing to, otherwise an error is returned.
   *
   * This operation is atomic. Either all Labels are created/updated or an error is returned.
   *
   * @generated from rpc buf.registry.module.v1.LabelService.CreateOrUpdateLabels
   */
  createOrUpdateLabels: {
    methodKind: "unary";
    input: typeof CreateOrUpdateLabelsRequestSchema;
    output: typeof CreateOrUpdateLabelsResponseSchema;
  },
  /**
   * Archive existing Labels.
   *
   * This operation is atomic. Either all Labels are archived or an error is returned.
   *
   * @generated from rpc buf.registry.module.v1.LabelService.ArchiveLabels
   */
  archiveLabels: {
    methodKind: "unary";
    input: typeof ArchiveLabelsRequestSchema;
    output: typeof ArchiveLabelsResponseSchema;
  },
  /**
   * Unarchive existing Labels.
   *
   * This operation is atomic. Either all Labels are unarchived or an error is returned.
   *
   * @generated from rpc buf.registry.module.v1.LabelService.UnarchiveLabels
   */
  unarchiveLabels: {
    methodKind: "unary";
    input: typeof UnarchiveLabelsRequestSchema;
    output: typeof UnarchiveLabelsResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_buf_registry_module_v1_label_service, 0);

