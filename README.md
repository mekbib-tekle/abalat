# abalat

docker-compose up


### OR

This approach is better for the backend live reload


cd backend
npm start --watch

cd frontend
npm start

start the database container from docker (If you don't have the database container, start all containers with `docker-compose up`. Then stop the other containers, leave the database running.)