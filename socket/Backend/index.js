const  express = require('express');
const app = express();
const {createServer} = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
app.use(cors({
    origin:"*"}
));
const httpServer = createServer(app);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const io  =  new Server (httpServer, {
    cors:{
        origin:"*"

    }
})


io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('message', (msg) => { 
        io.emit('receive', msg); // Broadcast the message to all connected clients
        // socket.broadcast.emit('receive', msg); // Broadcast the message to all connected clients except the sender
    });
// on matlab send karna 
    // emit to lister karna and 
    io.emit('welcome',{
        serverName:"Socket.io Server",
        message:"Welcome to the Socket.io server!"
    })


   
    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
    })
}); 



httpServer.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
// emit part frontend ya postman se  listen karna hota hae 