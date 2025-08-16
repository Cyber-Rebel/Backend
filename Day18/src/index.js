const express = require('express')
const app = express()
const AuthRouter = require('./routes/auth.routes.js')
const cookieparser = require('cookie-parser')

app.use(express.json())
app.use(cookieparser())


app.get('/test',(req,res)=>{
    console.log('basic setup run fine')
    res.send("Yes can code")
})

app.use('/api/auth',AuthRouter)



module.exports=app;