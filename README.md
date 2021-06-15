# vd-th

<!-- SERVER EXPOSES A SINGLE RATE LIMITED ENDPOINT -->

A Dockerized REST API that exposes a single rate-limited endpoint /limit. No single user should be able to hit the endpoint more than 10 requests per second. You can identify a user by their API key in the X-API-KEY in the request header. If there is no API key, then you should immediately reject the request.
