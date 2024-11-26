npm install -g knex

npm run dev

# docker build
docker build -t asanand1996/be . 

# docker build prod
docker build -t asanand1996/be --platform linux/x86_64 .

# knex migration
knex --connection "postgresql://user:postgres@localhost:5432/mgmt-sys" migrate:latest