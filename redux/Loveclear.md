// 👉 Show = useSelector
// 👉 Change = dispatch
```js
datachange: (state, action) => {
   // yaha state aur action milta hai
}
```

isme `state` aur `action` ka kaam alag-alag hai. Chalo detail me dekhte hain 👇

---

### 1. `state` kya hota hai?

* Ye hamesha tumhare **slice ka current state** hota hai.
* Matlab reducer ke andar jo tumne `initialState` banaya tha, wahi data yaha hota hai (aur future me update hone ke baad ka bhi).

👉 Example:

```js
const initialState = {
  isAuthration: false,
  token: null,
  username: ""
}
```

Jab reducer chalega, `state` me hamesha ye object hoga.
Tum ise directly modify kar sakte ho (kyunki Redux Toolkit under the hood **Immer** use karta hai).

---

### 2. `action` kya hota hai?

* Ye ek **object** hota hai jisme do cheezein hoti hain:

  * `action.type` → kaunsa action dispatch ( Change = dispatch matlba dta chnage karte wakt) hua hai (eg: `"couter/datachange"`)
  * `action.payload` → jo data tum dispatch karte waqt bhejte ho

👉 Example:

```js
dispatch(datachange({
  token: "abc123",
  username: "cyber"
}))
```

Tab reducer ke andar:

```js
datachange: (state, action) => {
  console.log(action.type)    // "couter/datachange"
  console.log(action.payload) // { token: "abc123", username: "cyber" }
}
```

---

### 3. Dono ko mila kar kaise use karte?

```js
datachange: (state, action) => {
  // state = current slice ka data
  // action.payload = dispatch se bheja hua new data

  state.isAuthration = true
  state.token = action.payload.token
  state.username = action.payload.username
}
```

---

### 4. Visual Samajh lo 👇

* **Pehle state** (initialState se):

```js
{
  isAuthration: false,
  token: null,
  username: ""
}
```

* **Dispatch hua**:

```js
dispatch(datachange({
  token: "xyz999",
  username: "cyber"
}))
```

* **Reducer me mila**:

```js
state = {
  isAuthration: false,
  token: null,
  username: ""
}

action = {
  type: "couter/datachange",
  payload: { token: "xyz999", username: "cyber" }
}
```

* **Reducer ke baad naya state**:

```js
{
  isAuthration: true,
  token: "xyz999",
  username: "cyber"
}
```

---

👉 Short me:

* **state** = purana data jo slice me hai
* **action.payload** = naya data jo dispatch ke saath bheja

---

Kya tum chahte ho main ek **console.log demo code** likh du jisme tum button click kar ke `state` aur `action` dono print hote dekho?
