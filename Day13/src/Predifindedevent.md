In **Socket.IO**, there are some **pre-defined (built-in) events** that are already available for you to use — you don’t need to create them manually.

Here’s the list of commonly used **pre-defined events**:

---

### **Server-side (`io` or `socket`) events**

| Event                                  | Description                                                        |
| -------------------------------------- | ------------------------------------------------------------------ |
| **`connection`**                       | Fired when a new client connects to the server.                    |
| **`disconnect`**                       | Fired when a client disconnects from the server.                   |
| **`disconnecting`**                    | Fired right before a client is about to disconnect.                |
| **`error`**                            | Fired when an error occurs in the socket connection.               |
| **`connect_error`**                    | Fired when the client fails to connect.                            |
| **`connect_timeout`**                  | Fired when connection times out.                                   |
| **`reconnect`** *(client side mostly)* | Fired when the client successfully reconnects.                     |
| **`reconnect_attempt`**                | Fired before each reconnection attempt.                            |
| **`reconnect_error`**                  | Fired when a reconnection attempt fails.                           |
| **`reconnect_failed`**                 | Fired when all reconnection attempts fail.                         |
| **`ping`**                             | Fired when the server sends a ping packet to test latency.         |
| **`pong`**                             | Fired when the server receives a pong packet back from the client. |

---

### **Example Usage**

```javascript
// server.js
const { Server } = require("socket.io");
const io = new Server(3000);

io.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id);

    socket.on("disconnect", (reason) => {
        console.log(`❌ User disconnected (${socket.id}):`, reason);
    });

    socket.on("disconnecting", () => {
        console.log(`⚠️ User is disconnecting: ${socket.id}`);
    });

    socket.on("error", (err) => {
        console.log("❗ Socket error:", err);
    });
});
```

---

If you want, I can also give you a **full list including client-side-only predefined events** with explanations.
Do you want that?


# Prebuild Event 
io.on("connection", (socket) => {
  console.log('A user are conneted id is ',socket.id)
  socket.on('disconnect',()=>{
    console.log('A user disconnectd here')
  })

});


