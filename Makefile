.PHONY: up down check debug

up:
	docker compose up --build -d

down:
	docker compose down

check:
	docker compose up backend --build -d
	sleep 2
	./Backend/tests/test.sh; $(MAKE) down

debug:
	docker compose up backend --build -d
	cd frontend && ng serve
