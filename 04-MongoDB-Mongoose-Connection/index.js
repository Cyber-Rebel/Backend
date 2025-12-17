const express = require('express')
const app = express() // create a server in this line 
app.use(express.json()) // jo request.body jo bhi json data server par ata (frontend ,postman se json data send kara)// bydefaul read nahi kar sakte apna express server esliye use karna hae
 //---
 //server database se connect server.js file me 
const connectToDB = require('./src/db/Databaseconnetion')
connectToDB()

app.get('/',(req,res)=>{
    res.json('hellow')
})
app.listen(3000,()=>{
    console.log("Server on listen port 3000")
})

// npm i mongoose (express server ko monogodb database se connect karene ke use hoaga ek package  )