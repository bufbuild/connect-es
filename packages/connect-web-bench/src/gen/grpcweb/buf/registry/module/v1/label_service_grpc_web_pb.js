// Copyright 2021-2025 The Connect Authors
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
 * @fileoverview gRPC-Web generated client stub for buf.registry.module.v1
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v0.0.0
// source: buf/registry/module/v1/label_service.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var buf_registry_module_v1_commit_pb = require('../../../../buf/registry/module/v1/commit_pb.js')

var buf_registry_module_v1_label_pb = require('../../../../buf/registry/module/v1/label_pb.js')

var buf_registry_module_v1_resource_pb = require('../../../../buf/registry/module/v1/resource_pb.js')

var buf_validate_validate_pb = require('../../../../buf/validate/validate_pb.js')
const proto = {};
proto.buf = {};
proto.buf.registry = {};
proto.buf.registry.module = {};
proto.buf.registry.module.v1 = require('./label_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.registry.module.v1.LabelServiceClient =
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
proto.buf.registry.module.v1.LabelServicePromiseClient =
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
 *   !proto.buf.registry.module.v1.GetLabelsRequest,
 *   !proto.buf.registry.module.v1.GetLabelsResponse>}
 */
const methodDescriptor_LabelService_GetLabels = new grpc.web.MethodDescriptor(
  '/buf.registry.module.v1.LabelService/GetLabels',
  grpc.web.MethodType.UNARY,
  proto.buf.registry.module.v1.GetLabelsRequest,
  proto.buf.registry.module.v1.GetLabelsResponse,
  /**
   * @param {!proto.buf.registry.module.v1.GetLabelsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.registry.module.v1.GetLabelsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.registry.module.v1.GetLabelsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.registry.module.v1.GetLabelsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.registry.module.v1.GetLabelsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.registry.module.v1.LabelServiceClient.prototype.getLabels =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.registry.module.v1.LabelService/GetLabels',
      request,
      metadata || {},
      methodDescriptor_LabelService_GetLabels,
      callback);
};


/**
 * @param {!proto.buf.registry.module.v1.GetLabelsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.registry.module.v1.GetLabelsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.registry.module.v1.LabelServicePromiseClient.prototype.getLabels =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.registry.module.v1.LabelService/GetLabels',
      request,
      metadata || {},
      methodDescriptor_LabelService_GetLabels);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.registry.module.v1.ListLabelsRequest,
 *   !proto.buf.registry.module.v1.ListLabelsResponse>}
 */
const methodDescriptor_LabelService_ListLabels = new grpc.web.MethodDescriptor(
  '/buf.registry.module.v1.LabelService/ListLabels',
  grpc.web.MethodType.UNARY,
  proto.buf.registry.module.v1.ListLabelsRequest,
  proto.buf.registry.module.v1.ListLabelsResponse,
  /**
   * @param {!proto.buf.registry.module.v1.ListLabelsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.registry.module.v1.ListLabelsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.registry.module.v1.ListLabelsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.registry.module.v1.ListLabelsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.registry.module.v1.ListLabelsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.registry.module.v1.LabelServiceClient.prototype.listLabels =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.registry.module.v1.LabelService/ListLabels',
      request,
      metadata || {},
      methodDescriptor_LabelService_ListLabels,
      callback);
};


/**
 * @param {!proto.buf.registry.module.v1.ListLabelsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.registry.module.v1.ListLabelsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.registry.module.v1.LabelServicePromiseClient.prototype.listLabels =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.registry.module.v1.LabelService/ListLabels',
      request,
      metadata || {},
      methodDescriptor_LabelService_ListLabels);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.registry.module.v1.ListLabelHistoryRequest,
 *   !proto.buf.registry.module.v1.ListLabelHistoryResponse>}
 */
const methodDescriptor_LabelService_ListLabelHistory = new grpc.web.MethodDescriptor(
  '/buf.registry.module.v1.LabelService/ListLabelHistory',
  grpc.web.MethodType.UNARY,
  proto.buf.registry.module.v1.ListLabelHistoryRequest,
  proto.buf.registry.module.v1.ListLabelHistoryResponse,
  /**
   * @param {!proto.buf.registry.module.v1.ListLabelHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.registry.module.v1.ListLabelHistoryResponse.deserializeBinary
);


/**
 * @param {!proto.buf.registry.module.v1.ListLabelHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.registry.module.v1.ListLabelHistoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.registry.module.v1.ListLabelHistoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.registry.module.v1.LabelServiceClient.prototype.listLabelHistory =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.registry.module.v1.LabelService/ListLabelHistory',
      request,
      metadata || {},
      methodDescriptor_LabelService_ListLabelHistory,
      callback);
};


/**
 * @param {!proto.buf.registry.module.v1.ListLabelHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.registry.module.v1.ListLabelHistoryResponse>}
 *     Promise that resolves to the response
 */
proto.buf.registry.module.v1.LabelServicePromiseClient.prototype.listLabelHistory =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.registry.module.v1.LabelService/ListLabelHistory',
      request,
      metadata || {},
      methodDescriptor_LabelService_ListLabelHistory);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.registry.module.v1.CreateOrUpdateLabelsRequest,
 *   !proto.buf.registry.module.v1.CreateOrUpdateLabelsResponse>}
 */
const methodDescriptor_LabelService_CreateOrUpdateLabels = new grpc.web.MethodDescriptor(
  '/buf.registry.module.v1.LabelService/CreateOrUpdateLabels',
  grpc.web.MethodType.UNARY,
  proto.buf.registry.module.v1.CreateOrUpdateLabelsRequest,
  proto.buf.registry.module.v1.CreateOrUpdateLabelsResponse,
  /**
   * @param {!proto.buf.registry.module.v1.CreateOrUpdateLabelsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.registry.module.v1.CreateOrUpdateLabelsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.registry.module.v1.CreateOrUpdateLabelsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.registry.module.v1.CreateOrUpdateLabelsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.registry.module.v1.CreateOrUpdateLabelsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.registry.module.v1.LabelServiceClient.prototype.createOrUpdateLabels =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.registry.module.v1.LabelService/CreateOrUpdateLabels',
      request,
      metadata || {},
      methodDescriptor_LabelService_CreateOrUpdateLabels,
      callback);
};


/**
 * @param {!proto.buf.registry.module.v1.CreateOrUpdateLabelsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.registry.module.v1.CreateOrUpdateLabelsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.registry.module.v1.LabelServicePromiseClient.prototype.createOrUpdateLabels =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.registry.module.v1.LabelService/CreateOrUpdateLabels',
      request,
      metadata || {},
      methodDescriptor_LabelService_CreateOrUpdateLabels);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.registry.module.v1.ArchiveLabelsRequest,
 *   !proto.buf.registry.module.v1.ArchiveLabelsResponse>}
 */
const methodDescriptor_LabelService_ArchiveLabels = new grpc.web.MethodDescriptor(
  '/buf.registry.module.v1.LabelService/ArchiveLabels',
  grpc.web.MethodType.UNARY,
  proto.buf.registry.module.v1.ArchiveLabelsRequest,
  proto.buf.registry.module.v1.ArchiveLabelsResponse,
  /**
   * @param {!proto.buf.registry.module.v1.ArchiveLabelsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.registry.module.v1.ArchiveLabelsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.registry.module.v1.ArchiveLabelsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.registry.module.v1.ArchiveLabelsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.registry.module.v1.ArchiveLabelsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.registry.module.v1.LabelServiceClient.prototype.archiveLabels =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.registry.module.v1.LabelService/ArchiveLabels',
      request,
      metadata || {},
      methodDescriptor_LabelService_ArchiveLabels,
      callback);
};


/**
 * @param {!proto.buf.registry.module.v1.ArchiveLabelsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.registry.module.v1.ArchiveLabelsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.registry.module.v1.LabelServicePromiseClient.prototype.archiveLabels =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.registry.module.v1.LabelService/ArchiveLabels',
      request,
      metadata || {},
      methodDescriptor_LabelService_ArchiveLabels);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.registry.module.v1.UnarchiveLabelsRequest,
 *   !proto.buf.registry.module.v1.UnarchiveLabelsResponse>}
 */
const methodDescriptor_LabelService_UnarchiveLabels = new grpc.web.MethodDescriptor(
  '/buf.registry.module.v1.LabelService/UnarchiveLabels',
  grpc.web.MethodType.UNARY,
  proto.buf.registry.module.v1.UnarchiveLabelsRequest,
  proto.buf.registry.module.v1.UnarchiveLabelsResponse,
  /**
   * @param {!proto.buf.registry.module.v1.UnarchiveLabelsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.registry.module.v1.UnarchiveLabelsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.registry.module.v1.UnarchiveLabelsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.registry.module.v1.UnarchiveLabelsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.registry.module.v1.UnarchiveLabelsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.registry.module.v1.LabelServiceClient.prototype.unarchiveLabels =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.registry.module.v1.LabelService/UnarchiveLabels',
      request,
      metadata || {},
      methodDescriptor_LabelService_UnarchiveLabels,
      callback);
};


/**
 * @param {!proto.buf.registry.module.v1.UnarchiveLabelsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.registry.module.v1.UnarchiveLabelsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.registry.module.v1.LabelServicePromiseClient.prototype.unarchiveLabels =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.registry.module.v1.LabelService/UnarchiveLabels',
      request,
      metadata || {},
      methodDescriptor_LabelService_UnarchiveLabels);
};


module.exports = proto.buf.registry.module.v1;

