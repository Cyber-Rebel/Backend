const chatModel = require('../Models/chat.models.js')

const createChat = async (req,res)=>{
    const {tittle} = req.body;
    // const userId = req.user; // Diya fir me mongoodb me objectid save hogi kyu hame model me types defind kiya hae and ek baat
    const userId = req.user._id; // User ID from the authenticated user

    const chat = await chatModel.create({
        user: userId,
        tittle: tittle
    });
    res.status(201).json({
        message: "Chat created successfully",
        chat: {
            id: chat._id,
            user: chat.user,
            tittle: chat.tittle,
            lastActivity: chat.lastActivity
        }
    }); 

}

module.exports={
    createChat
}