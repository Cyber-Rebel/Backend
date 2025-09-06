
```js
const chatHistory = (
  await Message.find({ chat: messagepayload.chat })
    .sort({ createdAt: -1 }) // naya → purana (descending)
    .limit(10) // sirf 10 messages
    .lean() // sirf plain JS object, Mongoose ka extra methods (save, validate, etc.) nahi milenge
).reverse(); // order ko ulta kar diya (purana → naya)
```

### Step by Step:

1. **`Message.find({ chat: messagepayload.chat })`**
   → Ye query sirf us chat ke messages nikal rahi hai.

2. **`.sort({ createdAt: -1 })`**
   → Latest (sabse naya) message sabse pehle aayega.

3. **`.limit(10)`**
   → Sirf 10 messages fetch honge.

4. **`.lean()`**
   → Lean ka matlab plain JavaScript object return karna.

   * Normal `find()` ek Mongoose document deta hai jisme methods (save, validate, isModified, etc.) hote hain.
   * `lean()` fast hota hai kyunki sirf raw MongoDB data deta hai, methods nahi.

   ⚠️ Iska nuksaan ye hai ki agar tumhe doc methods chahiye (jaise `.save()`), wo kaam nahi karega. Sirf wohi fields milenge jo schema me define hain.

5. **`.reverse()`**
   → Jab tum sort karte ho `{ createdAt: -1 }` to naya message sabse pehle aata hai.
   Lekin agar UI me purane → naye order chahiye to `.reverse()` karke ulta kar dete ho.

---

### Example Output (maan lo DB me 3 messages hain):

DB me:

```
[
 { text: "Hello", createdAt: 2023-08-20 },
 { text: "Kaise ho?", createdAt: 2023-08-21 },
 { text: "Theek hu", createdAt: 2023-08-22 }
]
```

Query ke baad (sort -1, limit 2, lean):

```
[
 { text: "Theek hu", createdAt: 2023-08-22 },
 { text: "Kaise ho?", createdAt: 2023-08-21 }
]
```

`.reverse()` ke baad:

```
[
 { text: "Kaise ho?", createdAt: 2023-08-21 },
 { text: "Theek hu", createdAt: 2023-08-22 }
]
```

---

👉 Tumne jo likha *"lean object id vagre kuch nahi ata srif ata hae jo schema me wahi sirf"* — bilkul sahi.
Lean me mongoose ke **virtuals, getters/setters, instance methods, default functions** sab skip ho jate hain. Sirf MongoDB ka actual document return hota hai.

---

🔑 **Fayda**:

* Fast queries (30-40% faster).
* Memory kam use hota hai.
* Sirf plain data milta hai (API response ke liye best).

❌ **Nuksaan**:

* Document methods nahi hote.
* Middleware hooks (`pre`, `post`) fire nahi hote.
* Default setters/virtuals apply nahi hote.

---

Kya chahte ho mai ek baar **without `.lean()` vs with `.lean()` output ka actual code example** bana kar dikhaun?
