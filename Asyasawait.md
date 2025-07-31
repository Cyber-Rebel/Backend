Here’s the **`await-try-catch.md`** file:

---
<!-- asya await ek saat try catch jaruri hota hae kyu ki await me respoce ata hae error nahi and to error ka kam caht karta hae  -->
````markdown
# 🔥 Why Use `try-catch` with `await` in JavaScript?

## 1️⃣ What does `await` do?
- `await` waits for a **Promise** to resolve or reject.
- If the Promise **resolves**, it returns the value.
- If the Promise **rejects (error occurs)**, it **throws an exception**.

```javascript
const data = await somePromise(); // If rejected, it throws an error
````

---

## 2️⃣ How to handle errors?

If you're using `await` and an error occurs, it will **throw an error**.
To handle this properly, you must use **`try-catch`**.

### ✅ Example with `try-catch`

```javascript
try {
  const user = await UserModel.findById("invalid_id");
  console.log(user);
} catch (error) {
  console.error("Error fetching user:", error.message);
}
```

---

## 3️⃣ What if `try-catch` is not used?

* If an error occurs and there's **no `try-catch`**, it becomes **unhandled**.
* In Node.js, this causes an **UnhandledPromiseRejection** warning.
* In some cases, it may even **crash your server**.

---

## 4️⃣ Alternative: Using `.catch()`

Instead of `try-catch`, you can use **`.catch()`** directly on the Promise.

```javascript
await UserModel.findById("invalid_id")
  .then(user => console.log(user))
  .catch(err => console.log("Error:", err.message));
```

✅ `.catch()` works but is **less clean** when you have multiple `await` calls.

---

## 5️⃣ Multiple `await` with a single `try-catch`

When multiple async calls are needed, wrap them in one `try-catch`:

```javascript
try {
  const user = await UserModel.findById("12345");
  const posts = await PostModel.find({ userId: user._id });
  const comments = await CommentModel.find({ postId: posts[0]._id });

  console.log({ user, posts, comments });
} catch (error) {
  console.error("Something went wrong:", error.message);
}
```

---

## 🔥 Conclusion:

✅ Always use `try-catch` with `await` to prevent unhandled errors.
✅ `try-catch` is cleaner for multiple awaits.
✅ `.catch()` is fine for single promises but not ideal for complex logic.
✅ Best Practice: Use **`try-catch` in async/await functions**.

---

```

---

Would you like me to also add **`asyncHandler` middleware (common in Express.js)** to **automatically handle try-catch**?
```
