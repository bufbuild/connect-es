# See https://tech.davis-hansson.com/p/make/
SHELL := bash
.DELETE_ON_ERROR:
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
MAKEFLAGS += --no-print-directory
TMP   = .tmp
BIN   = .tmp/bin
BUILD = .tmp/build
GEN   = .tmp/gen
CROSSTEST_VERSION := e982fb10e5f9c3e74061b50716317003e3e736b3
LICENSE_HEADER_YEAR_RANGE := 2021-2022
LICENSE_HEADER_IGNORES := .tmp\/ node_module\/ packages\/connect-web-bench\/src\/gen\/ packages\/connect-web\/dist\/ scripts\/ packages\/connect-web-test\/src\/gen
NODE18_VERSION ?= v18.2.0
NODE18_OS = $(subst Linux,linux,$(subst Darwin,darwin,$(shell uname -s)))
NODE18_ARCH = $(subst x86_64,x64,$(subst aarch64,arm64,$(shell uname -m)))

node_modules: package-lock.json
	npm ci --force

node_modules/.bin/protoc-gen-es: node_modules

$(BIN)/license-header: Makefile
	@mkdir -p $(@D)
	GOBIN=$(abspath $(BIN)) go install github.com/bufbuild/buf/private/pkg/licenseheader/cmd/license-header@v1.1.0

$(BIN)/git-ls-files-unstaged: Makefile
	@mkdir -p $(@D)
	GOBIN=$(abspath $(BIN)) go install github.com/bufbuild/buf/private/pkg/git/cmd/git-ls-files-unstaged@v1.1.0

$(BIN)/golangci-lint: Makefile
	@mkdir -p $(@D)
	GOBIN=$(abspath $(BIN)) go install github.com/golangci/golangci-lint/cmd/golangci-lint@v1.44.0

$(BIN)/node18: Makefile
	@mkdir -p $(@D)
	curl -sSL https://nodejs.org/dist/$(NODE18_VERSION)/node-$(NODE18_VERSION)-$(NODE18_OS)-$(NODE18_ARCH).tar.xz | tar xJ -C $(TMP) node-$(NODE18_VERSION)-$(NODE18_OS)-$(NODE18_ARCH)/bin/node
	mv $(TMP)/node-$(NODE18_VERSION)-$(NODE18_OS)-$(NODE18_ARCH)/bin/node $(@)
	rm -r $(TMP)/node-$(NODE18_VERSION)-$(NODE18_OS)-$(NODE18_ARCH)
	@touch $(@)

$(BIN)/protoc-gen-connect-web: go.mod cmd/protoc-gen-connect-web/main.go
	go build -o $(@) ./cmd/protoc-gen-connect-web

$(BUILD)/connect-web: node_modules tsconfig.base.json packages/connect-web/tsconfig.json $(shell find packages/connect-web/src -name '*.ts')
	npm run -w packages/connect-web clean
	npm run -w packages/connect-web build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-web-test: $(BUILD)/connect-web $(GEN)/connect-web-test $(shell find packages/connect-web-test/src -name '*.ts') tsconfig.base.json packages/connect-web-test/tsconfig.json
	cd packages/connect-web-test && npm run clean && npm run build
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/connect-web-test: node_modules/.bin/protoc-gen-es $(BIN)/protoc-gen-connect-web
	rm -rf packages/connect-web-test/src/gen/*
	PATH="$(abspath node_modules/.bin):$(abspath $(BIN)):$(PATH)" \
		buf generate https://github.com/bufbuild/connect-crosstest.git#ref=$(CROSSTEST_VERSION),subdir=internal/proto \
		--template packages/connect-web-test/buf.gen.yaml --output packages/connect-web-test
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/connect-web-bench: node_modules/.bin/protoc-gen-es $(BIN)/protoc-gen-connect-web
	rm -rf packages/connect-web-bench/src/gen/*
	PATH="$(abspath node_modules/.bin):$(abspath $(BIN)):$(PATH)" \
		buf generate buf.build/bufbuild/eliza:847d7675503fd7aef7137c62376fdbabcf777568 \
		--template packages/connect-web-bench/buf.gen.yaml --output packages/connect-web-bench
	@mkdir -p $(@D)
	@touch $(@)


.PHONY: help
help: ## Describe useful make targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%-30s %s\n", $$1, $$2}'

.PHONY: all
all: build test format lint bench ## build, test, format, lint, and bench (default)

.PHONY: clean
clean: crosstestserverstop ## Delete build artifacts and installed dependencies
	@# -X only removes untracked files, -d recurses into directories, -f actually removes files/dirs
	git clean -Xdf

.PHONY: build
build: $(BUILD)/connect-web $(BIN)/protoc-gen-connect-web ## Build

.PHONY: test
test: testgo testnode testbrowser ## Run all tests

.PHONY: testgo
testgo:
	go test ./cmd/...

.PHONY: testnode
testnode: $(BIN)/node18 $(BUILD)/connect-web-test
	$(MAKE) crosstestserverrun
	cd packages/connect-web-test && PATH="$(abspath $(BIN)):$(PATH)" NODE_TLS_REJECT_UNAUTHORIZED=0 node18 ../../node_modules/.bin/jasmine --config=jasmine.json
	$(MAKE) crosstestserverstop

.PHONY: testbrowser
testbrowser: $(BUILD)/connect-web-test
	$(MAKE) crosstestserverrun
	npm run -w packages/connect-web-test karma
	$(MAKE) crosstestserverstop

.PHONY: testlocalbrowser
testlocalbrowser: $(BUILD)/connect-web-test
	$(MAKE) crosstestserverrun
	npm run -w packages/connect-web-test karma-serve
	$(MAKE) crosstestserverstop

.PHONY: lint
lint: $(BIN)/golangci-lint node_modules $(BUILD)/connect-web $(GEN)/connect-web-bench ## Lint all files
	$(BIN)/golangci-lint run
	npx eslint --max-warnings 0 .

.PHONY: format
format: node_modules $(BIN)/git-ls-files-unstaged $(BIN)/license-header ## Format all files, adding license headers
	go fmt ./cmd/...
	npx prettier --write '**/*.{json,js,jsx,ts,tsx,css}' --loglevel error
	$(BIN)/git-ls-files-unstaged | \
		grep -v $(patsubst %,-e %,$(sort $(LICENSE_HEADER_IGNORES))) | \
		xargs $(BIN)/license-header \
			--license-type "apache" \
			--copyright-holder "Buf Technologies, Inc." \
			--year-range "$(LICENSE_HEADER_YEAR_RANGE)"

.PHONY: bench
bench: node_modules $(GEN)/connect-web-bench $(BUILD)/connect-web ## Benchmark code size
	npm run -w packages/connect-web-bench report

.PHONY: setversion
setversion: ## Set a new version in for the project, i.e. make setversion SET_VERSION=1.2.3
	node scripts/update-go-version-file.js cmd/protoc-gen-connect-web/main.go $(SET_VERSION)
	node scripts/set-workspace-version.js $(SET_VERSION)
	node scripts/go-build-npm.js packages/protoc-gen-connect-web ./cmd/protoc-gen-connect-web
	rm package-lock.json
	rm -rf node_modules
	npm i -f
	$(MAKE) all

# Release @bufbuild/connect-web.
# Recommended procedure:
# 1. Set a new version with the target `setversion`
# 2. Commit and push all changes
# 3. Login with `npm login`
# 4. Run this target, publishing to npmjs.com
# 5. Tag the release
.PHONY: release
release: all ## Release @bufbuild/connect-web
	@[ -z "$(shell git status --short)" ] || (echo "Uncommitted changes found." && exit 1);
	node scripts/go-build-npm.js packages/protoc-gen-connect-web ./cmd/protoc-gen-connect-web
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

.PHONY: crosstestserverstop
crosstestserverstop:
	-docker container stop serverconnect servergrpc

.PHONY: crosstestserverrun
crosstestserverrun: crosstestserverstop
	docker run --rm --name serverconnect -p 8080:8080 -p 8081:8081 -d \
		bufbuild/connect-crosstest:$(CROSSTEST_VERSION) \
		/usr/local/bin/serverconnect --h1port "8080" --h2port "8081" --cert "cert/localhost.crt" --key "cert/localhost.key"
	docker run --rm --name servergrpc -p 8083:8083 -d \
		bufbuild/connect-crosstest:$(CROSSTEST_VERSION) \
		/usr/local/bin/servergrpc --port "8083" --cert "cert/localhost.crt" --key "cert/localhost.key"

.PHONY: checkdiff
checkdiff:
	@# Used in CI to verify that `make` doesn't produce a diff, but ignore changes in benchmarks
	git checkout packages/connect-web-bench/README.md
	test -z "$$(git status --porcelain | tee /dev/stderr)"

