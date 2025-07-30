const express = require('express')
const indexRouter = require('../src/routes/index.routes.js')
const app = express()   // app ,  


app.use(express.json()) // ese kahte hae aaplication level Middleware !!




app.use((req,res,next)=>{ // m-1 Ese kahte hae router-level Middleware !! 
    console.log('This Milddware in between app and routes')
    next()
})
app.use('/',indexRouter)



module.exports= app;
