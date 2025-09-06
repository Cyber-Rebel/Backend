Good question 👍

In **Pinecone**, **metadata** is extra information (key–value pairs) that you attach to a vector when storing it in the index.

Think of it like a **tag or label** for your data, which doesn’t affect the vector math (similarity search), but helps you filter or organize results.

---

### Example:

Suppose you’re storing document embeddings:

```json
{
  "id": "doc1",
  "values": [0.12, -0.84, 0.33, ...], 
  "metadata": {
    "author": "Alice",
    "category": "technology",
    "date": "2025-08-01"
  }
}
```

Here:

* `"values"` = vector representation of the document.
* `"metadata"` = extra info like author, category, date.

---

### Why use metadata?

1. **Filtering** → You can restrict searches to only vectors matching certain metadata.
   Example: "find similar documents but only where `category = technology`".

2. **Storing context** → Metadata keeps track of information like:

   * Document ID
   * Source (website, PDF, database)
   * Author / user ID
   * Timestamps

3. **Improving queries** → When you query Pinecone, you can apply filters using metadata so results are **relevant + specific**.

---

### Query with metadata filter (JS example)

```js
const queryRequest = {
  vector: [0.15, -0.67, 0.89, ...],  // query vector
  topK: 5,                           // number of results
  filter: {
    category: "technology",          // only return vectors with this metadata
    author: { "$in": ["Alice", "Bob"] }
  }
};

const result = await index.query(queryRequest);
```

This will only return the **top 5 most similar vectors** where `category = technology` and author is either Alice or Bob.

---

👉 In short: **metadata = descriptive labels for vectors, used mainly for filtering and adding context.**

Do you want me to also show you **all the supported filter operators** (`$in`, `$eq`, `$gte`, etc.) that Pinecone allows inside metadata queries?
