.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## install dependencies
	npm install;
	
start-supabase: ## start supabase locally
	npx supabase start

start-zero: ## start the Zero cache
	npm run dev:zero-cache

start-app: ## start the app locally
	npm run dev:ui

start: start-supabase start-zero start-app ## start the stack locally

stop-supabase: ## stop local supabase
	npx supabase stop

stop: stop-supabase ## stop the stack locally

build: ## build the app
	npm run build

lint: ## lint the code
	npm run lint

clean: ## clean the zero cache
	npm run dev:clean

supabase-status: ## get local supabase status, keys and secrets
	npx supabase status
