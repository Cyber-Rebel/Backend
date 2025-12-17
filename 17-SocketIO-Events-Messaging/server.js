const app = require('./src/index')
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {}); // opation ese frontend ki url dalni padti hae 
io.on('connection', (socket) => {
  console.log('a user connected');
  // this will emit the event to all connected sockets
// io.emit('status', 'Conneted'); 

  socket.on('chat message', (msg) => {
    // console.log('message: ' + msg);
    io.emit('chat message', msg);
  });


  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(4000,()=>{
    console.log('server runinng on 4000')

})

