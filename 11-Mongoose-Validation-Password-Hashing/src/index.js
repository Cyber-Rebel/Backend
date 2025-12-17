const express = require('express')
const Authrouter = require('../src/routes/auth.routes')
require('dotenv').config()
const cookieparser = require('cookie-parser')
const app = express()
app.use(express.json())
app.use(cookieparser()) 
// app.use(cookieparser)  agar esa kiya cookieparser ko call nahi kiya to use kya hoga error to nahi aayega but error show bhi nahi hoga and request bhi run nahi hogi 



app.use('/auth',Authrouter)
app.get('/n',(req,res)=>{
    res.send('hel')
})

module.exports = app;