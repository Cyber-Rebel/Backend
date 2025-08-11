// Short Term Mermory 
const app = require('./src/index.js')
const { createServer } = require("http");
const { Server } = require("socket.io");
const { generateResponce } = require('./src/services/ai.services.js');
 
const httpServer = createServer(app);  // Create HTTP server using the Express app
const io = new Server(httpServer, { 
  cors:{
    origin: "http://localhost:5173", // Set the origin of the frontend URL
  }
 }); // here set the origin of frontend url it nessary 

const Chathistory = [
]

io.on("connection", (socket) => {
  console.log('A user are conneted')
  socket.on('disconnect',()=>{ 
    console.log('A user discorrected ')
  })

// Ai-Messager
  socket.on('ai-message',async (promts)=>{ 
    console.log(promts)
//  const response = await generateResponce(promts)
Chathistory.push({
  role:"user",
  parts:[{text:promts}]
})
const response = await generateResponce(Chathistory)
Chathistory.push({
  role:"model",
  parts:[{text:response}]
})

 console.log('Ai Reponcse' ,response)
 socket.emit('ai-message-repsonce',response)
  })


});



httpServer.listen(3000,()=>{
    console.log('server 3000')
})






// const Chathistory = [{ This is systax ese yaad rako kam 
//   role:"user",
//   parts:[{text:"Who was the PM of India in 2019 ?"}]
// },
// {
//   role:"model ",
//   parts:[{text:"The PM of India in 2019 was Narendra Modi.  "}]
// }
// ]
