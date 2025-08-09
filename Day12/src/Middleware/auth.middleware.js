const jwt = require('jsonwebtoken')
const userModels = require('../models/user.models')
const authVaildationMiddlware= async(req,res ,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"token not provieded yet plz login "})
    }
    try{
    const decode = jwt.verify(token,process.env.JWT_SECRET) // if token is valid we get id otherwise get error so use try and cacth method  becuase hame nahi cahiye ki server log karab ho bin kam se 
    console.log(decode)
 const user = await  userModels.findOne({
    _id:decode.id
})
req.user =  user   // jo hamere req use me ek new property genrate ki hae 
// req me user nam ek property ki jise req set hogi ki esa kyu kiya ek middlware to app.get('/name',producte,funcation handle(req,res){})  handler me wo req send kargo ese ek hame middlware ek data milga jise kam assan hoga 
// access karne ke liye 
 next()
    }catch(err){
        res.json({message:"token is not vaild " , err})
    }}


    module.exports= authVaildationMiddlware;