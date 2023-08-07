import { buildSync } from "esbuild";
import { compress } from "brotli";

const connect = gather("src/entry-connect.ts");
const grpcweb = gather("src/entry-grpcweb.ts");

process.stdout.write(`# Code size comparison

This is a simple code size comparison between Connect-Web and gRPC-web.

We are generating code for the module [buf.build/connectrpc/eliza](https://buf.build/connectrpc/eliza)
once with \`protoc-gen-grpc-web\`, once with \`protoc-gen-connect-es\`.
Then we bundle a client for the service \`connectrpc.eliza.v1.ElizaService\`
with [esbuild](https://esbuild.github.io/), minify the bundle, and compress
it like a web server would usually do.

| code generator | bundle size        | minified               | compressed           |
|----------------|-------------------:|-----------------------:|---------------------:|
| connect        | ${connect.size} | ${connect.minified} | ${connect.compressed} |
| grpc-web       | ${grpcweb.size}    | ${grpcweb.minified}    | ${grpcweb.compressed} |
`);

function gather(entryPoint) {
  const bundle = build(entryPoint, false, "esm");
  const bundleMinified = build(entryPoint, true, "esm");
  const compressed = compress(bundleMinified);
  return {
    entryPoint,
    size: formatSize(bundle.byteLength),
    minified: formatSize(bundleMinified.byteLength),
    compressed: formatSize(compressed.byteLength),
  };
}

function build(entryPoint, minify, format) {
  const result = buildSync({
    entryPoints: [entryPoint],
    bundle: true,
    format: format,
    treeShaking: true,
    minify: minify,
    write: false,
  });
  if (result.outputFiles.length !== 1) {
    throw new Error();
  }
  return result.outputFiles[0].contents;
}

function formatSize(bytes) {
  return new Intl.NumberFormat().format(bytes) + " b";
}
