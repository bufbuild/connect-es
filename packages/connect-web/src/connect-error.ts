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

import { Code, codeFromString, codeToString } from "./code.js";
import {
  Any,
  AnyMessage,
  IMessageTypeRegistry,
  JsonValue,
  MessageType,
  TypeRegistry,
} from "@bufbuild/protobuf";
import { newParseError } from "./private/new-parse-error.js";

// TODO "procedure" - service / method name would be convenient to have her
// TODO nest errors á la https://github.com/Veetaha/ts-nested-error/blob/master/src/nested-error.ts ?

/**
 * ConnectError captures three pieces of information: a Code, an error
 * message, and an optional collection of arbitrary Protobuf messages called
 * "details".
 *
 * Because developer tools typically show just the error message, we prefix
 * it with the status code.
 *
 * Error details are wrapped with google.protobuf.Any on the wire, so that
 * a server or middleware can attach arbitrary data to an error. We
 * automatically unwrap the details for you.
 */
export class ConnectError extends Error {
  /**
   * The Code for this error.
   */
  readonly code: Code;

  /**
   * Optional collection of arbitrary Protobuf messages.
   */
  readonly details: AnyMessage[];

  /**
   * A union of response headers and trailers associated with this error.
   */
  readonly metadata: Headers;

  /**
   * When an error is parsed from the wire, details are unwrapped
   * automatically from google.protobuf.Any, but we can only do so if you
   * provide the message types in a type registry. If a message type is not
   * given in a type registry, the unwrapped details are available here.
   */
  readonly rawDetails: RawDetail[];

  /**
   * The error message, but without a status code in front.
   *
   * For example, a new `ConnectError("hello", Code.NotFound)` will have
   * the message `[not found] hello`, and the rawMessage `hello`.
   */
  readonly rawMessage: string;

  override name = "ConnectError";

  constructor(
    message: string,
    code: Code = Code.Unknown,
    details?: AnyMessage[],
    metadata?: HeadersInit
  ) {
    super(syntheticMessage(code, message));
    // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
    Object.setPrototypeOf(this, new.target.prototype);
    this.rawMessage = message;
    this.code = code;
    this.details = details ?? [];
    this.metadata = new Headers(metadata);
    this.rawDetails = [];
  }

  /**
   * Serialize the error to its JSON representation. Error details are wrapped
   * in google.protobuf.Any, so that they are self-describing.
   */
  toJson(): JsonValue {
    const value: { code: string; message: string; details?: JsonValue[] } = {
      code: codeToString(this.code),
      message: this.rawMessage,
    };
    if (this.details.length > 0) {
      const typeRegistry = TypeRegistry.fromIterable(
        this.details.reduce(
          (prev, cur) => addTypesToSet(cur.getType(), prev),
          new Set<MessageType>()
        )
      );
      value.details = this.details.map((detail) => {
        const any = new Any();
        any.packFrom(detail);
        return any.toJson({ typeRegistry });
      });
    }
    return value;
  }

  /**
   * Serialize an error to a JSON string.
   */
  toJsonString(options?: { prettySpaces?: number }): string {
    return JSON.stringify(this.toJson(), null, options?.prettySpaces ?? 0);
  }

  /**
   * Parse an error from a JSON string.
   * Will return a ConnectError, but throw one in case the JSON is malformed.
   */
  static fromJsonString(
    jsonString: string,
    options?: { typeRegistry?: IMessageTypeRegistry; metadata?: HeadersInit }
  ): ConnectError {
    let json: JsonValue;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      json = JSON.parse(jsonString);
    } catch (e) {
      throw newParseError(e, "", false);
    }
    return this.fromJson(json, options);
  }

  /**
   * Parse an error from a JSON value.
   * Will return a ConnectError, but throw one in case the JSON is malformed.
   */
  static fromJson(
    jsonValue: JsonValue,
    options?: { typeRegistry?: IMessageTypeRegistry; metadata?: HeadersInit }
  ): ConnectError {
    if (
      typeof jsonValue !== "object" ||
      jsonValue == null ||
      Array.isArray(jsonValue) ||
      !("code" in jsonValue) ||
      typeof jsonValue.code !== "string"
    ) {
      throw newParseError(jsonValue);
    }
    const code = codeFromString(jsonValue.code);
    if (!code) {
      throw newParseError(jsonValue.code, ".code");
    }
    const message = jsonValue.message;
    if (message != null && typeof message !== "string") {
      throw newParseError(jsonValue.code, ".message");
    }
    const error = new ConnectError(
      message ?? "",
      code,
      undefined,
      options?.metadata
    );
    if ("details" in jsonValue && Array.isArray(jsonValue.details)) {
      for (const raw of jsonValue.details) {
        let any: Any;
        try {
          any = Any.fromJson(raw, options);
        } catch (e) {
          // We consider error details to be supplementary information.
          // Parsing error details must not hide elementary information
          // like code and message, so we deliberately ignore parsing
          // errors here.
          error.rawDetails.push(raw as RawDetail);
          continue;
        }
        const typeName = any.typeUrl.substring(
          any.typeUrl.lastIndexOf("/") + 1
        );
        if (!options?.typeRegistry) {
          error.rawDetails.push(raw as RawDetail);
          continue;
        }
        const messageType = options.typeRegistry.findMessage(typeName);
        if (messageType) {
          const message = new messageType();
          if (any.unpackTo(message)) {
            error.details.push(message);
          }
        }
      }
    }
    return error;
  }
}

/**
 * A raw detail is a google.protobuf.Any, or it's JSON representation.
 * This type is used for error details that we could not unwrap because
 * we are missing type information.
 */
type RawDetail =
  | Any
  | {
      "@type": string;
      [key: string]: JsonValue;
    };

function syntheticMessage(code: Code, message: string) {
  return message.length
    ? `[${codeToString(code)}] ${message}`
    : `[${codeToString(code)}]`;
}

function addTypesToSet(
  type: MessageType,
  set: Set<MessageType>
): Set<MessageType> {
  if (set.has(type)) {
    return set;
  }
  set.add(type);
  for (const field of type.fields.list()) {
    if (field.kind == "message") {
      addTypesToSet(field.T, set);
    } else if (field.kind == "map" && field.V.kind == "message") {
      addTypesToSet(field.V.T, set);
    }
  }
  return set;
}
