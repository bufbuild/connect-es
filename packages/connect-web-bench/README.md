# Code size comparison

This is a simple code size comparison between Connect-Web and gRPC-web.

We are generating code for the module [buf.build/bufbuild/eliza](https://buf.build/bufbuild/eliza)
once with `protoc-gen-grpc-web`, once with `protoc-gen-connect-web`. 
Then we bundle a client for the service `buf.connect.demo.eliza.v1.ElizaService` 
with [esbuild](https://esbuild.github.io/), minify the bundle, and compress 
it like a web server would usually do.

| code generator | bundle size        | minified               | compressed           |
|----------------|-------------------:|-----------------------:|---------------------:|
| connect-web    | 87,178 b | 40,747 b | 11,250 b |
| grpc-web       | 395,565 b    | 284,504 b    | 51,932 b |
