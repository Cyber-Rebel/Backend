const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const UserModels = require("../Models/user.models.js");
const Message = require("../Models/message.model.js");
const { geminiresponce,generatevector } = require("../services/ai.services.js");
const {createMemory,queryMemory} = require('../services/vector.services.js');
const { response } = require("express");

const socketserver = (httpserver) => {
  const io = new Server(httpserver, {});

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    if (!cookies.token) {
      next(new Error("Authentication error"));
    }
    try {
      const decode =  jwt.verify(cookies.token, process.env.JWT_SECRET);
    

      const user = await UserModels.findById({ _id: decode.id }).select(
        "-password"
      );
      if (!user) {
       return next(new Error("User not found")); // res not so next new Erro
      }

      socket.user = user;
    } catch (error) {
      console.error("Authentication error:", error);
      return next(new Error("Authentication error"));
    }
    next();
  });

  io.on("connection", (socket) => {
    socket.on("ai-message", async (messagepayload) => {
    const messagereponse =  await Message.create({
        chat: messagepayload.chat,
        content: messagepayload.content,
        user: socket.user._id,
        role: "user",
      });



      const chatHistory = (
        await Message.find({ chat: messagepayload.chat })
          .sort({ createdAt: -1 })
          .limit(10) // token jada hone 1 word ka ek token hota he 
          .lean()
      ).reverse();

      // console.log(chatHistory);

      // console.log(messagepayload.chat)

const vector = await generatevector(messagepayload.content)
      await createMemory({  
        // creatMesmory me sirf vector save honge durse kuch bhi save nahi hoga only vector save honge 
        vector:vector,
        messageId:messagereponse._id,// id is unquick and message id honi chiye  message ki id 
        metadata:{  // meta data me hame pass karn hae ki konse user id and chat ki id kya hae 
          chat:messagepayload.chat,
          user: socket.user._id,
          text:messagepayload.content

        }

      })
      const Memory = await queryMemory({
        queryVector:vector,
        limit:4,   
        metadata:{
             user: socket.user._id
        }
      } )
      
      // metadata:{} // filter process ese aap konse user metadata{} kiya to sare user ki chat fecthc karega but agar ese user id that data fecthc hoga user ki basic par 

      // console.log("Memory fecthc",Memory)
      
    const stm = chatHistory.map((item) => {  // gemini la input magca responce par send kiya hae magre 3 message fecth from chathistory 
          return {
            role: item.role,
            parts: [{ text: item.content }],
          };
        })
        // console.log("The short term mermor ",stm) // stm ek array hae 

    const ltm = [
      {
        role:'user',
        parts:[{text:`
          
          these are some previous messages from the chat , use them to generate  a reponces 
          ${Memory.map(iteam=>iteam.metadata.text).join('\n')}
          
          `}]
      }
    ]  
    // console.log(ltm)  
    // console.log([...ltm,...stm])


      const repsonces = await geminiresponce([...ltm,...stm]); //...ltm se ...stm se ek array hae   
console.log(repsonces ? repsonces : "Not working");



const airesponsemsg  =      await Message.create({
  chat: messagepayload.chat,
  content: repsonces,
  user: socket.user._id,
  role: "model",
});
const aivectoresp = await generatevector(repsonces)

       await createMemory({ 
        vector:aivectoresp,
        messageId:airesponsemsg._id,// id is unquick and message id honi chiye  message ki id 
        metadata:{  // meta data me hame pass karn hae ki konse user id and chat ki id kya hae 
          chat:messagepayload.chat,
          user: socket.user._id,
          text:repsonces


        }

      })


      socket.emit("ai-repsonces", {
        content: repsonces,

        chat: messagepayload.chat,
      });
    });
  });
};

module.exports = socketserver;
