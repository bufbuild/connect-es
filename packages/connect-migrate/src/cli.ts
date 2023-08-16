#!/usr/bin/env node

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

import { replacePackageJSONReferences } from "./replacement-map";
import fastGlob from "fast-glob";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import * as path from "node:path";
import { createRequire } from "node:module";
import * as url from "node:url";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { parseCommandLineArgs } from "./arguments";

const args = parseCommandLineArgs(process.argv.slice(2));

if (!args.ok) {
  process.stderr.write(`${args.errorMessage}\n`);
  process.exit(1);
}

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const require = createRequire(import.meta.url);
const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");

// We reference src here so jscodeshift can digest the transform
// as it is, since jscodeshift can't seem to handle compiled ts.
const transformerDirectory = path.join(__dirname, "../", "src", "transforms");
const transformerPath = path.join(transformerDirectory, `modify-imports.ts`);

function executeInContext(command: string, args: string[]) {
  const dir = process.cwd();

  spawnSync(command, args, {
    cwd: dir,
    shell: true,
    stdio: ["pipe", "inherit", "inherit"],
  });
}

async function main() {
  const dir = process.cwd();

  process.stdout.write("Updating package dependencies...\n");
  await updatePackageFiles();
  process.stdout.write("Updated package dependencies.\n");
  process.stdout.write("Updating references...\n");
  updateSourceFiles();
  process.stdout.write("Updated references.\n");
  process.stdout.write("Installing dependencies...\n");
  reinstallDependencies(dir);
  process.stdout.write("Dependencies installed.\n");

  process.exit(0);
}

void main();

function reinstallDependencies(dir: string) {
  // TODO: Perhaps we can find all the lock files and run install wherever we find them. This'll help for repos without a single
  // top level lock file.
  const packageManager = getPackageManager(dir);

  if (packageManager === undefined) {
    process.stderr.write(
      "Cannot reinstall dependencies if we can't find a lockfile. Make sure you have a lock file (yarn.lock, package-lock.json, or pnpm-lock.yaml) in your project."
    );
    process.exit(1);
  }

  if (packageManager === "npm") {
    executeInContext("npm", ["install"]);
  } else if (packageManager === "pnpm") {
    executeInContext("pnpm", ["install", "-r"]);
  } else {
    executeInContext("yarn", ["install"]);
  }
}

function updateSourceFiles() {
  const baseArgs = [
    "--ignore-pattern=**/node_modules/**",
    "--extensions=tsx,ts,jsx,js,cjs,mjs",
    // TSX covers everything we need to be concerned about. The one parser it won't
    // cover is something like flow but we can worry about flow later and add it as a param.
    "--parser=tsx",
    "--transform",
    transformerPath,
    ".",
  ];
  executeInContext(jscodeshiftExecutable, baseArgs);
}

async function updatePackageFiles() {
  // eslint-disable-next-line import/no-named-as-default-member -- fast-glob doesn't seem to support ESM imports
  const files = await fastGlob.async(["./**/package.json", "./package.json"], {
    ignore: ["**/node_modules/**"],
  });
  for (const file of files) {
    process.stdout.write(`Updating ${file}...\n`);
    const fileContents = await readFile(file, "utf-8");
    await writeFile(file, replacePackageJSONReferences(fileContents), "utf-8");
  }
}

function getPackageManager(dir: string) {
  let packageManager: "pnpm" | "npm" | "yarn" | undefined = undefined;
  if (existsSync(path.join(dir, "pnpm-lock.yaml"))) {
    packageManager = "pnpm";
  } else if (existsSync(path.join(dir, "package-lock.json"))) {
    packageManager = "npm";
  } else if (existsSync(path.join(dir, "yarn.lock"))) {
    packageManager = "yarn";
  }

  return packageManager;
}
