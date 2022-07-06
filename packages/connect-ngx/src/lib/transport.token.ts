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

import { InjectionToken } from '@angular/core';
import type { Transport } from '@bufbuild/connect-web';

/**
 * Injection token for `Transport`.
 *
 * This is provided in both ConnectModule.forRoot() and GrpcWebModule.forRoot().
 */
export const TRANSPORT = new InjectionToken<Transport>('connect.transport');
