# Docker Setup and Networking Guide

This document explains the Docker commands used to set up a containerized Node.js application with MongoDB using Docker networking.

---
# --name is the name of conatiner is specific idetity of docker jise jare docker conntect use liye --name likhan ahe  baki ke --network 
## 1. Build Docker Image

```bash
docker build -t docker-compoose .
```

**Explanation:**
- `docker build`: Command to build a Docker image from a Dockerfile
- `-t docker-compoose`: Tags the image with the name "docker-compoose"
- `.`: Specifies the current directory as the build context (where Dockerfile is located)

**What happens:**
- Docker reads the Dockerfile and executes each instruction
- Creates layers for each step (FROM, WORKDIR, COPY, RUN, etc.)
- Final image is stored locally with the tag "docker-compoose:latest"

**Build Output Details:**
- Pulls base image: `node:18-alpine`
- Sets working directory to `/app`
- Copies `package*.json` files
- Runs `npm install` to install dependencies
- Copies all application files
- Exposes port 3000
- Sets CMD to run `node index.js`

---

## 2. Create Docker Network

```bash
docker network create suck
```

**Explanation:**
- `docker network create`: Creates a new Docker network
- `suck`: Name of the network

**Purpose:**
- Allows containers to communicate with each other using container names instead of IP addresses
- Provides network isolation from other containers
- Enables DNS resolution between containers (e.g., `mongo2` can be resolved to MongoDB container's IP)

---

## 3. Run MongoDB Container

```bash
docker run -d --name mongo2 --network suck -p 27018:27017 mongo
```

**Explanation:**
- `docker run`: Creates and starts a new container
- `-d`: Runs container in detached mode (background)
- `--name mongo2`: Names the container "mongo2" for easy reference
- `--network suck`: Connects container to the "suck" network
- `-p 27018:27017`: Port mapping (host:container)
  - Maps host port 27018 to container port 27017
  - Allows accessing MongoDB from host at `localhost:27018`
- `mongo`: Official MongoDB image from Docker Hub

**Note:** Initial attempts to use `--name mongo` failed because a container with that name already existed. Using `mongo2` as the new name resolved this conflict.

---

## 4. Run Node.js Application Container

```bash
docker run -p 3001:3000 --network suck -e Mongodb_url=mongodb://mongo2:27017/docker-composs docker-compoose
```

**Explanation:**
- `docker run`: Creates and starts a new container
- `-p 3001:3000`: Port mapping
  - Maps host port 3001 to container port 3000
  - Access app at `http://localhost:3001`
- `--network suck`: Connects to the same network as MongoDB
- `-e Mongodb_url=mongodb://mongo2:27017/docker-composs`: Sets environment variable
  - `Mongodb_url`: Variable name
  - `mongodb://mongo2:27017/docker-composs`: MongoDB connection string
    - `mongo2`: Container name (resolved via Docker DNS)
    - `27017`: MongoDB's internal port
    - `docker-composs`: Database name
- `docker-compoose`: Name of the image to run

**Key Point:** The connection string uses `mongo2:27017` instead of `localhost:27018` because:
- Containers in the same network can communicate directly
- Docker's internal DNS resolves `mongo2` to the MongoDB container's IP
- Uses the internal port (27017) not the mapped port

---

## Application Output

```
[dotenv@17.2.3] injecting env (0) from .env -- tip: ⚙️  load multiple .env files with { path: ['.env.local', '.env'] }
Server is running on port 3000
Connected to MongoDB
```

**Explanation:**
- dotenv package loads environment variables from `.env` file
- Server starts on port 3000 (inside container)
- Successfully connects to MongoDB using the connection string passed via environment variable

---

## Network Architecture

```
Host Machine
├── Port 3001 → Container (Node.js App) Port 3000
└── Port 27018 → Container (MongoDB) Port 27017

Docker Network "suck"
├── Container: docker-compoose (Node.js App)
│   └── Connects to: mongodb://mongo2:27017
└── Container: mongo2 (MongoDB)
    └── Listening on: 27017
```

---

## Important Notes

### Environment Variables
- `.env` file contains: `Mongodb_url=mongodb://localhost:27017/docker-composs`
- This is overridden by the `-e` flag when running the container
- The override uses `mongo2` (container name) instead of `localhost`

### Dockerfile Warning
```
"ENV key=value" should be used instead of legacy "ENV key value" format (line 11)
```

**Fix:** In Dockerfile, change:
```dockerfile
# Old format
ENV Mongodb_url = mongodb://localhost:27017/docker-composs

# New format (commented out in current Dockerfile)
ENV Mongodb_url=mongodb://localhost:27017/docker-composs
```

### Container Name Conflicts
If you get an error like:
```
Error response from daemon: Conflict. The container name "/mongo" is already in use
```

**Solutions:**
1. Remove the existing container: `docker rm mongo`
2. Use a different name: `--name mongo2`
3. Remove and restart: `docker rm -f mongo && docker run ...`

---

## Common Docker Commands

### List running containers
```bash
docker ps
```

### List all containers (including stopped)
```bash
docker ps -a
```

### Stop a container
```bash
docker stop mongo2
docker stop <container-name>
```

### Remove a container
```bash
docker rm mongo2
```

### Remove an image
```bash
docker rmi docker-compoose
```

### View container logs
```bash
docker logs mongo2
docker logs <container-name>
```

### List networks
```bash
docker network ls
```

### Inspect network
```bash
docker network inspect suck
```

### Execute command in running container
```bash
docker exec -it mongo2 mongosh
docker exec -it <container-name> bash
```

---

## Summary

This setup demonstrates:
1. **Building** a custom Docker image from a Dockerfile
2. **Creating** a Docker network for container communication
3. **Running** multiple containers on the same network
4. **Connecting** containers using Docker DNS (container names)
5. **Mapping** ports to access services from the host
6. **Passing** environment variables to override configuration

The key advantage: Containers can communicate using simple names (`mongo2`) instead of managing IP addresses, making the setup portable and easy to maintain.
