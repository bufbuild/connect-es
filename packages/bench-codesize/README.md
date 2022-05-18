# Code size comparison

This is a simple code size comparison between Connect-Web and gRPC-web.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with `protoc-gen-grpc-web`, once with `protoc-gen-connect-web`. Then we bundle Then we bundle [a client](./src) 
for the service `buf.alpha.registry.v1alpha1.PluginService` with [esbuild](https://esbuild.github.io/),
minify the bundle, and compress it like a web server would usually do.

| code generator | bundle size        | minified               | compressed           |
|----------------|-------------------:|-----------------------:|---------------------:|
| connect-web    | 233,338 b | 120,295 b | 18,389 b |
| grpc-web       | 1,019,192 b    | 724,885 b    | 74,094 b |
