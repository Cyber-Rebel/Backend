# 🔒 Why We Don't Store Passwords in Plain Text

Storing passwords in plain text is **extremely dangerous** and violates basic security principles.  

---

## 🚩 Risks of Storing Plain Text Passwords

1. **Data Breaches**
   - If the database is hacked, all user passwords are instantly exposed.
   - Users often reuse passwords across sites, leading to **credential stuffing attacks**.

2. **Legal & Compliance Issues**
   - Regulations like **GDPR**, **HIPAA**, and **PCI-DSS** prohibit storing sensitive data in plain text.
   - Violations can result in **fines, lawsuits, and bans**.

3. **Insider Threats**
   - Developers, DB admins, or anyone with DB access could misuse plain text passwords.

4. **Loss of Trust**
   - Companies discovered storing passwords in plain text suffer **reputation damage**.

---

## ✅ The Correct Approach

Instead of plain text, passwords should be stored using:

- **Hashing** (one-way encryption)
- **Salting** (adds randomness to prevent attacks)

### Recommended Algorithms:
- `bcrypt`
- `scrypt`
- `Argon2` (modern & most secure)

---

## 🔐 How It Works
1. User enters a password.
2. Server **hashes** the password (with a random salt).
3. The **hash is stored** in the database (not the password itself).
4. During login, the entered password is hashed again and compared with the stored hash.

---

## 🛠 Example in Node.js (bcrypt)

```javascript
import bcrypt from 'bcrypt';

// Hashing
const password = "mySecret123";
const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

console.log(hashedPassword); // Stored in DB

// Verifying
const isMatch = await bcrypt.compare("mySecret123", hashedPassword);
console.log(isMatch); // true if password is correct
