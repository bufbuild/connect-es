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

import { ConnectError } from "@connectrpc/connect";
import {
  ClientCompatRequest,
  ClientCompatResponse,
  ClientErrorResult,
} from "../gen/connectrpc/conformance/v1/client_compat_pb.js";
import invoke from "../invoke.js";
import { createTransport } from "./transport.js";

declare global {
  interface Window {
    runTestCase: (data: number[]) => Promise<number[]>;
  }
}

// The main entry point into the browser code running in Puppeteer/headless Chrome.
// This function is invoked by the page.evalulate call in grpcwebclient.
async function runTestCase(data: number[]): Promise<number[]> {
  const req = ClientCompatRequest.fromBinary(new Uint8Array(data));
  const res = new ClientCompatResponse({
    testName: req.testName,
  });
  try {
    const result = await invoke(createTransport(req), req);
    res.result = { case: "response", value: result };
  } catch (err) {
    res.result = {
      case: "error",
      value: new ClientErrorResult({ message: ConnectError.from(err).message }),
    };
  }
  return Array.from(res.toBinary());
}

window.runTestCase = runTestCase;
