
# Middleware in Node.js (Express.js)

## 📌 What is Middleware?
Middleware is a function in Node.js (especially Express.js) that has access to the request (`req`), response (`res`), and the `next` middleware in the application's request-response cycle.

It can:
- Execute code.
- Modify request and response objects.
- End the request-response cycle.
- Call the `next()` middleware.

---

## 🏷️ Types of Middleware

### 1️⃣ Application-level Middleware
- Bound to an **Express app instance**.
- Runs for every request or specific routes.

```javascript
app.use((req, res, next) => {
  console.log('Application Middleware');
  next();
});
```

---

### 2️⃣ Router-level Middleware
- Bound to an **Express Router instance**.
- Works only for routes defined in that router.

```javascript
const router = express.Router();
router.use((req, res, next) => {
  console.log('Router Middleware');
  next();
});
```

---

### 3️⃣ Built-in Middleware
- Comes with Express out of the box.
- Examples:
  - `express.json()` → Parse JSON request bodies.
  - `express.urlencoded()` → Parse form submissions.
  - `express.static()` → Serve static files.

```javascript
app.use(express.json());
app.use(express.static('public'));
```

---

### 4️⃣ Third-party Middleware
- Installed using npm packages.
- Examples:
  - `morgan` → HTTP request logger.
  - `cors` → Enable Cross-Origin Resource Sharing.
  - `helmet` → Secure HTTP headers.

```javascript
app.use(morgan('dev'));
app.use(cors());
```

---

### 5️⃣ Error-handling Middleware
- Special middleware with **4 arguments** `(err, req, res, next)`.
- Handles application errors.

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

---

### 6️⃣ Custom Middleware (Example: Authentication)
You can create your own middleware for tasks like authentication, logging, or rate limiting.

```javascript
function authMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }
  next();
}

app.use('/dashboard', authMiddleware, (req, res) => {
  res.send('Welcome to Dashboard');
});
```

---

## 🔥 Key Points:
- Middleware executes **in the order defined**.
- Can **modify req/res objects**.
- Must call `next()` unless ending the request-response cycle.

---
