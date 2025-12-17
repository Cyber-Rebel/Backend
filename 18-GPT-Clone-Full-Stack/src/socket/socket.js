const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const UserModels = require('../Models/user.models.js')
const Message = require('../Models/message.model.js') 
const {geminiresponce} = require('../services/ai.services.js')

const socketserver = (httpserver) => {
  const io = new Server(httpserver, {
    /* options */
  });

  // io.use((socket,next)=>{}) ye ek socket io middlware ahe jo ki very very important hae and ese aap user ko vairify kar sakte ho very very important hae
  
    io.use(async (socket, next) => {
      const cookies = cookie.parse(socket.handshake.headers?.cookie || ""); //1) 2) postman me headers me jakar cookie set ki hae hame
      console.log(cookies);
      if (!cookies.token) {    // agar token provided nahi kiya to empty string to rahe hi ese server creash nahi hoga {socket.handshake.headers.cookie ||"" } es ||""-> ese
        next(new Error("Authentication error")); // agar token nahi hai to error throw karega
      }
      try{
      const decode = await jwt.verify(cookies.token ,  process.env.JWT_SECRET)
console.log(decode);// decode me object ata hae ek id and seond is iat

      const user = await UserModels.findById({_id:decode.id}).select('-password')
      if(!user){
        return res.status(404).json({message:"User not found"})
      }
      console.log(user)
      socket.user = user; // socket.user me user ko store kar diya create a property on the socket object
    } catch (error) {
        console.error("Authentication error:", error);
        return next(new Error("Authentication error")); // agar error aata hae to next me error
      }
      next(); // agar next nahi kiya ho req aage pass nahi hoti maltab ki page hoga circle me gumega and request havi to sirf send hoti dekne responce
    });






  io.on("connection", (socket) => {

    socket.on('ai-message', async (messagepayload) => {

      /*

       messagepayload={
         chat:chatId,
        content: message text
        } 

       */

      await Message.create({
        chat: messagepayload.chat, // message konse chat ka part tha  
        content: messagepayload.content,// message ka content
        user: socket.user._id, // kis user ne message bheja hai
        role: 'user' // user ka role hai
      })  

       // lern revesr and lean 
      
    const chatHistory = (
  await Message.find({ chat: messagepayload.chat })
    .sort({ createdAt: -1 })   // latest pehle aayenge
    .limit(3)
    .lean()
)
.reverse();   // ab order oldest → newest ho gaya
                // sare msg fetch hoge
      console.log(chatHistory); // chatHistory me sare message aayenge


      const repsonces =   await geminiresponce(chatHistory.map(item=>{
      return {
        role:item.role,
   
        parts:[{text:item.content}]
      }
    }));
        await Message.create({
        chat: messagepayload.chat,
        content: repsonces ,
        user: socket.user._id, // Middleware me socket.user me user ko store kiya tha
        role: 'model'
      })

    socket.emit('ai-repsonces', {
      content: repsonces,
      chat: messagepayload.chat,
    });
    });
    














    // console.log("A user connected",socket.user.email); // socket.user me user ko store kiya tha to ese use kar sakte ho
  });
};

module.exports = socketserver;


// first io.use hoga and then Middlware hae esliye hoga ho raha hae 
// second me io.on jo connect karga socket ko 