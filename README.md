# Node Backend Projects Cohort

This repository contains multiple backend projects
ranging from basic to advanced level.

## Categories
- Basic: Node.js & Express fundamentals
- Intermediate: JWT, Socket.IO, MongoDB
- Advanced: AI, LLMs, Realtime apps

## Tech Stack
Node.js, Express, MongoDB, Docker, GitHub Actions

# Backend Learning Repo

This repository is a collection of Node.js / backend learning projects and notes used for teaching and experimentation. Each numbered folder contains a small focused example (server, authentication, file upload, sockets, AI integrations, etc.). Use the Quick Start below to run any example locally.

**Overview**
- **Purpose**: A hands-on collection of backend examples and notes for learning Node.js, Express, MongoDB, Socket.IO, JWT, and AI integrations.
- **Audience**: Students, learners, and engineers exploring backend patterns and small demos.

**Project Structure (high level)**
- **`01-NodeJS-Basics-Modules-Packages/`**: Node.js basics and modules examples.
- **`02-Express-Server-Setup/`**: Minimal Express server setup and routing.
- **`03-Notes-App-REST-API-Methods/`**: CRUD REST API patterns for a notes app.
- **`04-MongoDB-Mongoose-Connection/`**, **`05-MongoDB-CRUD-Operations/`**: Mongoose connection and CRUD examples.
- **`06-Dotenv-File-Upload-Basics/`**, **`07-Cloud-File-Upload-ImageKit-Multer/`**: File upload examples using `multer` and cloud integrations.
- **`08-Middleware-Basics-JWT/`** to **`11-Mongoose-Validation-Password-Hashing/`**: Middleware, JWT auth, password hashing, and validation examples.
- **`12-AI-Integration-Google-GenAI/`**, **`18-GPT-Clone-Full-Stack/`**, **`19-LLM-Vector-Database-Pinecone/`**: Examples integrating AI/LLMs and vector DBs.
- **`13-SocketIO-Realtime-Basics/`**, **`14-SocketIO-AI-Chat/`**, **`15-AI-Chat-Memory-History/`**, **`17-SocketIO-Events-Messaging/`**: Socket.IO realtime examples and chat demos.
- **`16-EJS-Templating-SSR/`**: Server-side rendering with EJS templates.
- Other folders: misc notes, Docker examples, and utilities (see file and folder list in the workspace).

**Requirements**
- **Node.js**: v14+ recommended (v16+ preferred).
- **npm** or **yarn** installed.
- For MongoDB examples: a running MongoDB instance or a connection string (Atlas or local).
- For AI integrations: relevant API keys (see each example's README or source file).

**Quick Start**
1. Pick an example folder, for instance `01-NodeJS-Basics-Modules-Packages`.
2. Install dependencies and run the example:

```bash
cd 01-NodeJS-Basics-Modules-Packages
npm install
node index.js
```

3. For Express/Mongo examples, add a `.env` with the required values (e.g., `MONGO_URI`) or edit `src`/server files to provide your connection string.

Example: run the Express server in `02-Express-Server-Setup`

```bash
cd 02-Express-Server-Setup
npm install
node index.js
```

**Notes & Conventions**
- Many folders contain a `Read.md` or `Read.tex` describing learning objectives; check those for specifics.
- Some examples use different filenames (`Server.js`, `server.js`, or `index.js`) — open the folder to see the entrypoint.
- If an example requires environment variables, look for `.env` usage or `dotenv` in the `package.json`/source.

**Contributing / Learning Tips**
- Use each folder as a sandbox — feel free to modify and experiment.
- If you add a new example, include a short `Read.md` and a `package.json` with a `start` script.

**Contact / Author**
- Repository maintained by the workspace owner. Use local notes in the workspace for more context.

Enjoy exploring the backend examples — try the Socket.IO and AI folders for interactive demos.
