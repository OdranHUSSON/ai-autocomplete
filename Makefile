.PHONY: start build stop migrate-dev

start:
	docker-compose up -d
	make migrate-dev
	make prisma-generate

prod:
	docker-compose up -d

build:
	docker-compose up -d --build

stop:
	docker-compose down

migrate-dev:
	docker-compose exec ai-toolkit-app npm run migrate:dev --name

db-push:
	docker-compose exec ai-toolkit-app npm run db:push

migrate-reset:
	docker-compose exec ai-toolkit-app npm run migrate:reset

db-seed:
	docker-compose exec ai-toolkit-app npm run db:seed

prisma-generate:
	docker-compose exec ai-toolkit-app npm run prisma:generate

prisma-studio:
	docker-compose exec ai-toolkit-app npm run prisma:studio

production-build:
	docker-compose exec ai-toolkit-app npm run generate && npm run migrate deploy && next build

