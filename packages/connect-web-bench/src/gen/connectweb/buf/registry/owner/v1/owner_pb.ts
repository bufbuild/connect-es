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
// @generated from file buf/registry/owner/v1/owner.proto (package buf.registry.owner.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Organization } from "./organization_pb";
import { file_buf_registry_owner_v1_organization } from "./organization_pb";
import type { User } from "./user_pb";
import { file_buf_registry_owner_v1_user } from "./user_pb";
import { file_buf_registry_priv_extension_v1beta1_extension } from "../../priv/extension/v1beta1/extension_pb";
import { file_buf_validate_validate } from "../../../validate/validate_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/registry/owner/v1/owner.proto.
 */
export const file_buf_registry_owner_v1_owner: GenFile = /*@__PURE__*/
  fileDesc("CiFidWYvcmVnaXN0cnkvb3duZXIvdjEvb3duZXIucHJvdG8SFWJ1Zi5yZWdpc3RyeS5vd25lci52MSKJAQoFT3duZXISKwoEdXNlchgBIAEoCzIbLmJ1Zi5yZWdpc3RyeS5vd25lci52MS5Vc2VySAASOwoMb3JnYW5pemF0aW9uGAIgASgLMiMuYnVmLnJlZ2lzdHJ5Lm93bmVyLnYxLk9yZ2FuaXphdGlvbkgAOgbqxSsCEAFCDgoFdmFsdWUSBbpIAggBInAKCE93bmVyUmVmEhYKAmlkGAEgASgJQgi6SAVyA4gCAUgAEjQKBG5hbWUYAiABKAlCJLpIIXIfEAIYIDIZXlthLXpdW2EtejAtOS1dKlthLXowLTldJEgAOgbqxSsCCAFCDgoFdmFsdWUSBbpIAggBQk1aS2J1Zi5idWlsZC9nZW4vZ28vYnVmYnVpbGQvcmVnaXN0cnkvcHJvdG9jb2xidWZmZXJzL2dvL2J1Zi9yZWdpc3RyeS9vd25lci92MWIGcHJvdG8z", [file_buf_registry_owner_v1_organization, file_buf_registry_owner_v1_user, file_buf_registry_priv_extension_v1beta1_extension, file_buf_validate_validate]);

/**
 * A User or Organization.
 *
 * @generated from message buf.registry.owner.v1.Owner
 */
export type Owner = Message<"buf.registry.owner.v1.Owner"> & {
  /**
   * @generated from oneof buf.registry.owner.v1.Owner.value
   */
  value: {
    /**
     * The User.
     *
     * @generated from field: buf.registry.owner.v1.User user = 1;
     */
    value: User;
    case: "user";
  } | {
    /**
     * The Organization.
     *
     * @generated from field: buf.registry.owner.v1.Organization organization = 2;
     */
    value: Organization;
    case: "organization";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message buf.registry.owner.v1.Owner.
 * Use `create(OwnerSchema)` to create a new message.
 */
export const OwnerSchema: GenMessage<Owner> = /*@__PURE__*/
  messageDesc(file_buf_registry_owner_v1_owner, 0);

/**
 * OwnerRef is a reference to a User or Organization, either an id or a name.
 *
 * This is used in requests.
 *
 * @generated from message buf.registry.owner.v1.OwnerRef
 */
export type OwnerRef = Message<"buf.registry.owner.v1.OwnerRef"> & {
  /**
   * @generated from oneof buf.registry.owner.v1.OwnerRef.value
   */
  value: {
    /**
     * The id of the User or Organization.
     *
     * @generated from field: string id = 1;
     */
    value: string;
    case: "id";
  } | {
    /**
     * The name of the User or Organization.
     *
     * @generated from field: string name = 2;
     */
    value: string;
    case: "name";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message buf.registry.owner.v1.OwnerRef.
 * Use `create(OwnerRefSchema)` to create a new message.
 */
export const OwnerRefSchema: GenMessage<OwnerRef> = /*@__PURE__*/
  messageDesc(file_buf_registry_owner_v1_owner, 1);

