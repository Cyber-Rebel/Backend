const UserModels = require('../Models/user.models.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const LoginHandler = async(req,res)=>{
const {email,password} = req.body;
const UserAlerdyexits = await UserModels.findOne({
    email:email
})
if(!UserAlerdyexits){
  return res.status(404).json({message:"User is not founded"})
}

const isPasswordValid = await bcrypt.compare(password,UserAlerdyexits.password)
if(!isPasswordValid){
  return res.status(400).json({message:"Password not vaild "})
}

const token = jwt.sign({id:UserAlerdyexits.id},process.env.JWT_SECRET)

res.cookie('token',token)
res.status(200).json({
  message:"Sucessfully Login "
  ,UserAlerdyexits
})


}




const SingupHandler = async(req,res)=>{
const {fullName:{firstName,lastName},email,password} =req.body;

const UserAlerdyexits = await UserModels.findOne({
    email:email
})
if(UserAlerdyexits){
    return res.status(400).json(
      {message:"User Alerdy Exits in database"}
    )
}

const hashpassword  = await bcrypt.hash(password,10)

  const user = await UserModels.create({
    email:email,
    password:hashpassword,
    fullName:{
        firstName,lastName
    }
  })

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET)// jar object pass kela tar token madeh ek obje yeto kya madhe ek madhe apla data and secondt iat kuch hota hae 

    res.cookie('token',token)
  res.status(201).json({
    message:"user create succesfully !",
    user:{
      email:user.email,
      // firstNameName:user.fullName.firstName,
      id:user.id
      
    }
  })
// ek saath 2 chiye res kar sakte hae 
}












module.exports={
  SingupHandler,
    LoginHandler
}
