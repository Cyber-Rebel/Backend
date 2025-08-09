const app = require('./src/index.js')
const { createServer } = require("http");
const { Server } = require("socket.io");
 
const httpServer = createServer(app);  // Create HTTP server using the Express app
// Initialize Socket.IO server
const io = new Server(httpServer, { /* options */ });

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log('A user are conneted  ',socket.id)
  socket.on('message',(message)=>{ // ground chat types 
    console.log(' message here ',message , socket.id)
  })

});



httpServer.listen(3000,()=>{
    console.log('server 3000')
})





// # Prebuild Event 
// io.on("connection", (socket) => {
//   console.log('A user are conneted id is ',socket.id)
//   socket.on('disconnect',()=>{
//     console.log('A user disconnectd here')
//   })

// });


// host of time sara code io.connect me jata hae  me jata hae 




