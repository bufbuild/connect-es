// Copyright 2021-2023 The Connect Authors
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

import { createContextKey, createContextValues } from "./context-values.js";

describe("ContextValues", function () {
  it("should get default values", function () {
    const contextValues = createContextValues();
    const kString = createContextKey("default");
    expect(contextValues.get(kString)).toBe(kString.defaultValue);
  });
  it("should set values", function () {
    const contextValues = createContextValues();
    const kString = createContextKey("default");
    contextValues.set(kString, "foo");
    expect(contextValues.get(kString)).toBe("foo");
  });
  it("should delete values", function () {
    const contextValues = createContextValues();
    const kString = createContextKey("default");
    contextValues.set(kString, "foo");
    contextValues.delete(kString);
    expect(contextValues.get(kString)).toBe(kString.defaultValue);
  });
  it("should work with undefined values", function () {
    const contextValues = createContextValues();
    const kUndefined = createContextKey<string | undefined>("default");
    expect(contextValues.get(kUndefined)).toBe(kUndefined.defaultValue);
    contextValues.set(kUndefined, undefined);
    expect(contextValues.get(kUndefined)).toBe(undefined);
  });
});
