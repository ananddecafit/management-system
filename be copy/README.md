npm install -g knex

npm start

# docker builds
docker build -t asanand1996/be . 

docker run --name be -d -p 8000:8000 asanand1996/be

knex --connection "postgresql://user:postgres@localhost:5432/mgmt-sys" migrate:latest