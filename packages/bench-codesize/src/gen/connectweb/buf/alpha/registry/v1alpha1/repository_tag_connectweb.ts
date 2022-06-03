// Copyright 2020-2022 Buf Technologies, Inc.
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

// @generated by protoc-gen-connect-web v0.0.6 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/repository_tag.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import {CreateRepositoryTagRequest, CreateRepositoryTagResponse, ListRepositoryTagsRequest, ListRepositoryTagsResponse} from "./repository_tag_pb.js";
import {MethodKind} from "@bufbuild/protobuf";

/**
 * RepositoryTagService is the Repository tag service.
 *
 * @generated from service buf.alpha.registry.v1alpha1.RepositoryTagService
 */
export const RepositoryTagService = {
  typeName: "buf.alpha.registry.v1alpha1.RepositoryTagService",
  methods: {
    /**
     * CreateRepositoryTag creates a new repository tag.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.RepositoryTagService.CreateRepositoryTag
     */
    createRepositoryTag: {
      name: "CreateRepositoryTag",
      I: CreateRepositoryTagRequest,
      O: CreateRepositoryTagResponse,
      kind: MethodKind.Unary,
    },
    /**
     * ListRepositoryTags lists the repository tags associated with a Repository.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.RepositoryTagService.ListRepositoryTags
     */
    listRepositoryTags: {
      name: "ListRepositoryTags",
      I: ListRepositoryTagsRequest,
      O: ListRepositoryTagsResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

