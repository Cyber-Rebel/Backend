# Project Setup Guide

This guide provides three different ways to run this Node.js + MongoDB project, from manual setup to fully automated Docker Compose.

---

## 📋 Prerequisites

Before starting, ensure you have:

- **Git** installed: `git --version`
- **Node.js** (v18 or higher): `node --version`
- **npm**: `npm --version`
- **MongoDB** (for manual setup): `mongod --version`
- **Docker** (for Docker setup): `docker --version`
- **Docker Compose** (for easiest setup): `docker-compose --version`

---

## 🚀 Three Ways to Run the Project

| Method | Difficulty | Best For | Setup Time |
|--------|-----------|----------|------------|
| 1. Manual (Git) | ⭐⭐⭐ | Learning, Development | ~10 mins |
| 2. Docker | ⭐⭐ | Consistency, Testing | ~5 mins |
| 3. Docker Compose | ⭐ | Quick Start, Production | ~2 mins |

---

# Method 1: Manual Setup (Git Clone)

This method involves cloning the repository and manually setting up MongoDB and Node.js.

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd docker-compose
```

**Replace `<repository-url>` with actual GitHub URL:**
```bash
# HTTPS
git clone https://github.com/username/docker-compose.git

# SSH
git clone git@github.com:username/docker-compose.git
```

---

### Step 2: Install MongoDB Locally

#### On Ubuntu/Debian:
```bash
# Import MongoDB public key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg

# Add MongoDB repository
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

#### On macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0

# Check status
brew services list
```

#### On Windows:
- Download MongoDB installer from: https://www.mongodb.com/try/download/community
- Run installer and follow setup wizard
- Start MongoDB service from Services panel

---

### Step 3: Create Environment File

```bash
# Create .env file
cat > .env << EOF
Mongodb_url=mongodb://localhost:27017/docker-composs
EOF
```

**Or create manually:**
```bash
nano .env
```

Add this content:
```env
Mongodb_url=mongodb://localhost:27017/docker-composs
```

Save and exit (`Ctrl+X`, then `Y`, then `Enter`).

---

### Step 4: Install Node.js Dependencies

```bash
npm install
```

**Expected output:**
```
added 150 packages, and audited 151 packages in 5s
```

**Packages installed:**
- express: Web framework
- mongoose: MongoDB ODM
- dotenv: Environment variable loader

---

### Step 5: Start the Application

```bash
node index.js
```

**Expected output:**
```
[dotenv@17.2.3] injecting env (1) from .env
Server is running on port 3000
Connected to MongoDB
```

---

### Step 6: Test the Application

**Open another terminal and test:**

```bash
# Test home endpoint
curl http://localhost:3000

# Expected: Hello, World!

# Test users endpoint
curl http://localhost:3000/users

# Expected: []
```

**Or open in browser:**
- http://localhost:3000
- http://localhost:3000/users

---

### Step 7: Stop the Application

Press `Ctrl+C` in the terminal where Node.js is running.

---

### Manual Setup Summary

```bash
# Complete workflow
git clone <repository-url>
cd docker-compose
npm install
echo "Mongodb_url=mongodb://localhost:27017/docker-composs" > .env
node index.js
```

**Pros:**
- ✅ Full control over each component
- ✅ Easy debugging
- ✅ Good for learning

**Cons:**
- ❌ MongoDB must be installed locally
- ❌ Manual dependency management
- ❌ Environment-specific issues

---

# Method 2: Docker Setup

This method uses Docker to containerize the application and MongoDB separately.

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd docker-compose
```

---

### Step 2: Create Environment File

```bash
echo "Mongodb_url=mongodb://localhost:27017/docker-composs" > .env
```

**Note:** This `.env` is for reference only. We'll override it with Docker environment variables.

---

### Step 3: Create Docker Network

```bash
docker network create myapp-network
```

**Explanation:**
- Creates a custom bridge network
- Allows containers to communicate by name
- Isolated from other Docker networks

---

### Step 4: Start MongoDB Container

```bash
docker run -d \
  --name mongo3 \
  --network myapp-network \
  -p 27018:27017 \
  mongo
```

**Explanation:**
- `-d`: Run in detached mode (background)
- `--name mongo3`: Container name
- `--network myapp-network`: Connect to custom network
- `-p 27018:27017`: Map host port 27018 to container port 27017
- `mongo`: Official MongoDB image

**Verify MongoDB is running:**
```bash
docker ps
```

**Expected output:**
```
CONTAINER ID   IMAGE     COMMAND                  STATUS         PORTS
abc123def456   mongo     "docker-entrypoint.s…"   Up 10 seconds  0.0.0.0:27018->27017/tcp
```

---

### Step 5: Build Application Image

```bash
docker build -t user-app .
```

**Explanation:**
- `docker build`: Build image from Dockerfile
- `-t user-app`: Tag the image as "user-app"
- `.`: Build context (current directory)

**Expected output:**
```
[+] Building 10.5s (11/11) FINISHED
 => [1/5] FROM docker.io/library/node:18-alpine
 => [2/5] WORKDIR /app
 => [3/5] COPY package* .
 => [4/5] RUN npm install
 => [5/5] COPY . .
 => exporting to image
Successfully built abc123def456
Successfully tagged user-app:latest
```

---

### Step 6: Start Application Container

```bash
docker run -d \
  --name user_app \
  --network myapp-network \
  -p 3001:3000 \
  -e Mongodb_url=mongodb://mongo3:27017/docker-composs \
  user-app
```

**Explanation:**
- `-d`: Run in detached mode
- `--name user_app`: Container name
- `--network myapp-network`: Same network as MongoDB
- `-p 3001:3000`: Map host port 3001 to container port 3000
- `-e Mongodb_url=...`: Set environment variable
  - `mongo3`: MongoDB container name (DNS resolved by Docker)
  - `27017`: MongoDB's internal port (not the mapped 27018)
- `user-app`: Image name to run

---

### Step 7: Check Container Status

```bash
docker ps
```

**Expected output:**
```
CONTAINER ID   IMAGE      COMMAND           STATUS         PORTS
abc123def456   mongo      "docker-entry…"   Up 2 mins      0.0.0.0:27018->27017/tcp
def456abc789   user-app   "node index.js"   Up 30 secs     0.0.0.0:3001->3000/tcp
```

---

### Step 8: View Application Logs

```bash
docker logs -f user_app
```

**Expected output:**
```
[dotenv@17.2.3] injecting env (0) from .env
Server is running on port 3000
Connected to MongoDB
```

Press `Ctrl+C` to stop viewing logs (container keeps running).

---

### Step 9: Test the Application

```bash
# Test home endpoint
curl http://localhost:3001

# Test users endpoint
curl http://localhost:3001/users
```

**Or open in browser:**
- http://localhost:3001
- http://localhost:3001/users

---

### Step 10: Stop and Clean Up

```bash
# Stop containers
docker stop user_app mongo3

# Remove containers
docker rm user_app mongo3

# Remove network
docker network rm myapp-network

# (Optional) Remove image
docker rmi user-app
```

---

### Docker Setup Summary

```bash
# Complete workflow
git clone <repository-url>
cd docker-compose
docker network create myapp-network
docker run -d --name mongo3 --network myapp-network -p 27018:27017 mongo
docker build -t user-app .
docker run -d --name user_app --network myapp-network -p 3001:3000 \
  -e Mongodb_url=mongodb://mongo3:27017/docker-composs user-app
docker logs -f user_app
```

**Pros:**
- ✅ Consistent environment
- ✅ No local MongoDB installation needed
- ✅ Easy to share and deploy
- ✅ Isolated from host system

**Cons:**
- ❌ Multiple commands to manage
- ❌ Manual network creation
- ❌ Need to remember container names

---

# Method 3: Docker Compose (Easiest!) ⭐

This is the simplest and recommended method for running the project.

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd docker-compose
```

---

### Step 2: Create Environment File (Optional)

```bash
echo "Mongodb_url=mongodb://localhost:27017/docker-composs" > .env
```

**Note:** The `docker-compose.yml` will override this with the correct values, but it's good practice to have the file.

---

### Step 3: Start Everything with One Command! 🚀

```bash
docker-compose up -d
```

**That's it!** This single command:
- ✅ Creates the network automatically
- ✅ Pulls MongoDB image (if not present)
- ✅ Builds the application image
- ✅ Starts MongoDB container
- ✅ Starts application container
- ✅ Connects them together

**Expected output:**
```
Creating network "docker-compose_default" with the default driver
Pulling mongo3 (mongo:)...
latest: Pulling from library/mongo
Building user_app...
[+] Building 10.8s (11/11) FINISHED
Creating docker-compose_mongo3_1   ... done
Creating docker-compose_user_app_1 ... done
```

---

### Step 4: Check Status

```bash
docker-compose ps
```

**Expected output:**
```
         Name                       Command               State           Ports
-----------------------------------------------------------------------------------------
docker-compose_mongo3_1     docker-entrypoint.sh mongod   Up      0.0.0.0:27018->27017/tcp
docker-compose_user_app_1   node index.js                 Up      0.0.0.0:3001->3000/tcp
```

---

### Step 5: View Logs

```bash
docker-compose logs -f
```

**Expected output:**
```
mongo3_1     | MongoDB starting...
user_app_1   | [dotenv@17.2.3] injecting env (0) from .env
user_app_1   | Server is running on port 3000
user_app_1   | Connected to MongoDB
```

Press `Ctrl+C` to stop viewing logs.

---

### Step 6: Test the Application

```bash
curl http://localhost:3001
curl http://localhost:3001/users
```

**Or open in browser:**
- http://localhost:3001
- http://localhost:3001/users

---

### Step 7: Stop Everything

```bash
docker-compose down
```

**This command:**
- ✅ Stops all containers
- ✅ Removes containers
- ✅ Removes network
- ✅ Keeps images and volumes (data persists)

**To also remove volumes (delete database data):**
```bash
docker-compose down -v
```

---

### Docker Compose - Additional Commands

#### Restart services
```bash
docker-compose restart
```

#### Rebuild after code changes
```bash
docker-compose up --build -d
```

#### View logs for specific service
```bash
docker-compose logs -f user_app
docker-compose logs -f mongo3
```

#### Execute command in running container
```bash
docker-compose exec user_app sh
docker-compose exec mongo3 mongosh
```

#### Stop without removing containers
```bash
docker-compose stop
```

#### Start stopped containers
```bash
docker-compose start
```

---

### Docker Compose Setup Summary

```bash
# Complete workflow (just 3 commands!)
git clone <repository-url>
cd docker-compose
docker-compose up -d

# Test
curl http://localhost:3001

# Stop
docker-compose down
```

**Pros:**
- ✅✅✅ Easiest method - ONE command!
- ✅ Automatic network creation
- ✅ Automatic service orchestration
- ✅ Defined in version-controlled file
- ✅ Easy to scale and modify
- ✅ Best for development and production

**Cons:**
- ❌ (None! This is the recommended approach)

---

## 📊 Quick Comparison

| Feature | Manual | Docker | Docker Compose |
|---------|--------|--------|----------------|
| **Setup Commands** | ~8 commands | ~6 commands | **2 commands** |
| **MongoDB Install** | Required | Not required | Not required |
| **Network Setup** | Manual | Manual | **Automatic** |
| **Consistency** | Environment-dependent | Consistent | Consistent |
| **Learning Curve** | High | Medium | **Low** |
| **Production Ready** | No | Yes | **Yes** |
| **Recommended** | For learning | For custom setups | **⭐ YES!** |

---

## 🎯 Which Method Should I Use?

### Use Method 1 (Manual) if:
- You want to understand each component
- You're learning Node.js and MongoDB
- You need to debug individual services
- You're developing without Docker

### Use Method 2 (Docker) if:
- You need custom Docker configurations
- You're building complex multi-stage setups
- You want more control over containers
- You're creating custom networks

### Use Method 3 (Docker Compose) if:
- You want to get started quickly ⚡
- You're working in a team (consistent environment)
- You're deploying to production
- You want easy service management
- **You're a beginner** - START HERE! 🎯

---

## 🔧 Troubleshooting

### Port Already in Use

**Error:**
```
Error: bind: address already in use
```

**Solution:**
```bash
# Find and kill process using port
sudo lsof -i :3001
kill -9 <PID>

# Or change port in docker-compose.yml or command
```

---

### MongoDB Connection Failed

**Error:**
```
Could not connect to MongoDB
```

**Solution:**
```bash
# Check if MongoDB is running
docker ps                           # Docker method
sudo systemctl status mongod        # Manual method

# Check connection string matches
# Docker: mongodb://mongo3:27017/...
# Manual: mongodb://localhost:27017/...
```

---

### Docker Compose Not Found

**Error:**
```
docker-compose: command not found
```

**Solution:**
```bash
# Install Docker Compose
sudo apt-get install docker-compose-plugin

# Or use docker compose (without hyphen)
docker compose up -d
```

---

### Permission Denied (Linux)

**Error:**
```
permission denied while trying to connect to Docker daemon
```

**Solution:**
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and log back in, or run:
newgrp docker
```

---

## 📁 Project Structure

```
docker-compose/
├── .env                          # Environment variables
├── docker-compose.yml            # Docker Compose configuration ⭐
├── Dockerfile                    # Docker image build instructions
├── package.json                  # Node.js dependencies
├── index.js                      # Main application file
├── src/
│   └── model/
│       └── user.model.js         # Mongoose user model
├── Contribute.md                 # This file
├── DockerContribute.md           # Docker commands guide
├── Docker-composeContribute.md   # Docker Compose guide
└── GithubContribute.md           # GitHub setup guide
```

---

## 🎓 Next Steps

After successfully running the project:

1. **Explore the code:**
   - Check `index.js` for API endpoints
   - Review `src/model/user.model.js` for database schema
   - Examine `docker-compose.yml` for service configuration

2. **Add new features:**
   - Create POST endpoints to add users
   - Add more database models
   - Implement authentication

3. **Learn more:**
   - Read `DockerContribute.md` for detailed Docker commands
   - Check `Docker-composeContribute.md` for advanced Docker Compose
   - Review `GithubContribute.md` for Git workflows

4. **Scale up:**
   - Add Redis for caching
   - Include Nginx for reverse proxy
   - Set up CI/CD pipeline

---

## 📝 Summary

**Fastest way to start (Recommended):**
```bash
git clone <repository-url>
cd docker-compose
docker-compose up -d
curl http://localhost:3001
```

**To stop:**
```bash
docker-compose down
```

That's it! You're ready to develop! 🚀

---

## 🆘 Need Help?

- Check logs: `docker-compose logs -f`
- Review documentation files in the project
- Ensure all prerequisites are installed
- Verify ports 3001 and 27018 are available

Happy coding! 💻✨
