const UserModels = require('../models/user.models')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
async function SingupHandler(req,res) {
    const {username,password} = req.body;
    console.log(username)
    console.log(password)
    const  isUserAlerdyExits= await UserModels.findOne({
        username:username
    })

    if(isUserAlerdyExits){
        return res.status(400).json({message:"user alerdy  account"})

    }

    
    const user = await UserModels.create({
        username:username,
        password: await bcrypt.hash(password,10) // password ko 10 round tak hash karta hae and use hast karke databse me store karte hae 
    })
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('token',token)
    res.status(201).json({message:"account create ",user})
}


async function LoginHandler(req,res) {
    const {username,password} = req.body;
       const  isUserAlerdyExits= await UserModels.findOne({
        username:username
    })
        if(!isUserAlerdyExits){
        return res.status(400).json({message:"user not found plz singup  account"})

    }

    const vaildpassword= await bcrypt.compare(password,isUserAlerdyExits.password); // pahle password ko  hash karta hae and fir database se match karta hae kare sakhi hae true

    if(!vaildpassword){
        return res.status(400).json({message:"Invaild password"})

    }
    const token = jwt.sign({id:isUserAlerdyExits._id},process.env.JWT_SECRET)

    res.cookie('token',token)
    res.status(201).json({message:"login succeess",isUserAlerdyExits})

    
}
 
module.exports={
  SingupHandler,
    LoginHandler
}

// 