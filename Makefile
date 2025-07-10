.PHONY: up down

up:
	docker compose up --build -d

down:
	docker compose down

check:
	docker compose up backend --build -d
	sleep 2
	./Backend/tests/test.sh; $(MAKE) down
