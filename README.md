## abalat

### To run the full project

`docker-compose -f docker-compose.dev.yml up --build`


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

Stop the backend and frontend containers. Leave the database container running.
```bash
# development
$ cd backend
$ npm install
$ npm start --watch
```

```bash
# development
$ cp .env.example .env
$ cd frontend
$ npm install
$ npm start
```



