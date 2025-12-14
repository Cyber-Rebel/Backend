# Docker Compose Setup Guide

This document explains how to use Docker Compose to run a multi-container application with Node.js and MongoDB.

---

## What is Docker Compose?

Docker Compose is a tool for defining and running multi-container Docker applications. Instead of running multiple `docker run` commands, you define all services in a single `docker-compose.yml` file and manage them together.

### Advantages over plain Docker commands:
- ✅ Single command to start/stop all services
- ✅ Automatic network creation between containers
- ✅ Service dependency management
- ✅ Easy environment variable configuration
- ✅ Simplified container orchestration
- ✅ Version-controlled infrastructure

---

## Docker Compose File Breakdown

### `docker-compose.yml`

```yaml
version: '3.8'

services:
 mongo3:
    image: mongo
    ports:
      - "27018:27017"

 user_app:
  build:
    context: ./
    dockerfile: Dockerfile
  environment:
   Mongodb_url : mongodb://mongo3:27017/user_db
  ports:
   - "3001:3000"
  depends_on:
   - mongo3
```

---

## Configuration Explanation

### Version
```yaml
version: '3.8'
```
- Specifies the Docker Compose file format version
- Version 3.8 is compatible with Docker Engine 19.03.0+

---

### Service: mongo3 (MongoDB Database)

```yaml
mongo3:
  image: mongo
  ports:
    - "27018:27017"
```

**Breakdown:**
- `mongo3`: Service name (also the hostname for inter-container communication)
- `image: mongo`: Uses official MongoDB image from Docker Hub
- `ports`: Port mapping
  - `"27018:27017"`: Maps host port 27018 to container port 27017
  - Access from host: `mongodb://localhost:27018`
  - Access from other containers: `mongodb://mongo3:27017`

**Note:** No need to pull the image manually; Docker Compose pulls it automatically if not present locally.

---

### Service: user_app (Node.js Application)

```yaml
user_app:
  build:
    context: ./
    dockerfile: Dockerfile
  environment:
   Mongodb_url : mongodb://mongo3:27017/user_db
  ports:
   - "3001:3000"
  depends_on:
   - mongo3
```

**Breakdown:**

#### Build Configuration
```yaml
build:
  context: ./
  dockerfile: Dockerfile
```
- `context: ./`: Build context is the current directory
- `dockerfile: Dockerfile`: Specifies which Dockerfile to use
- Docker Compose will **build the image first**, then start the container

#### Environment Variables
```yaml
environment:
  Mongodb_url : mongodb://mongo3:27017/user_db
```
- Sets the `Mongodb_url` environment variable inside the container
- Connection string: `mongodb://mongo3:27017/user_db`
  - `mongo3`: Service name (Docker's internal DNS resolves this)
  - `27017`: MongoDB's internal port (not the mapped port)
  - `user_db`: Database name
- **Overrides** the `.env` file value

#### Port Mapping
```yaml
ports:
  - "3001:3000"
```
- Maps host port 3001 to container port 3000
- Access application at: `http://localhost:3001`

#### Dependencies
```yaml
depends_on:
  - mongo3
```
- Ensures `mongo3` starts **before** `user_app`
- Provides startup order (but doesn't wait for MongoDB to be ready)

---

## Key Concepts

### 1. Automatic Network Creation
Docker Compose automatically creates a network for all services. This means:
- All services can communicate using service names as hostnames
- No need for `docker network create` command
- Example: `user_app` can reach MongoDB at `mongo3:27017`

### 2. Service Discovery (DNS)
- Each service name becomes a DNS entry
- `mongo3` resolves to the MongoDB container's IP address
- Containers use internal DNS for communication

### 3. Build vs Image
- `image`: Pulls a pre-built image from Docker Hub or registry
- `build`: Builds an image from a Dockerfile in your project

### 4. Dependency Management
- `depends_on` controls startup order
- ⚠️ **Important**: It doesn't wait for the service to be "ready"
- For production, use health checks or wait scripts

---

## Docker Compose Commands

### 1. Start All Services

```bash
docker-compose up
```

**Explanation:**
- Builds images if needed (first time or if Dockerfile changed)
- Creates network
- Starts all services defined in `docker-compose.yml`
- Shows logs from all containers in the terminal (attached mode)

**Output:**
- Shows build process for `user_app`
- Pulls MongoDB image (if not present)
- Starts both containers
- Displays logs from both services

---

### 2. Start Services in Background (Detached Mode)

```bash
docker-compose up -d
```

**Explanation:**
- `-d` or `--detach`: Runs containers in the background
- Returns control to terminal immediately
- Containers continue running in the background

**Use case:** When you want to continue using the terminal for other tasks.

---

### 3. Build and Start Services

```bash
docker-compose up --build
```

**Explanation:**
- `--build`: Forces rebuild of images even if they exist
- Useful when you've made changes to:
  - Dockerfile
  - Application code
  - Dependencies (package.json)

---

### 4. View Logs

```bash
docker-compose logs
```

**Explanation:**
- Shows logs from all services
- Displays historical logs since container started

**View logs for specific service:**
```bash
docker-compose logs user_app
docker-compose logs mongo3
```

**Follow logs in real-time:**
```bash
docker-compose logs -f
docker-compose logs -f user_app
```

---

### 5. Stop All Services

```bash
docker-compose down
```

**Explanation:**
- Stops all running containers
- Removes containers
- Removes the network
- **Keeps volumes and images** (data persists)

---

### 6. Stop and Remove Everything (Including Volumes)

```bash
docker-compose down -v
```

**Explanation:**
- `-v` or `--volumes`: Also removes named volumes
- ⚠️ **Warning**: This deletes database data
- Use with caution in development

---

### 7. List Running Services

```bash
docker-compose ps
```

**Explanation:**
- Shows status of all services defined in `docker-compose.yml`
- Displays container names, states, and ports

---

### 8. Restart Services

```bash
docker-compose restart
```

**Explanation:**
- Restarts all services without rebuilding

**Restart specific service:**
```bash
docker-compose restart user_app
```

---

### 9. Stop Services (Without Removing)

```bash
docker-compose stop
```

**Explanation:**
- Stops containers but doesn't remove them
- Can be restarted with `docker-compose start`

---

### 10. Start Stopped Services

```bash
docker-compose start
```

**Explanation:**
- Starts previously stopped containers
- Doesn't rebuild or recreate containers

---

### 11. Execute Commands Inside Running Container

```bash
docker-compose exec user_app sh
docker-compose exec mongo3 mongosh
```

**Explanation:**
- `exec`: Execute a command in a running service
- `user_app`: Service name
- `sh` or `bash`: Open a shell inside the container
- `mongosh`: MongoDB shell

---

### 12. View Service Configuration

```bash
docker-compose config
```

**Explanation:**
- Validates and displays the final composed configuration
- Shows how Docker Compose interprets your `docker-compose.yml`

---

### 13. Pull Latest Images

```bash
docker-compose pull
```

**Explanation:**
- Pulls the latest versions of images defined with `image:`
- Doesn't affect services that use `build:`

---

### 14. Build Images Only (Don't Start)

```bash
docker-compose build
```

**Explanation:**
- Builds/rebuilds images for services that use `build:`
- Doesn't start any containers

**Build specific service:**
```bash
docker-compose build user_app
```

---

### 15. Scale Services (Run Multiple Instances)

```bash
docker-compose up -d --scale user_app=3
```

**Explanation:**
- Runs 3 instances of `user_app`
- ⚠️ **Note**: Remove port mapping or use different ports for scaling

---

## Complete Workflow Example

### First Time Setup

```bash
# 1. Navigate to project directory
cd /home/cyber-rebel/Desktop/Backend\ Cohort/docker-compose

# 2. Build and start services
docker-compose up --build -d

# 3. View logs to confirm everything is running
docker-compose logs -f

# 4. Test the application
curl http://localhost:3001
curl http://localhost:3001/users
```

### Development Workflow

```bash
# Make code changes...

# Rebuild and restart
docker-compose up --build -d

# View logs
docker-compose logs -f user_app

# Stop when done
docker-compose down
```

### Debugging

```bash
# Check service status
docker-compose ps

# View logs for specific service
docker-compose logs user_app

# Access container shell
docker-compose exec user_app sh

# Restart a service
docker-compose restart user_app

# Stop and remove everything
docker-compose down -v
```

---

## Application Architecture

```
Host Machine (localhost)
├── Port 3001 → user_app Container (Port 3000)
│   └── Node.js + Express Application
│
└── Port 27018 → mongo3 Container (Port 27017)
    └── MongoDB Database

Docker Compose Network (auto-created)
├── user_app
│   └── Connects to: mongodb://mongo3:27017/user_db
└── mongo3
    └── Listens on: 27017 (internal)
```

---

## Environment Variables Priority

When using Docker Compose, environment variables are resolved in this order (highest to lowest priority):

1. **Command line** `-e` flag (not applicable in docker-compose)
2. **docker-compose.yml** `environment:` section ✅ (Used in our setup)
3. **`.env` file** in project root
4. **Dockerfile** `ENV` instruction

In our setup:
```yaml
environment:
  Mongodb_url: mongodb://mongo3:27017/user_db
```
This **overrides** the `.env` file value.

---

## Comparison: Docker vs Docker Compose

### Using Plain Docker (Multiple Commands)

```bash
# Create network
docker network create mynetwork

# Start MongoDB
docker run -d --name mongo3 --network mynetwork -p 27018:27017 mongo

# Build application
docker build -t user_app .

# Start application
docker run -d --name user_app --network mynetwork \
  -p 3001:3000 \
  -e Mongodb_url=mongodb://mongo3:27017/user_db \
  user_app

# Stop everything
docker stop user_app mongo3
docker rm user_app mongo3
docker network rm mynetwork
```

### Using Docker Compose (Single Command)

```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down
```

**Winner:** Docker Compose! 🎉

---

## Troubleshooting

### Service won't start
```bash
# Check logs
docker-compose logs user_app

# Check if port is already in use
sudo lsof -i :3001
```

### Need to rebuild after code changes
```bash
docker-compose up --build
```

### MongoDB connection issues
- Verify service name matches in connection string
- Use `mongo3:27017` (not `localhost:27018`) from inside containers
- Check logs: `docker-compose logs mongo3`

### "Address already in use" error
- Change port mapping in `docker-compose.yml`
- Or stop conflicting service: `docker-compose down`

---

## Best Practices

1. **Use version control** for `docker-compose.yml`
2. **Add `.env` to `.gitignore`** (contains secrets)
3. **Use specific image versions** in production:
   ```yaml
   image: mongo:7.0
   ```
4. **Add health checks** for production:
   ```yaml
   healthcheck:
     test: ["CMD", "curl", "-f", "http://localhost:3000"]
     interval: 30s
     timeout: 10s
     retries: 3
   ```
5. **Use volumes** for data persistence:
   ```yaml
   volumes:
     - mongo_data:/data/db
   ```

---

## Summary

Docker Compose simplifies multi-container application management by:
- ✅ Defining all services in one YAML file
- ✅ Starting/stopping everything with single commands
- ✅ Automatically creating networks for service communication
- ✅ Managing dependencies between services
- ✅ Making development and deployment consistent and reproducible

**Key Command to Remember:**
```bash
docker-compose up -d    # Start everything
docker-compose down     # Stop everything
```
