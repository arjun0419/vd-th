# vd-th

<!-- SERVER EXPOSES A SINGLE RATE LIMITED ENDPOINT -->

A Dockerized REST API that exposes a single rate-limited endpoint /limit. No single user should be able to hit the endpoint more than 10 requests per second. You can identify a user by their API key in the X-API-KEY in the request header. If there is no API key, then you should immediately reject the request.

<!-- Steps to run the server assuming Make is available  -->
1. run `make image`
2. run `make run`

<!-- Run tests once docker container is running -->
1. run `make test`


<!-- Assumptions/Considerations -->
1. More than 10 requests in process from a single API key is acceptable if all are not made within the same second
2. Currently storing sessions data in memory within the server which doesn't scale well. Ideally an in-memory cache such as redis that multiple servers could access would be preferrable to scale this API as well as something like nginx on another docker container
3. Monitoring => current implementation doesn't enable significant montoring besides a log trace or adding another API endpoint that return the current sessions (see /trace).