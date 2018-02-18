install-deps:
	npm install

install: install-deps install-flow-typed

build-dev:
	rm -rf dist
	npm run webpack -- -p --env dev
	npm run build-server

build-prod:
	rm -rf dist
	npm run webpack -- -p --env prod
	npm run build-server

start-dev:
	npm run nodemon -- --exec npm start

start-prod:
	npm start

dev:
	make start-dev

prod:
	make build-prod
	make start-prod

test:
	npm test

check-types:
	npm run flow

lint:
	npm run eslint

publish:
	npm publish

deploy:
	git push heroku master
	heroku ps:scale web=1 --app lozovsky-slack
	heroku open --app lozovsky-slack

.PHONY: test
