

### Usage

- Create a member

```
curl -XPOST 'localhost:8000/members/create' \
-H 'Content-Type: application/json' \
-d '{
    "firstName": "Joe",
    "lastName": "Doe",
    "username": "joe.doe",
    "password": "123456789"
}'
```

- Use member credentials to get `access_token`
```
curl -XPOST 'localhost:8000/auth/login' \
-H 'Content-Type: application/json' \
-d '{
    "username": "joe.doe",
    "password": "123456789"
}'
```

-  Use `access_token` to access a protected route
```
curl 'localhost:8000/members/1' \
-H 'Authorization: Bearer eyJhbGciOiJ....'
```
