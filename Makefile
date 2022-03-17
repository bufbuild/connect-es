CACHE_DIR = .cache
SHELL := /usr/bin/env bash -o pipefail
.DEFAULT_GOAL = default
export GOPRIVATE := github.com/bufbuild/protobuf-es


# The code generator protoc-gen-es generates message and enum types.
# It is installed via the NPM package @bufbuild/protoc-gen-es.
PROTOC_GEN_ES_BIN := node_modules/.bin/protoc-gen-es
$(PROTOC_GEN_ES_BIN): node_modules


# Our code generator protoc-gen-connect-web generates service types
PROTOC_GEN_CONNECT_WEB_BIN := $(CACHE_DIR)/protoc-gen-connect-web
PROTOC_GEN_CONNECT_WEB_SOURCES = go.mod $(shell find . -name '*.go')
$(PROTOC_GEN_CONNECT_WEB_BIN): $(PROTOC_GEN_CONNECT_WEB_SOURCES)
	go build -o $(PROTOC_GEN_CONNECT_WEB_BIN) ./cmd/protoc-gen-connect-web


# Install NPM dependencies
# (We need --force so NPM doesn't bail on the platform-specific
# packages in the workspace)
# (We need --ignore-scripts so that the postinstall scripts of
# the NPM distribution packages do not run before they are built)
node_modules: package-lock.json
	npm ci --force --ignore-scripts


# The NPM package "@bufbuild/connect-web"
WEB_DIR = packages/connect-web
WEB_BUILD = $(CACHE_DIR)/build/packages-connect-web
WEB_SOURCES = $(WEB_DIR)/*.json $(shell find $(WEB_DIR)/src -name '*.ts')
$(WEB_BUILD): node_modules $(WEB_SOURCES)
	cd $(WEB_DIR) && npm run clean && npm run build
	mkdir -p $(CACHE_DIR)/build && touch $(WEB_BUILD)


# The private NPM package "@bufbuild/bench-codesize" benchmarks code size
BENCHCODESIZE_DIR = packages/bench-codesize
BENCHCODESIZE_BUF_COMMIT=4505cba5e5a94a42af02ebc7ac3a0a04
BENCHCODESIZE_GEN = $(CACHE_DIR)/gen/bench-codesize-$(BENCHCODESIZE_BUF_COMMIT)
BUF_GENERATE_TEMPLATE = '\
{\
	"version": "v1",\
	"plugins": [\
		{\
			"name":"es", \
			"path": "$(PROTOC_GEN_ES_BIN)",\
			"out": "$(BENCHCODESIZE_DIR)/src/gen/connectweb",\
			"opt": "ts_nocheck=false"\
		},{\
			"name":"connect-web", \
			"path": "$(PROTOC_GEN_CONNECT_WEB_BIN)",\
			"out": "$(BENCHCODESIZE_DIR)/src/gen/connectweb",\
			"opt": "ts_nocheck=false"\
		},{\
			"remote":"buf.build/protocolbuffers/plugins/js:v3.19.3-1", \
			"out": "$(BENCHCODESIZE_DIR)/src/gen/grpcweb", \
			"opt": "import_style=commonjs"\
		},{\
			"remote":"buf.build/grpc/plugins/web:v1.3.1-2", \
			"out": "$(BENCHCODESIZE_DIR)/src/gen/grpcweb", \
			"opt": "import_style=commonjs+dts,mode=grpcweb"\
		}\
	]\
}'
$(BENCHCODESIZE_GEN): $(PROTOC_GEN_ES_BIN) $(PROTOC_GEN_CONNECT_WEB_BIN)
	rm -rf $(BENCHCODESIZE_DIR)/src/gen/*
	buf generate buf.build/bufbuild/buf:$(BENCHCODESIZE_BUF_COMMIT) --template $(BUF_GENERATE_TEMPLATE)
	mkdir -p $(dir $(BENCHCODESIZE_GEN)) && touch $(BENCHCODESIZE_GEN)


# Commands

.PHONY: default clean test-go test-jest test-conformance fuzz-go set-version go-build-npm
default: test go-build-npm bench-codesize format lint

clean:
	cd $(RUNTIME_DIR); npm run clean
	cd $(TEST_DIR); npm run clean
	cd $(BENCHCODESIZE_DIR); npm run clean
	cd $(WEB_DIR); npm run clean
	rm -rf $(CACHE_DIR)/*
	rm -rf node_modules
	rm -rf packages/protoc-gen-*/bin/*

test: test-go

test-go: $(TEST_GEN)
	go test ./internal/...

lint: lint-es

lint-es: node_modules $(WEB_BUILD)
	npx eslint --max-warnings 0 .

format: node_modules
	go fmt ./internal/... ./cmd/...
	npx prettier --write '**/*.{json,js,jsx,ts,tsx,css}' --loglevel error

bench-codesize: $(BENCHCODESIZE_GEN) node_modules $(RUNTIME_BUILD) $(WEB_BUILD)
	cd $(BENCHCODESIZE_DIR) && npm run report

go-build-npm:
	node make/scripts/go-build-npm.js packages/protoc-gen-connect-web ./cmd/protoc-gen-connect-web

set-version:
	node make/scripts/update-go-version-file.js cmd/protoc-gen-es/version.go $(SET_VERSION)
	node make/scripts/update-go-version-file.js cmd/protoc-gen-connect-web/version.go $(SET_VERSION)
	node make/scripts/set-workspace-version.js $(SET_VERSION)


assert-no-uncommitted:
	[ -z "$(shell git status --short)" ] || echo "Uncommitted changes found." && exit 1;


# Release @bufbuild/connect-web.
# Recommended procedure:
# 1. Set a new version with the target `set-version`
# 2. Commit and push all changes
# 3. Login with `npm login`
# 4. Run this target, publishing to npmjs.com
# 5. Tag the release
release-bufbuild-connect-web: assert-no-uncommitted clean test go-build-npm bench-codesize format lint go-build-npm assert-no-uncommitted
	npm publish \
		--access restricted \
		--workspace packages/connect-web \
		--workspace packages/protoc-gen-es \
		--workspace packages/protoc-gen-es-darwin-64 \
		--workspace packages/protoc-gen-es-darwin-arm64 \
		--workspace packages/protoc-gen-es-freebsd-64 \
		--workspace packages/protoc-gen-es-freebsd-arm64 \
		--workspace packages/protoc-gen-es-linux-32 \
		--workspace packages/protoc-gen-es-linux-64 \
		--workspace packages/protoc-gen-es-linux-arm \
		--workspace packages/protoc-gen-es-linux-arm64 \
		--workspace packages/protoc-gen-es-netbsd-64 \
		--workspace packages/protoc-gen-es-openbsd-64 \
		--workspace packages/protoc-gen-es-windows-32 \
		--workspace packages/protoc-gen-es-windows-64 \
		--workspace packages/protoc-gen-es-windows-arm64

