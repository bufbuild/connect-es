// Copyright 2021-2023 Buf Technologies, Inc.
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

import { Any, Message } from "@bufbuild/protobuf";
import { Status } from "../gen/grpc/status/status_pb.js";
import { ConnectError } from "../connect-error.js";
import { decodeBinaryHeader, encodeBinaryHeader } from "../http-headers.js";
import { Code } from "../code.js";

const fieldGrpcStatusDetailsBin = "grpc-status-details-bin",
  fieldGrpcStatus = "grpc-status",
  fieldGrpcMessage = "grpc-message";

/**
 * Sets the fields "grpc-status" and "grpc-message" in the given
 * Headers object.
 * If an error is given and contains error details, the function
 * will also set the field "grpc-status-details-bin" with an encoded
 * google.rpc.Status message including the error details.
 */
export function grpcSetTrailerStatus(
  target: Headers,
  error: ConnectError | undefined
): void {
  if (error) {
    target.set(fieldGrpcStatus, error.code.toString(10));
    target.set(fieldGrpcMessage, encodeURIComponent(error.rawMessage));
    if (error.details.length > 0) {
      const status = new Status({
        code: error.code,
        message: error.rawMessage,
        details: error.details.map((value) =>
          value instanceof Message
            ? Any.pack(value)
            : new Any({
                typeUrl: `type.googleapis.com/${value.type}`,
                value: value.value,
              })
        ),
      });
      target.set(fieldGrpcStatusDetailsBin, encodeBinaryHeader(status));
    }
  } else {
    target.set(fieldGrpcStatus, "0");
  }
}

/**
 * Find an error status in the given Headers object, which can be either
 * a trailer, or a header (as allowed for so-called trailers-only responses).
 * The field "grpc-status-details-bin" is inspected, and if not present,
 * the fields "grpc-status" and "grpc-message" are used.
 * Returns an error only if the gRPC status code is > 0.
 */
export function grpcFindTrailerError(
  headerOrTrailer: Headers
): ConnectError | undefined {
  // Prefer the protobuf-encoded data to the grpc-status header.
  const statusBytes = headerOrTrailer.get(fieldGrpcStatusDetailsBin);
  if (statusBytes != null) {
    const status = decodeBinaryHeader(statusBytes, Status);
    if (status.code == 0) {
      return undefined;
    }
    const error = new ConnectError(
      status.message,
      status.code,
      headerOrTrailer
    );
    error.details = status.details.map((any) => ({
      type: any.typeUrl.substring(any.typeUrl.lastIndexOf("/") + 1),
      value: any.value,
    }));
    return error;
  }
  const grpcStatus = headerOrTrailer.get(fieldGrpcStatus);
  if (grpcStatus != null) {
    const code = parseInt(grpcStatus, 10);
    if (code === 0) {
      return undefined;
    }
    if (code in Code) {
      return new ConnectError(
        decodeURIComponent(headerOrTrailer.get(fieldGrpcMessage) ?? ""),
        code,
        headerOrTrailer
      );
    }
    return new ConnectError(
      `invalid grpc-status: ${grpcStatus}`,
      Code.Internal
    );
  }
  return undefined;
}
