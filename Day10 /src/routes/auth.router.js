const express = require("express");
const router = express.Router();
const UserModels = require("../models/user.models.js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await UserModels.findOne({
    email: email,
  });

  if (existingUser) {
    return res.json({
      message: "This user already exists",
    });
  }

  const response = await UserModels.create({
    email: email,
    password: password,
  });

    const token = jwt.sign(
        {
        id: response.id,
        },"bookhavebrain"); // bookhavebrain its jwt_secrete jo store hota hae .env me decode karna ke liye 
// console.log(decode.id) 
        res.cookie("token",token) // jab cookie me data set karo tab ek baad dyan rakna res.cookie() use karna singular form use karna 
    res.status(201).json({
        message:"user singup  sucessfully",
        res: response,
        
    });
    });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userInDatabase = await UserModels.findOne({
    email: email,
  });
  if (!userInDatabase) {
    return res.json({
      message: "This user is not available in database",
    });
  }
  console.log(userInDatabase);
  const isPasswordCorrect = userInDatabase.password === password;

  if (isPasswordCorrect) {

    const token = jwt.sign(
        {
        id: userInDatabase.id,
        },"bookhavebrain");
// console.log(decode.id) 
        res.cookie("token",token) // jab cookie me data set karo tab ek baad dyan rakna res.cookie() use karna singular form use karna 
    res.json({
      message: "User is logged in",
      user: userInDatabase,
    });
  } else {
    return res.json({
      message: "Password is not correct",
    });
  }
});



router.get('/user',async(req,res)=>{
    const {token} = req.cookies // data agea req.cookies it pural form jisme cookies (s is madtory ) kyu ki cookies me bahut sara data hota hae 
    console.log(token)
    if(!token){
        return res.json({
            message:"sorry you not provided the token"
        })
    }
    try{
 let decode = jwt.verify(token ,"bookhavebrain") 

const respon = await UserModels.findOne({
    _id:decode.id
})
res.json({
    message:respon
})

}catch(error){
        console.log(error)
        res.status(401).json({
            message:"user is not vaild"
        })
    }
})

module.exports = router;
// ese code hame pata chalega ki konse user request kiya hae frontend se 

// req.cookie() to set cookies
// req.cookies() to extract data from cookie an object hota hae esa data destrucation nikal sakt hae 