npm install -g knex

npm run dev

# docker builds
docker build -t asanand1996/be . 

docker run --name be -d -p 8000:8000 asanand1996/be

# knex migration
knex --connection "postgresql://user:postgres@localhost:5432/mgmt-sys" migrate:latest