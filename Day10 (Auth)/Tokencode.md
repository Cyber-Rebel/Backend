
    // -- JWT --
    // jwt key me 2 paramete jwt_secreate hota jo .env me dalna hota hae  jwt me hamesha dyan rakna uase ek to  unquick infromation honi chaiye
    //  most of time ham save karte hae mongodbId(objectid) save karte hae and // register and login ke wakt ham jwt token ko create karte hae dono time
    const token = jwt.sign(
        {
        id: response.id,
        },"bookhavebrain");

    res.json({
        res: response,
        token,
    });
    

 let decode = jwt.verify(token ,"bookhavebrain") // decode me ek object hoga hamesha
console.log(decode.id) // ese me kya hota hae default jab jwt hamne create karte waqk jo data diya tha use agar jwt.veriya me sahi huava to  decode me jwt ko create jo data diya wo mil jata hae 
// decode ek object return karna hae age succesfully verfiy huwa to ek iat naam ek property defalut me aati hae ese me {'id':'','iat':''}
// decode agar data galat huwa to error thow karta hae 

# JWT Token Creation and Verification in Node.js

This document explains how to **create and verify JWT tokens** using `jsonwebtoken` in Node.js.

---

## **1. Creating a JWT Token**
We use `jwt.sign()` to create a token when a user registers or logs in.

### **Code Example:**
```javascript
// -- JWT Token Creation --
// jwt.sign(payload, secretKey, options)

const token = jwt.sign(
  {
    id: response.id, // usually MongoDB ObjectId or unique user identifier
  },
  "bookhavebrain", // secret key (should be stored in .env in production)
  { expiresIn: "1h" } // optional: token expiry time
);

res.json({
  user: response,
  token,
});
```

### **Example Token Payload:**
If the token is decoded later, it will contain:
```json
{
  "id": "66a889fb8fabc12232e1d123",
  "iat": 1722332233,  // Issued at (timestamp)
  "exp": 1722335833   // Expiry (if expiresIn is used)
}
```

---

## **2. Verifying a JWT Token**
We use `jwt.verify()` to check if a token is valid.

### **Code Example:**
```javascript
try {
  const decode = jwt.verify(token, "bookhavebrain"); // verify token using same secret
  console.log(decode.id); // Access the user ID from decoded token

  // decode is always an object containing the original payload + 'iat' (and 'exp' if expiry used)
  // Example: { id: '66a889fb8fabc12232e1d123', iat: 1722332233 }

} catch (error) {
  console.log("Invalid token:", error.message);
  res.status(401).json({ message: "Invalid or expired token" });
}
```

---

## **3. Example Flow**
1. **Registration/Login:**
   - User registers or logs in.
   - Server generates JWT using `jwt.sign()` and sends it to the client.

2. **Client Stores Token:**
   - Token is stored in browser (localStorage or cookies).

3. **Protected Routes:**
   - Client sends token in request (usually in `Authorization` header).
   - Server verifies token using `jwt.verify()`.

---

## **4. Complete Example**
```javascript
// Create Token
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

// Verify Token
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded:", decoded); // { id: '...', iat: ..., exp: ... }
} catch (err) {
  console.error("Token invalid or expired:", err.message);
}
```

---

## **Key Points**
- Always store `JWT_SECRET` in `.env` for security.
- `iat` = issued at (timestamp).
- `exp` = expiry timestamp (if `expiresIn` is set).
- If token is tampered or expired, `jwt.verify()` throws an error.

---