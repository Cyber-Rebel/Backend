<!-- # mongoose validation ../user:{ -->
<!-- #    types:"strings", -->
<!-- #   reauaire:true // agar ducaliate huva to ek error ayega ki dublicapte key find esa  kuch to try cathc use karmae ese error hoga to user frontemm show hoga 
# }
# password Hashing 

# producted routes kya hote hae and ese use karte hae and implemted kase karte hae  as Middllware

# header se password extraction karna baki hae 

# controller ese use karna hae 

# basic Auth conver in DAY 11 

# Mongoose Validation -->
<!-- #image ko jwt token ko jwt ke website me jakar use dalo apko apka data show hoga -->

**Validation in Mongoose** is a **critical feature** that ensures the **integrity and accuracy** of the data stored in a MongoDB database.

By using validation, developers can enforce **rules and constraints** on their schemas, **preventing invalid data** from being saved.

---

## 🔍 Simple Explanation

1. **Schema ke rules ke hisaab se data check hota hai**
2. Agar **galat data hai** → ❌ **error aata hai** aur **data save nahi hota**
3. Ye validation **automatically save karne se pehle run hota hai**
4. **Update** operations me validation chahiye to `{ runValidators: true }` lagana padta hai
5. Hum **built-in validators** ya **custom rules** dono bana sakte hain

---

## ✅ Built-in Validators (Examples)

- `required: true` → Field must be filled
- `minlength: 3` → Minimum 3 characters
- `maxlength: 10` → Max 10 characters
- `match: /regex/` → Must match pattern
- `min: 1` and `max: 100` → For numbers
- `enum: ['admin', 'user']` → Only specific values

---

## 🛠 Code Example

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18 }
});

const User = mongoose.model('User', userSchema);

const user = new User({ age: 15 }); // Invalid: name missing, age < 18

user.save()
  .then(() => console.log('User saved'))
  .catch(err => console.log('Validation Error:', err.message));

