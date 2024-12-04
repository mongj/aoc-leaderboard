# For development purposes only.
# Do not use this Makefile in the production environment.

BUILD_DIR=./bin
BINARY_PATH=${BUILD_DIR}/server
SERVER_PATH=./cmd/server/main.go
MIGRATION_TOOL_PATH=./cmd/database/main.go

.PHONY: run build clean lint

setupDB: migrateDB

migrateDB:
	@echo "Migrating database..."
	@GO_ENV=development go run ${MIGRATION_TOOL_PATH} migrateDB

rollbackDB:
	@echo "Rolling back database..."
	@GO_ENV=development go run ${MIGRATION_TOOL_PATH} rollbackDB

run:
	@echo "Running server in development mode..."
	@GO_ENV=development go run ${SERVER_PATH}

build:
	@echo "Building server at '${BINARY_PATH}'..."
	@go build -o ${BINARY_PATH} ${SERVER_PATH}

clean:
	@echo "Removing build files and cached files..."
	@rm -rf ${BUILD_DIR}
	@go clean -testcache

lint:
	@echo "Running formatting..."
	@go fmt ./... 
	@echo "Running linter..."
	@golangci-lint run --fix