CACHE_DIR = .cache
CACHE_BIN := $(CACHE_DIR)/bin
SHELL := /usr/bin/env bash -o pipefail
export PATH := $(abspath $(CACHE_BIN)):$(PATH)
.DEFAULT_GOAL = default

# TODO remove after the repository has been made public
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
	npm ci --force


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


# The license header information in this project
LICENSE_HEADER_VERSION := v1.1.0
LICENSE_HEADER_LICENSE_TYPE := apache
LICENSE_HEADER_COPYRIGHT_HOLDER := Buf Technologies, Inc.
LICENSE_HEADER_YEAR_RANGE := 2021-2022
LICENSE_HEADER_IGNORES := .cache\/ node_module\/ packages\/protobuf-test\/bin\/conformance_esm.js packages\/protobuf-test\/src\/gen\/ packages\/protobuf\/src\/google\/ packages\/bench-codesize\/src\/gen\/ packages\/connect-web\/dist\/ packages\/protobuf\/dist\/ packages\/protobuf-test\/dist\/
GIT_LS_FILES_UNSTAGED_VERSION ?= v1.1.0


# Commands

.PHONY: default clean test-go test-jest test-conformance fuzz-go set-version go-build-npm
default: test go-build-npm bench-codesize format lint

clean:
	cd $(BENCHCODESIZE_DIR); npm run clean
	cd $(WEB_DIR); npm run clean
	rm -rf $(CACHE_DIR)/*
	rm -rf node_modules
	rm -rf packages/protoc-gen-*/bin/*

test: test-go

test-go: $(TEST_GEN)
	go test ./internal/...

lint:
	@$(MAKE) checknodiffgenerated
	@$(MAKE) lint-es

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

install-license-header:
	GOBIN=$(abspath $(CACHE_BIN)) go install github.com/bufbuild/buf/private/pkg/licenseheader/cmd/license-header@$(LICENSE_HEADER_VERSION)

install-git-ls-files-unstaged:
	GOBIN=$(abspath $(CACHE_BIN)) go install github.com/bufbuild/buf/private/pkg/git/cmd/git-ls-files-unstaged@$(GIT_LS_FILES_UNSTAGED_VERSION)

license-header: install-license-header install-git-ls-files-unstaged
	git-ls-files-unstaged | \
		grep -v $(patsubst %,-e %,$(sort $(LICENSE_HEADER_IGNORES))) | \
		xargs license-header \
			--license-type "$(LICENSE_HEADER_LICENSE_TYPE)" \
			--copyright-holder "$(LICENSE_HEADER_COPYRIGHT_HOLDER)" \
			--year-range "$(LICENSE_HEADER_YEAR_RANGE)"

assert-no-uncommitted:
	[ -z "$(shell git status --short)" ] || echo "Uncommitted changes found." && exit 1;

generate:
	@$(MAKE) license-header

checknodiffgenerated:
	@ if [ -d .git ]; then \
			$(MAKE) __checknodiffgeneratedinternal; \
		else \
			echo "skipping make checknodiffgenerated due to no .git repository" >&2; \
		fi

__checknodiffgeneratedinternal:
	bash make/scripts/checknodiffgenerated.bash $(MAKE) generate


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
		--workspace packages/protoc-gen-connect-web \
		--workspace packages/protoc-gen-connect-web-darwin-64 \
		--workspace packages/protoc-gen-connect-web-darwin-arm64 \
		--workspace packages/protoc-gen-connect-web-freebsd-64 \
		--workspace packages/protoc-gen-connect-web-freebsd-arm64 \
		--workspace packages/protoc-gen-connect-web-linux-32 \
		--workspace packages/protoc-gen-connect-web-linux-64 \
		--workspace packages/protoc-gen-connect-web-linux-arm \
		--workspace packages/protoc-gen-connect-web-linux-arm64 \
		--workspace packages/protoc-gen-connect-web-netbsd-64 \
		--workspace packages/protoc-gen-connect-web-openbsd-64 \
		--workspace packages/protoc-gen-connect-web-windows-32 \
		--workspace packages/protoc-gen-connect-web-windows-64 \
		--workspace packages/protoc-gen-connect-web-windows-arm64
