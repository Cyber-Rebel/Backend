
const { Server } = require("socket.io");

const socketserver = (httpserver)=>{
const io = new Server(httpserver, { /* options */ });

io.on("connection", (socket) => {
  // ...
  console.log('A user connected')
});

}

module.exports= socketserver