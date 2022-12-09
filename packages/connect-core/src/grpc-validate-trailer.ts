// Copyright 2021-2022 Buf Technologies, Inc.
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

import { grpcFindTrailerError } from "./grpc-trailer-status.js";

/**
 * Validates a trailer for the gRPC and the gRPC-web protocol.
 * Throws a ConnectError if the trailer contains an error status.
 */
export function grpcValidateTrailer(trailer: Headers): void {
  const err = grpcFindTrailerError(trailer);
  if (err) {
    throw err;
  }
}
