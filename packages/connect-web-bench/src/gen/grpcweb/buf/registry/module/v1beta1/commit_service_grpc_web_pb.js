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

/**
 * @fileoverview gRPC-Web generated client stub for buf.registry.module.v1beta1
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v0.0.0
// source: buf/registry/module/v1beta1/commit_service.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var buf_registry_module_v1beta1_commit_pb = require('../../../../buf/registry/module/v1beta1/commit_pb.js')

var buf_registry_module_v1beta1_digest_pb = require('../../../../buf/registry/module/v1beta1/digest_pb.js')

var buf_registry_module_v1beta1_resource_pb = require('../../../../buf/registry/module/v1beta1/resource_pb.js')

var buf_validate_validate_pb = require('../../../../buf/validate/validate_pb.js')
const proto = {};
proto.buf = {};
proto.buf.registry = {};
proto.buf.registry.module = {};
proto.buf.registry.module.v1beta1 = require('./commit_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.registry.module.v1beta1.CommitServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.registry.module.v1beta1.CommitServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.registry.module.v1beta1.GetCommitsRequest,
 *   !proto.buf.registry.module.v1beta1.GetCommitsResponse>}
 */
const methodDescriptor_CommitService_GetCommits = new grpc.web.MethodDescriptor(
  '/buf.registry.module.v1beta1.CommitService/GetCommits',
  grpc.web.MethodType.UNARY,
  proto.buf.registry.module.v1beta1.GetCommitsRequest,
  proto.buf.registry.module.v1beta1.GetCommitsResponse,
  /**
   * @param {!proto.buf.registry.module.v1beta1.GetCommitsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.registry.module.v1beta1.GetCommitsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.registry.module.v1beta1.GetCommitsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.registry.module.v1beta1.GetCommitsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.registry.module.v1beta1.GetCommitsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.registry.module.v1beta1.CommitServiceClient.prototype.getCommits =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.registry.module.v1beta1.CommitService/GetCommits',
      request,
      metadata || {},
      methodDescriptor_CommitService_GetCommits,
      callback);
};


/**
 * @param {!proto.buf.registry.module.v1beta1.GetCommitsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.registry.module.v1beta1.GetCommitsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.registry.module.v1beta1.CommitServicePromiseClient.prototype.getCommits =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.registry.module.v1beta1.CommitService/GetCommits',
      request,
      metadata || {},
      methodDescriptor_CommitService_GetCommits);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.registry.module.v1beta1.ListCommitsRequest,
 *   !proto.buf.registry.module.v1beta1.ListCommitsResponse>}
 */
const methodDescriptor_CommitService_ListCommits = new grpc.web.MethodDescriptor(
  '/buf.registry.module.v1beta1.CommitService/ListCommits',
  grpc.web.MethodType.UNARY,
  proto.buf.registry.module.v1beta1.ListCommitsRequest,
  proto.buf.registry.module.v1beta1.ListCommitsResponse,
  /**
   * @param {!proto.buf.registry.module.v1beta1.ListCommitsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.registry.module.v1beta1.ListCommitsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.registry.module.v1beta1.ListCommitsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.registry.module.v1beta1.ListCommitsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.registry.module.v1beta1.ListCommitsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.registry.module.v1beta1.CommitServiceClient.prototype.listCommits =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.registry.module.v1beta1.CommitService/ListCommits',
      request,
      metadata || {},
      methodDescriptor_CommitService_ListCommits,
      callback);
};


/**
 * @param {!proto.buf.registry.module.v1beta1.ListCommitsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.registry.module.v1beta1.ListCommitsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.registry.module.v1beta1.CommitServicePromiseClient.prototype.listCommits =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.registry.module.v1beta1.CommitService/ListCommits',
      request,
      metadata || {},
      methodDescriptor_CommitService_ListCommits);
};


module.exports = proto.buf.registry.module.v1beta1;

