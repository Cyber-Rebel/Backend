
# 🔒 Password Security with bcrypt

`bcrypt` is a secure password hashing library used to store and verify passwords safely in databases.

---

## 🚩 Why Not Store Plain Text Passwords?
- If the database is hacked, **all passwords are exposed**.
- Users often reuse passwords → **credential stuffing attacks**.
- Violates **security standards (GDPR, HIPAA, PCI-DSS)**.
- Leads to **loss of trust and reputation damage**.

---

## ✅ Why Use bcrypt?
- **One-way hashing** → Cannot retrieve the original password from hash.
- **Built-in salting** → Prevents rainbow table attacks.
- **Adjustable cost factor** → Makes brute-force attacks harder.
- Widely used and well-tested.

---

## 🛠 Installation
```bash
npm install bcrypt
```

---

## 🔑 Hashing a Password
```javascript
import bcrypt from 'bcrypt';

const password = "mySecret123";

// Generate a hash with 10 salt rounds
const hashedPassword = await bcrypt.hash(password, 10);

console.log("Hashed Password:", hashedPassword);
// Example output: $2b$10$uWcq5jvVRa8Zhty7q8m3wuex2M4R1eqgrbODXwz.uIcF1lFFN6jla
```

---

## 🔍 Verifying a Password
```javascript
const isMatch = await bcrypt.compare("mySecret123", hashedPassword);

if (isMatch) {
  console.log("✅ Password is correct!");
} else {
  console.log("❌ Incorrect password!");
}
```

---

## 🔄 How bcrypt Works (Flow)
```plaintext
[User Enters Password]
          |
          v
  [bcrypt generates salt] 
          |
          v
[Password + Salt -> bcrypt algorithm]
          |
          v
 [Hash Stored in Database]

During Login:
[Entered Password + Same Salt -> bcrypt hash]
          |
          v
 [Compare with Stored Hash]
```

---

## 🎯 Best Practices
- Use **10–12 salt rounds** (default is 10).
- Never store plain text passwords.
- Always hash before saving to the database.
- Use environment variables for sensitive configs.

---

## 🔐 Conclusion
> **Always use bcrypt for password storage** to prevent leaks and secure user data.
