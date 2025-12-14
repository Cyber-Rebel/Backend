version: "3.8"

services:
  mongodb:
    image: mongo
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
# docker run mongo --name mongodb -p 27017:27017 -v mongodb_data:/data/db that above line represt that single commond  mongodb servie above line ka yesa mtlab hoga hae 

  backend22:
    image: backend22
    container_name: backend_app
    depends_on:
      - mongodb
    ports:
      - "3000:3000"
    environment:
      MONGO_URL: "mongodb://mongodb:27017"

volumes:
  mongodb_data:


# network in docker.yml file 
one very import in docker-compose is if you start multiple container defince multilple service that all automatically connected by a network 
that container you starting already automatically connecte network that alerdy talk to each other 

how does one container talk another container by name  dsa and ip is name of conatiner 