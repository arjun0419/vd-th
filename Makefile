image:
	docker build . -t rate-limiter

run:
	docker run -p 3000:3000 rate-limiter

dev: 
	nodemon server.js

test:
	node server.test.js
