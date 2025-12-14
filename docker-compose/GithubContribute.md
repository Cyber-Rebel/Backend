# GitHub Clone and Setup Guide

This guide explains how to clone this project from GitHub and get it running on your local machine using Docker and Docker Compose.

---

## Prerequisites

Before starting, ensure you have the following installed:

- **Git**: Version control system
  ```bash
  git --version
  ```
  
- **Docker**: Container platform
  ```bash
  docker --version
  ```
  
- **Docker Compose**: Multi-container orchestration
  ```bash
  docker-compose --version
  ```

---

## Quick Start (3 Steps)

```bash
# 1. Clone the repository
git clone <repository-url>
cd docker-compose

# 2. Create environment file
cp .env.example .env
# Or create .env manually (see below)

# 3. Start with Docker Compose
docker-compose up -d
```

Your application will be running at `http://localhost:3001`!

---

## Detailed Setup Guide

### Step 1: Clone the Repository

```bash
git clone <repository-url>
```

**Explanation:**
- `git clone`: Downloads the repository to your local machine
- `<repository-url>`: Replace with actual GitHub repository URL

**Examples:**
```bash
# HTTPS
git clone https://github.com/username/docker-compose.git

# SSH
git clone git@github.com:username/docker-compose.git
```

**Output:**
```
Cloning into 'docker-compose'...
remote: Enumerating objects: 50, done.
remote: Counting objects: 100% (50/50), done.
remote: Compressing objects: 100% (30/30), done.
remote: Total 50 (delta 15), reused 45 (delta 12), pack-reused 0
Receiving objects: 100% (50/50), 12.34 KiB | 2.47 MiB/s, done.
Resolving deltas: 100% (15/15), done.
```

---

### Step 2: Navigate to Project Directory

```bash
cd docker-compose
```

**Explanation:**
- Changes directory to the cloned project folder
- All subsequent commands should be run from this directory

**Verify you're in the correct directory:**
```bash
ls -la
```

**Expected files:**
```
.env (or .env.example)
docker-compose.yml
Dockerfile
package.json
index.js
src/
```

---

### Step 3: Create Environment File (.env)

The `.env` file contains environment variables needed by the application. This file is typically **not included in the repository** for security reasons.

#### Option A: Copy from Example (if provided)

```bash
cp .env.example .env
```

**Explanation:**
- Copies `.env.example` to `.env`
- Edit `.env` if needed for your local setup

---

#### Option B: Create .env File Manually

If `.env.example` doesn't exist, create the file:

```bash
nano .env
```

Or use any text editor:
```bash
code .env    # VS Code
vim .env     # Vim
gedit .env   # Gedit
```

**Add this content:**
```env
Mongodb_url=mongodb://localhost:27017/docker-composs
```

**Explanation:**
- `Mongodb_url`: MongoDB connection string
- `localhost:27017`: Default MongoDB connection (for local development)
- `docker-composs`: Database name

**Note:** When using Docker Compose, this value will be **overridden** by the environment variable in `docker-compose.yml`.

**Save and exit:**
- Nano: `Ctrl+X`, then `Y`, then `Enter`
- Vim: `Esc`, then `:wq`, then `Enter`

---

### Step 4: Start Application with Docker Compose

```bash
docker-compose up -d
```

**Explanation:**
- `docker-compose up`: Starts all services defined in `docker-compose.yml`
- `-d`: Detached mode (runs in background)

**What happens:**
1. ✅ Pulls MongoDB image (if not present)
2. ✅ Builds Node.js application image from Dockerfile
3. ✅ Creates Docker network
4. ✅ Starts MongoDB container (`mongo3`)
5. ✅ Starts application container (`user_app`)

**Output:**
```
Creating network "docker-compose_default" with the default driver
Pulling mongo3 (mongo:)...
latest: Pulling from library/mongo
...
Building user_app
[+] Building 12.5s (11/11) FINISHED
...
Creating docker-compose_mongo3_1 ... done
Creating docker-compose_user_app_1 ... done
```

---

### Step 5: Verify Services Are Running

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

**Check logs:**
```bash
docker-compose logs
```

**Expected output:**
```
mongo3_1     | MongoDB starting...
user_app_1   | [dotenv] injecting env from .env
user_app_1   | Server is running on port 3000
user_app_1   | Connected to MongoDB
```

---

### Step 6: Test the Application

#### Test API Endpoints

**Home endpoint:**
```bash
curl http://localhost:3001
```

**Expected response:**
```
Hello, World!
```

**Users endpoint:**
```bash
curl http://localhost:3001/users
```

**Expected response:**
```json
[]
```
(Empty array if no users exist yet)

---

#### Test in Browser

Open your browser and navigate to:
- **Home:** http://localhost:3001
- **Users API:** http://localhost:3001/users

---

### Step 7: View Logs (Optional)

**View all logs:**
```bash
docker-compose logs -f
```

**View specific service logs:**
```bash
docker-compose logs -f user_app
docker-compose logs -f mongo3
```

**Explanation:**
- `-f` or `--follow`: Continuously streams logs (like `tail -f`)
- Press `Ctrl+C` to stop viewing logs (containers keep running)

---

## Complete Git Clone Workflow

### Scenario: Cloning and Starting for the First Time

```bash
# 1. Clone repository
git clone https://github.com/username/docker-compose.git

# 2. Enter directory
cd docker-compose

# 3. Create .env file
cat > .env << EOF
Mongodb_url=mongodb://localhost:27017/docker-composs
EOF

# 4. Start services
docker-compose up -d

# 5. Check status
docker-compose ps

# 6. View logs
docker-compose logs -f

# 7. Test application
curl http://localhost:3001
curl http://localhost:3001/users

# 8. Stop when done
docker-compose down
```

---

## Alternative: Starting with Plain Docker (Without Docker Compose)

If you prefer not to use Docker Compose:

```bash
# 1. Clone repository
git clone https://github.com/username/docker-compose.git
cd docker-compose

# 2. Create .env file (same as above)
cat > .env << EOF
Mongodb_url=mongodb://localhost:27017/docker-composs
EOF

# 3. Create Docker network
docker network create myapp-network

# 4. Start MongoDB
docker run -d \
  --name mongo3 \
  --network myapp-network \
  -p 27018:27017 \
  mongo

# 5. Build application image
docker build -t user-app .

# 6. Start application
docker run -d \
  --name user_app \
  --network myapp-network \
  -p 3001:3000 \
  -e Mongodb_url=mongodb://mongo3:27017/user_db \
  user-app

# 7. Check logs
docker logs -f user_app

# 8. Test
curl http://localhost:3001

# 9. Stop everything
docker stop user_app mongo3
docker rm user_app mongo3
docker network rm myapp-network
```

---

## Managing the Project

### Stop Services

```bash
docker-compose down
```

**Explanation:**
- Stops and removes containers
- Removes networks
- **Keeps images and volumes** (data persists)

---

### Restart Services

```bash
docker-compose restart
```

**Explanation:**
- Restarts containers without rebuilding

---

### Rebuild After Code Changes

```bash
docker-compose up --build -d
```

**Explanation:**
- `--build`: Rebuilds images even if they exist
- Use this when you:
  - Update application code
  - Modify Dockerfile
  - Change dependencies in `package.json`

---

### View Running Containers

```bash
docker-compose ps
```

---

### Remove Everything (Including Volumes)

```bash
docker-compose down -v
```

**Explanation:**
- `-v`: Also removes volumes
- ⚠️ **Warning:** This deletes database data

---

## Common Issues and Solutions

### Issue 1: Port Already in Use

**Error:**
```
Error starting userland proxy: listen tcp 0.0.0.0:3001: bind: address already in use
```

**Solution:**

```bash
# Find what's using the port
sudo lsof -i :3001

# Kill the process
kill -9 <PID>

# Or change port in docker-compose.yml
# Change "3001:3000" to "3002:3000"
```

---

### Issue 2: Permission Denied (Linux)

**Error:**
```
permission denied while trying to connect to the Docker daemon socket
```

**Solution:**

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and log back in, or run:
newgrp docker

# Test
docker ps
```

---

### Issue 3: MongoDB Connection Failed

**Error in logs:**
```
Could not connect to MongoDB
```

**Solution:**

```bash
# Check if MongoDB is running
docker-compose ps

# Check MongoDB logs
docker-compose logs mongo3

# Verify connection string in docker-compose.yml
# Should be: mongodb://mongo3:27017/user_db
```

---

### Issue 4: `.env` File Not Found

**Error:**
```
[dotenv] injecting env (0) from .env
```

**Solution:**

```bash
# Create .env file
echo "Mongodb_url=mongodb://localhost:27017/docker-composs" > .env

# Restart services
docker-compose restart user_app
```

---

### Issue 5: Need to Reset Everything

```bash
# Stop and remove everything
docker-compose down -v

# Remove images
docker rmi $(docker images -q docker-compose*)

# Start fresh
docker-compose up --build -d
```

---

## Project Structure

```
docker-compose/
├── .env                      # Environment variables (create this)
├── .env.example              # Example environment file (optional)
├── .gitignore               # Git ignore file
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile               # Docker image build instructions
├── package.json             # Node.js dependencies
├── package-lock.json        # Locked dependency versions
├── index.js                 # Main application file
├── src/
│   └── model/
│       └── user.model.js    # Mongoose user model
├── DockerContribute.md      # Docker commands guide
├── Docker-composeContribute.md  # Docker Compose guide
└── GithubContribute.md      # This file
```

---

## Git Workflow Tips

### Update Your Local Copy

```bash
# Fetch latest changes
git pull origin main
```

**After pulling changes:**
```bash
# Rebuild and restart
docker-compose up --build -d
```

---

### Check Current Branch

```bash
git branch
```

---

### Switch to Different Branch

```bash
git checkout <branch-name>

# Rebuild after switching
docker-compose up --build -d
```

---

### View Commit History

```bash
git log --oneline
```

---

## Environment Variables Explained

### .env File (Local Development)

```env
Mongodb_url=mongodb://localhost:27017/docker-composs
```

**Used when:**
- Running Node.js directly: `node index.js`
- Not using Docker Compose

---

### docker-compose.yml (Containerized)

```yaml
environment:
  Mongodb_url: mongodb://mongo3:27017/user_db
```

**Used when:**
- Running with Docker Compose
- **Overrides** `.env` file
- Uses service name `mongo3` instead of `localhost`

---

## Additional Commands

### Access MongoDB Shell

```bash
docker-compose exec mongo3 mongosh
```

**Inside MongoDB shell:**
```javascript
// Show databases
show dbs

// Use database
use user_db

// Show collections
show collections

// Find all users
db.users.find()

// Exit
exit
```

---

### Access Application Container Shell

```bash
docker-compose exec user_app sh
```

**Inside container:**
```bash
# List files
ls -la

# Check environment variables
env | grep Mongodb_url

# Exit
exit
```

---

### View Container Resource Usage

```bash
docker-compose stats
```

---

## Summary

**To clone and start the project:**

1. **Clone:** `git clone <repo-url>`
2. **Enter directory:** `cd docker-compose`
3. **Create .env:** `echo "Mongodb_url=mongodb://localhost:27017/docker-composs" > .env`
4. **Start:** `docker-compose up -d`
5. **Test:** `curl http://localhost:3001`
6. **Stop:** `docker-compose down`

**Key files to check:**
- ✅ `.env` exists (create if missing)
- ✅ `docker-compose.yml` exists (should be in repo)
- ✅ `Dockerfile` exists (should be in repo)
- ✅ `package.json` exists (should be in repo)

**Common commands:**
```bash
docker-compose up -d         # Start
docker-compose down          # Stop
docker-compose logs -f       # View logs
docker-compose ps            # Check status
docker-compose restart       # Restart
docker-compose up --build -d # Rebuild and start
```

---

## Getting Help

If you encounter issues:

1. **Check logs:** `docker-compose logs -f`
2. **Verify services are running:** `docker-compose ps`
3. **Check Docker daemon:** `docker ps`
4. **Read error messages carefully**
5. **Refer to documentation:**
   - `DockerContribute.md`
   - `Docker-composeContribute.md`
   - `GithubContribute.md` (this file)

---

## Next Steps

After successfully running the application:

1. **Explore the API:**
   - GET `/` - Home endpoint
   - GET `/users` - List all users
   
2. **Add more endpoints** (see `index.js`)

3. **Connect with a frontend** application

4. **Add more services** to `docker-compose.yml`

5. **Learn more about Docker Compose:**
   - Volumes for data persistence
   - Health checks
   - Service scaling
   - Environment-specific configs

Happy coding! 🚀
