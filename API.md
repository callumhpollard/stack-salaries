Our server implements the following api:

|       URL      | HTTP Verb | POST Body |                   Result                                  |
|:--------------:|:---------:|:---------:|:---------------------------------------------------------:|
| /users         |    GET    |   empty   |  Return JSON of all users (requires authorization header) |
| /signup        |    POST   |    JSON   |  Create new user                                          |
| /users/:id     |    GET    |   empty   |  Return JSON of single user with matching `id`            |
