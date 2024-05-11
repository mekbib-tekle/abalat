## abalat

### To run the full project

`docker-compose up --build`


### Seed data
from docker desktop
- Open "database" container
- go to exec
- `mysql -u root -p`
- it asks for password: `root`
- `use abalat;`
- copy each insert statement from `backend/src/config/db_seed.sql` and populate the database
- login with `admin:123`

### for better backend live reload

Stop the backend and frontend containers from docker. Leave the database container running.

`cd backend`
`npm start --watch`

`cd frontend`
`npm start`


