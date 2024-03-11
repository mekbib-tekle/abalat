

### Usage

- Create a member type first (TODO replace with API call)

```
INSERT INTO abalat.member_type (name,display_name,created_at,updated_at) VALUES
	 ('member','Member','2024-03-11 08:11:53.274484','2024-03-11 08:11:53.274484');
```

- Create a member

```
curl -XPOST 'localhost:8000/members/create' \
-H 'Content-Type: application/json' \
-d '{
    "memberType": 1,
    "firstName": "Joe",
    "middleName": "J",
    "lastName": "Doe",
    "phoneNumber": "+358441231234",
    "isBaptised": true,
    "maritalStatus": "Married",
    "gender": "Male",
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
