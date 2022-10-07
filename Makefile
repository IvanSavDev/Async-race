start-frontend:
	npm -C frontend start
start-backend:
	npm -C backend start
install:
	npm install & npm -C frontend install
start:
	make start-backend & make start-frontend