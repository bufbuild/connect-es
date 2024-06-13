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

import { ConformanceService } from "@connectrpc/connect-conformance";
import * as grpc from "@grpc/grpc-js";
import { createGrpcClient } from "./create-grpc-client.js";

describe("createGrpcClient()", function () {
  it("should create the expected methods", function () {
    const grpcClient = createGrpcClient(ConformanceService, {
      address: "localhost:5002",
      channelCredentials: grpc.ChannelCredentials.createInsecure(),
      clientOptions: {},
      binaryOptions: {},
    });
    expect(grpcClient).toBeDefined();
    expect(typeof grpcClient.unary).toBe("function");
    expect(typeof grpcClient.idempotentUnary).toBe("function");
    expect(typeof grpcClient.serverStream).toBe("function");
    expect(typeof grpcClient.clientStream).toBe("function");
    expect(typeof grpcClient.bidiStream).toBe("function");
  });
});
