lint:
	npx eslint -c .eslintrc.yml .

lint-fix:
	npx eslint -c .eslintrc.yml . --fix

install:
	npm install

test:
	npm test