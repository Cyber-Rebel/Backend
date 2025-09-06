


The `.lean()` method is **specific to Mongoose** (not raw MongoDB).

### 🔹 What is `.lean()` in Mongoose?

When you query MongoDB using Mongoose (e.g., `Model.find()`), by default it returns **Mongoose Documents**, which are full Mongoose objects with methods like `.save()`, `.validate()`, virtuals, getters/setters, etc.

Sometimes you don’t need those extra features — you just want plain JavaScript objects.
That’s where `.lean()` comes in.

```js
const users = await User.find().lean();
```

* Without `.lean()`:
  Returns **Mongoose Documents** (heavy objects).
* With `.lean()`:
  Returns **plain JavaScript objects** (lighter, faster).

---

### 🔹 Why use `.lean()`?

✅ Performance boost (less overhead since no document wrapping).
✅ Faster read queries, especially when retrieving large data sets.
✅ Useful when you only need to read, not modify or save back.

---

### 🔹 Example

```js
// Normal query (Mongoose document)
const user = await User.findOne({ email: "test@example.com" });
console.log(user instanceof mongoose.Document); // true
console.log(user.save); // function exists

// Lean query (plain JS object)
const leanUser = await User.findOne({ email: "test@example.com" }).lean();
console.log(leanUser instanceof mongoose.Document); // false
console.log(leanUser.save); // undefined
```

---

### ⚠️ Caveats of `.lean()`

* No Mongoose methods (`save`, `validate`, etc.).
* No middleware (hooks) are applied.
* No virtuals (unless you explicitly enable them).

---

👉 In your error earlier (`.lean(...).reverse is not a function`), the issue was:
`.lean()` returns a **Query object**, not an array. You can’t directly call `.reverse()` on it.

✅ Fix: Add `.exec()` or `await` before calling `.reverse()`

Example:

```js
const messages = await Message.find({ roomId })
  .sort({ createdAt: -1 })
  .limit(20)
  .lean();

const reversed = messages.reverse(); // works now, since it's an array
```



## 🔹 Example Mongoose Schema

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// A virtual property
userSchema.virtual("isAdult").get(function () {
  return this.age >= 18;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
```

---

## 🔹 Example Documents in DB

Suppose MongoDB has this data in `users` collection:

```json
[
  { "_id": "1", "name": "Alice", "email": "alice@test.com", "age": 22 },
  { "_id": "2", "name": "Bob", "email": "bob@test.com", "age": 15 }
]
```

---

## 🔹 Without `.lean()`

```js
const user = await User.findOne({ name: "Alice" }); 
console.log(user);
console.log(user.isAdult);   // Virtual works
console.log(user.save);      // Mongoose method exists
```

### ✅ Response (Mongoose Document)

```js
{
  _id: new ObjectId("1"),
  name: 'Alice',
  email: 'alice@test.com',
  age: 22,
  __v: 0,
  isAdult: true   // virtual property is available
}
```

Notice:

* `isAdult` works
* `user.save()` exists
* Object is a **Mongoose Document**

---

## 🔹 With `.lean()`

```js
const leanUser = await User.findOne({ name: "Alice" }).lean();
console.log(leanUser);
console.log(leanUser.isAdult);   // Virtual won't work
console.log(leanUser.save);      // No save method
```

### ✅ Response (Plain JS Object)

```js
{
  _id: new ObjectId("1"),
  name: 'Alice',
  email: 'alice@test.com',
  age: 22,
  __v: 0
}
```

Notice:

* It’s a **plain JavaScript object**
* `isAdult` is **undefined** (virtual doesn’t work)
* No `save` method

---

## 🔹 Performance Example

```js
console.time("normal");
await User.find();   // Without lean
console.timeEnd("normal");

console.time("lean");
await User.find().lean();   // With lean
console.timeEnd("lean");
```

👉 With **large datasets**, `.lean()` is much faster because it skips creating full Mongoose documents.

---

✅ **Rule of Thumb**:

* Use **`.lean()`** for read-only queries (like sending JSON in APIs).
* Don’t use `.lean()` if you need **Mongoose features** like:

  * Virtuals
  * Middleware/hooks
  * Methods (`save()`, `validate()`, etc.)
Bahut sahi sawaal 🙌
Lagta hai tum soch rahe ho:
**"Agar `.lean()` me `id`, `virtuals`, `methods`, `save()` wagere sab nahi aata, to phir iska fayda hi kya hai?"**

👉 Answer: `.lean()` ka **main fayda performance aur simplicity** hai.

---

## 🔹 Fayde of `.lean()`

### 1. **Performance (Speed Boost ⚡)**

Normal query → har result ek **Mongoose Document** banta hai.
Mongoose ko internally bohot kaam karna padta hai: getters, setters, middleware attach karna, methods bind karna.

`.lean()` query → direct **raw JS object** deta hai jo MongoDB se aaya hai.
👉 Matlab fast, kam memory use karta hai.

**Example**:

```js
console.time("normal");
await User.find(); // without lean
console.timeEnd("normal");

console.time("lean");
await User.find().lean(); // with lean
console.timeEnd("lean");
```

🔹 Agar 10,000 records fetch karoge, `.lean()` 2x–5x faster ho sakta hai.

---

### 2. **API Responses (Read-only data)**

Aksar API me hum bas data nikal kar **JSON response** bhejte hain,
usme `.save()` ya `validate()` ki zaroorat hi nahi hoti.

```js
// ✅ Perfect use case for lean
app.get("/users", async (req, res) => {
  const users = await User.find().lean();
  res.json(users); // directly plain JS objects bhej diye
});
```

---

### 3. **Memory Saving**

Bade data sets me Mongoose Documents memory heavy hote hain.
Lean objects → lightweight plain JS objects.

---

### 4. **Predictable Raw Output**

Kabhi kabhi tumhe sirf wahi data chahiye jo DB me **exact stored** hai (no virtuals, no extra sugar).
👉 `.lean()` se tumhe wohi milega jo MongoDB me hai.

---

## 🔹 Kab Use Karna Chahiye?

✅ Use `.lean()` jab:

* Sirf read-only queries hain (like listing products, users).
* API response bhejna hai.
* Large datasets fetch karne hain → speed chahiye.
* Tumhe Mongoose ke methods/virtuals ki zaroorat nahi hai.

❌ Don’t use `.lean()` jab:

* Tumhe `.save()` ya `.validate()` karna hai.
* Tum virtuals pe dependent ho (e.g., `fullName` virtual).
* Middleware/transformations automatically chahiye.

---

## 🔹 TL;DR

`.lean()` ka fayda hai **performance aur raw, lightweight data**.
Tumhe bas wahi milega jo DB me hai → fast, simple, memory-friendly.

---

👉 Tumhare project me mostly socket/chat messages aa rahe the.
Waha `.lean()` best hai, kyunki tum bas messages nikal kar bhejna chahte ho (read-only).
Isliye log chat apps me `.lean()` use karte hain.

---

Kya tum chahte ho mai ek **benchmark demo code** likh du jisme `.lean()` aur normal query ka time difference dikhe?
