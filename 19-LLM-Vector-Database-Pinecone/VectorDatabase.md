# This a lot of Database Mongodb 
Bahut accha sawal hai 👌

**AI ko text aur vector dono samajhne ka tarika alag hota hai:**

### 1. Text (Words, Sentences, Paragraphs)

* Human language hota hai.
* AI models directly "text" ko waise samajh nahi paate jaise insaan samajhta hai.
* Isiliye AI text ko **vector (embedding)** me convert karta hai.

---

### 2. Vector (Numbers ka Representation)

* Ye ek **mathematical form** hai jisme har text ka ek “point” hota hai high-dimensional space me (jaise tumne bheja lamba list of floats).
* AI vector ko easily samajhta hai kyunki:

  * Numbers pe maths lagana easy hai.
  * Vectors ko compare karke dekhta hai ki do texts **similar** hain ya **different**.

---

### Example:

* Text A: `"I love pizza 🍕"`
* Text B: `"Pizza is my favorite food"`

👉 Inka vector (embedding) banega. AI un vectors ka **cosine similarity** nikal kar samjhega ki dono ka matlab ek jaisa hai.

---

🔑 **Simple samajh lo:**

* **Text** insaan ke liye.
* **Vector** AI ke liye.
* AI hamesha text ko vector me convert karke uska meaning samajhta hai.

---

Kya main tumhare bheje hue vector ko check karke ek **approximate idea** bataun ki wo text positive, negative ya kis type ka lag raha hai (sentiment / topic)?
