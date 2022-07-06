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
  CallOptions,
  makeAnyClient,
  Transport,
  StreamResponse,
} from '@bufbuild/connect-web';
import {
  ServiceType,
  PartialMessage,
  MethodInfoServerStreaming,
  MethodInfo,
  MethodInfoUnary,
  MethodKind,
  Message,
} from '@bufbuild/protobuf';
import { Observable, Subscriber } from 'rxjs';

/**
 * ObservableClient is a simple client that supports unary and server-streaming
 * methods. Methods construct an observable of response message, when subscribed,
 * fires the request and emits the response/error.
 */
export type ObservableClient<T extends ServiceType> = {
  [P in keyof T['methods']]: T['methods'][P] extends MethodInfoUnary<
    infer I,
    infer O
  >
    ? UnaryFn<I, O>
    : T['methods'][P] extends MethodInfoServerStreaming<infer I, infer O>
    ? ServerStreamingFn<I, O>
    : never;
};

/**
 * Create an ObservableClient for the given service, invoking RPCs through the
 * given transport.
 */
export function createObservableClient<T extends ServiceType>(
  service: T,
  transport: Transport
) {
  return makeAnyClient(service, (method) => {
    switch (method.kind) {
      case MethodKind.Unary:
        return createUnaryFn(transport, service, method);
      case MethodKind.ServerStreaming:
        return createServerStreamingFn(transport, service, method);
      default:
        return null;
    }
  }) as ObservableClient<T>;
}

type UnaryFn<I extends Message<I>, O extends Message<O>> = (
  request: PartialMessage<I>,
  options?: CallOptions
) => Observable<O>;

function createUnaryFn<I extends Message<I>, O extends Message<O>>(
  transport: Transport,
  service: ServiceType,
  method: MethodInfo<I, O>
): UnaryFn<I, O> {
  return function (requestMessage, options) {
    return new Observable<O>((subscriber) => {
      transport
        .unary(
          service,
          method,
          options?.signal,
          options?.timeoutMs,
          options?.headers,
          requestMessage
        )
        .then(
          (response) => {
            options?.onHeader?.(response.header);
            subscriber.next(response.message);
            options?.onTrailer?.(response.trailer);
          },
          (err) => {
            subscriber.error(err);
          }
        )
        .finally(() => {
          subscriber.complete();
        });
    });
  };
}

type ServerStreamingFn<I extends Message<I>, O extends Message<O>> = (
  request: PartialMessage<I>,
  options?: CallOptions
) => Observable<O>;

function createServerStreamingFn<I extends Message<I>, O extends Message<O>>(
  transport: Transport,
  service: ServiceType,
  method: MethodInfo<I, O>
): ServerStreamingFn<I, O> {
  return function (requestMessage, options) {
    return new Observable<O>((subscriber) => {
      transport
        .serverStream(
          service,
          method,
          options?.signal,
          options?.timeoutMs,
          options?.headers,
          requestMessage
        )
        .then(
          (streamResponse) => {
            options?.onHeader?.(streamResponse.header);
            readStreamResponse(streamResponse, subscriber, options);
          },
          (err) => {
            subscriber.error(err);
          }
        );
    });
  };
}

function readStreamResponse<T extends Message<T>>(
  streamResponse: StreamResponse<T>,
  subscriber: Subscriber<T>,
  options?: CallOptions
) {
  streamResponse.read().then(
    (result) => {
      if (result.done) {
        options?.onTrailer?.(streamResponse.trailer);
        subscriber.complete();
        return;
      }
      subscriber.next(result.value);
      readStreamResponse(streamResponse, subscriber, options);
    },
    (err) => {
      subscriber.error(err);
    }
  );
}
