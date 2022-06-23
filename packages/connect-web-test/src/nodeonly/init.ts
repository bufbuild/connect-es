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

import {
  baseUrl,
  clientCert,
  clientKey,
  crosstestTransports,
} from "../helpers/crosstestserver.js";
import { createGrpcTransport } from "./grpc-transport.js";
import * as grpc from "@grpc/grpc-js";
import * as tls from "tls";
import { TypeRegistry } from "@bufbuild/protobuf";
import { ErrorDetail } from "../gen/grpc/testing/messages_pb.js";
import { ReadableStream } from "node:stream/web";

// add the gRPC transport - but only when running in node
crosstestTransports["gRPC transport"] = (options?: Record<string, unknown>) =>
  createGrpcTransport({
    errorDetailRegistry: TypeRegistry.from(ErrorDetail),
    ...options,
    address: baseUrl.substring("https://".length),
    channelCredentials: grpc.ChannelCredentials.createFromSecureContext(
      tls.createSecureContext({
        cert: clientCert,
        key: clientKey,
      })
    ),
  });

// node >= v16 has an implementation for WHATWG streams, but doesn't expose
// them in the global scope, nor globalThis.
globalThis.ReadableStream = ReadableStream;
