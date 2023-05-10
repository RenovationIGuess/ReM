ifeq (,$(wildcard .env))
$(shell cp .env.example .env)
endif

include .env

devinstall:
	@test -f server/.env || cp server/.env.example server/.env
	@test -f client/.env || cp client/.env.example client/.env
	@cd ./client && yarn
	@cd ./server && composer install && php artisan key:generate && php artisan jwt:secret

devup:
	@./server/vendor/bin/sail up --build -d --remove-orphans
	@USER=$$(id -u):$$(id -g) docker compose up -d --remove-orphans

devrun:
	docker exec -it $(COMPOSE_PROJECT_NAME)-client-1 yarn dev

devmigrate:
	USER=$$(id -u):$$(id -g) docker exec -it $(COMPOSE_PROJECT_NAME)-server-1 php artisan migrate --seed

devfresh:
	USER=$$(id -u):$$(id -g) docker exec -it $(COMPOSE_PROJECT_NAME)-server-1 php artisan migrate:fresh --seed

devdown:
	@./server/vendor/bin/sail down --remove-orphans
	@docker compose down --remove-orphans

devclean: devdown
	@docker rmi $$(docker images -a -q)
	@docker volume rm $$(docker volume ls -q)
