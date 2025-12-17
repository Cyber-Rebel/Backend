const app = require('./src/index.js')
const { createServer } = require("http");
const { Server } = require("socket.io");
const { generateResponce } = require('./src/services/ai.services.js');
 
const httpServer = createServer(app);  // Create HTTP server using the Express app
// Initialize Socket.IO server
const io = new Server(httpServer, { /* options */ });

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log('A user are conneted')
  socket.on('disconnect',()=>{ // ground chat types 
    console.log('A user discorrected ')
  })

  socket.on('ai-message',async(jsondata)=>{  // Ther is listen socket.on('ai-message',()=>{}) on server fire by clint
    console.log(jsondata.prompt)
 const response = await generateResponce(jsondata.prompt)
 console.log('Ai Reponcse' ,response)
 socket.emit('ai-message-repsonce',{AIAnswer:response}) // server ne apne app kuch fire kiya dataa with help of events // Server Fire karega Clinet Lister kaega 
  })


});



httpServer.listen(3000,()=>{
    console.log('server 3000')
})



// host of time sara code io.connect me jata hae  me jata hae 
// do jagh aap listern laga sakta hae frontend and backend par 

// agar Clint Listern hae to server Fire karega

// agar Server Listern hae to Client Fire karega



