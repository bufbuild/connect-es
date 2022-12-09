# Code size comparison

This is a simple code size comparison between Connect-Web and gRPC-web.

We are generating code for the module [buf.build/bufbuild/eliza](https://buf.build/bufbuild/eliza)
once with `protoc-gen-grpc-web`, once with `protoc-gen-connect-web`. 
Then we bundle a client for the service `buf.connect.demo.eliza.v1.ElizaService` 
with [esbuild](https://esbuild.github.io/), minify the bundle, and compress 
it like a web server would usually do.

| code generator | bundle size        | minified               | compressed           |
|----------------|-------------------:|-----------------------:|---------------------:|
| connect-web    | 93,342 b | 43,118 b | 11,896 b |
| connect-web (legacy) | 88,075 b | 41,044 b | 11,381 b |
| grpc-web       | 413,539 b    | 301,008 b    | 53,234 b |
