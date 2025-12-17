const express = require('express')
const indexRouter = require('../src/routes/index.routes.js')
const app = express()   // app ,  


app.use(express.json()) // ese kahte hae aaplication level millware hota hae 




app.use((req,res,next)=>{ // m-1 rotuerlevel middlware
    // console.log('This Milddware in between app and routes')
    next()
})
app.use('/',indexRouter) // routes



module.exports= app;