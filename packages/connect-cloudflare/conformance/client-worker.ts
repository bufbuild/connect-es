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

import { createRegistry } from "@bufbuild/protobuf";

import {
  invokeWithPromiseClient,
  BidiStreamRequest,
  ClientCompatResponse,
  ClientErrorResult,
  ClientStreamRequest,
  IdempotentUnaryRequest,
  ConformancePayload_RequestInfo,
  ServerStreamRequest,
  UnaryRequest,
  UnimplementedRequest,
} from "@connectrpc/connect-conformance";
import { createTransport } from "./transport.js";
import { createWorkerHandler } from "./handler.js";
import { InvokeService } from "./invoke-service.js";

export default createWorkerHandler({
  jsonOptions: {
    typeRegistry: createRegistry(
      UnaryRequest,
      ServerStreamRequest,
      ClientStreamRequest,
      BidiStreamRequest,
      UnimplementedRequest,
      IdempotentUnaryRequest,
      ConformancePayload_RequestInfo,
    ),
  },
  routes({ service }) {
    service(InvokeService, {
      async invoke(req) {
        const res = new ClientCompatResponse({
          testName: req.testName,
        });
        try {
          const invokeResult = await invokeWithPromiseClient(
            createTransport(req),
            req,
          );
          res.result = { case: "response", value: invokeResult };
        } catch (e) {
          res.result = {
            case: "error",
            value: new ClientErrorResult({ message: (e as Error).message }),
          };
        }
        return res;
      },
    });
  },
});
