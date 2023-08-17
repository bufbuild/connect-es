const { readdirSync, existsSync } = require("fs");
const { join } = require("path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: [
    "packages/connect-web-bench/src/gen/grpcweb/**/*",
    "packages/connect/src/protocol-grpc/gen/**/*",
    "packages/connect-node-test/connect-node-h1-server.mjs", // https://github.com/eslint/eslint/issues/14156
    "packages/example/www/webclient.js",
    "packages/*/dist/**",
    "node_modules/**",
  ],
  plugins: ["@typescript-eslint", "node", "import"],
  // Rules and settings that do not require a non-default parser
  extends: ["eslint:recommended"],
  rules: {
    "no-console": "error",
  },
  settings: {},
  overrides: [
    ...readdirSync("packages", { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => join("packages", entry.name))
      .filter((dir) => existsSync(join(dir, "tsconfig.json")))
      .map((dir) => {
        return {
          files: [join(dir, "src/**/*.ts")],
          parser: "@typescript-eslint/parser",
          parserOptions: {
            project: "./tsconfig.json",
            tsconfigRootDir: dir,
          },
          settings: {
            "import/resolver": {
              "typescript": {
                "project": "packages/*/tsconfig.json",
              }
            }
          },
          extends: [
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
            "plugin:import/recommended",
            "plugin:import/typescript",
          ],
          rules: {
            "@typescript-eslint/strict-boolean-expressions": "error",
            "@typescript-eslint/no-unnecessary-condition": "error",
            "@typescript-eslint/array-type": "off", // we use complex typings, where Array is actually more readable than T[]
            "@typescript-eslint/switch-exhaustiveness-check": "error",
            "@typescript-eslint/prefer-nullish-coalescing": "error",
            "@typescript-eslint/no-unnecessary-boolean-literal-compare":
              "error",
            "@typescript-eslint/no-invalid-void-type": "error",
            "@typescript-eslint/no-base-to-string": "error",
            "import/no-cycle": "error",
            "import/no-duplicates": "error",
            "import/consistent-type-specifier-style": ["error", "prefer-top-level"], // TS 4.5 adds type modifiers on import names, but we want to support lower versions
          },
        };
      }),
    // For scripts and configurations, use Node.js rules
    {
      files: ["**/*.{js,mjs,cjs}"],
      parserOptions: {
        ecmaVersion: 2020,
      },
      extends: ["eslint:recommended", "plugin:node/recommended"],
      rules: {
        "node/shebang": "off", // this plugin only determines shebang necessary for files that are in a package.json "bin" field
        "node/exports-style": ["error", "module.exports"],
        "node/file-extension-in-import": ["error", "always"],
        "node/prefer-global/buffer": ["error", "always"],
        "node/prefer-global/console": ["error", "always"],
        "node/prefer-global/process": ["error", "always"],
        "node/prefer-global/url-search-params": ["error", "always"],
        "node/prefer-global/url": ["error", "always"],
        "node/prefer-promises/dns": "error",
        "node/prefer-promises/fs": "error",
        "no-process-exit": "off",
        "node/no-unsupported-features/es-builtins": [
          "error",
          {
            version: ">=16.0.0",
            ignores: [],
          },
        ],
        "node/no-unsupported-features/node-builtins": [
          "error",
          {
            version: ">=16.0.0",
            ignores: [],
          },
        ],
      },
    },
    {
      // Our ESLint setup assumes all `.js` files are ESM, however these particular assets are CommonJS.
      // Since for these files we cannot use `.cjs`, instead we override here to avoid having to override in each file
      files: ["packages/connect/*.js"],
      globals: {
        module: "readonly",
        require: "readonly",
      },
    },
  ],
};
