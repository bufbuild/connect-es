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

import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";
import { createAsyncIterable, pipe } from "./async-iterable.js";
import type { UniversalHandler } from "./universal-handler.js";
import type { UniversalClientFn } from "./universal.js";
import { getAbortSignalReason } from "./signals.js";

/**
 * An in-memory UniversalClientFn that can be used to route requests to a ConnectRouter
 * bypassing network calls. Useful for testing and calling in-process services.
 */
export function createUniversalHandlerClient(
  uHandlers: UniversalHandler[]
): UniversalClientFn {
  const handlerMap = new Map<string, UniversalHandler>();
  for (const handler of uHandlers) {
    handlerMap.set(handler.requestPath, handler);
  }
  return async (uClientReq) => {
    const reqUrl = new URL(uClientReq.url);
    const handler = handlerMap.get(reqUrl.pathname);
    if (!handler) {
      throw new ConnectError(
        `RouterHttpClient: no handler registered for ${reqUrl.pathname}`,
        Code.Unimplemented
      );
    }
    const reqSignal = uClientReq.signal ?? new AbortController().signal;
    const uServerRes = await raceSignal(
      reqSignal,
      handler({
        body: uClientReq.body,
        httpVersion: "2.0",
        method: uClientReq.method,
        url: reqUrl,
        header: uClientReq.header,
        signal: reqSignal,
      })
    );
    let body = uServerRes.body ?? new Uint8Array();
    if (body instanceof Uint8Array) {
      body = createAsyncIterable([body]);
    }
    return {
      body: pipe(body, (iterable) => {
        return {
          [Symbol.asyncIterator]() {
            const it = iterable[Symbol.asyncIterator]();
            const w: AsyncIterator<Uint8Array> = {
              next() {
                return raceSignal(reqSignal, it.next());
              },
            };
            if (it.throw !== undefined) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- can't handle mutated object sensibly
              w.throw = (e: unknown) => it.throw!(e);
            }
            if (it.return !== undefined) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,@typescript-eslint/no-explicit-any -- can't handle mutated object sensibly
              w.return = (value?: any) => it.return!(value);
            }
            return w;
          },
        };
      }),
      header: new Headers(uServerRes.header),
      status: uServerRes.status,
      trailer: new Headers(uServerRes.trailer),
    };
  };
}

function raceSignal<T>(signal: AbortSignal, promise: Promise<T>): Promise<T> {
  let cleanup: (() => void) | undefined;
  const signalPromise = new Promise<never>((_, reject) => {
    if (signal.aborted) {
      reject(getAbortSignalReason(signal));
      return;
    }
    function onAbort() {
      reject(getAbortSignalReason(signal));
    }
    cleanup = () => signal.addEventListener("abort", onAbort);
  });
  return Promise.race([signalPromise, promise]).finally(cleanup);
}
