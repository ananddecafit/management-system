# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
ENV API_PORT=8080

# Setting up the work directory
WORKDIR /be

# Copying all the files in our project
COPY . /

# Exposing server port
EXPOSE 8080

# Installing dependencies
RUN npm install

# Starting our application
CMD [ "node", "./bin/www" ]