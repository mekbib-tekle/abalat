# abalat

docker-compose up


### OR

This approach is better for the backend live reload


cd backend
npm start --watch

cd frontend
npm start

start the database container from docker (If you don't have the database container, start all containers with `docker-compose up`. Then stop the other containers, leave the database running.)


### Seed data

backend/src/config/db_seed.sql has insert statements that can be used for testing.
After seeding the data, login with `admin:123`