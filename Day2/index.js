const express = require('express')  

const app = express() // Express server create huva ese line

app.get('/',(req,res)=>{
    res.send('Welocome to home page  ') // :-->
})
app.get('/about',(req,res)=>{
    res.send('Welcome to about page ')  // :--> server ko esa program kar diya ki jab server /about jarga to use ye 
})
// show hota line 5 se 10 tak hames server ko prgram kiya he 

// What REQUEST ? (req)
// :--> Client to server {client ne bola server ke meri kuch kam kar de me tuze mera data de rahah  hau}
// mainly hae data ata hae req.body , req.params, req.query ,req.header, req.cookies  last ke done figer out karn ahe 
// What is Resopn?(res)
//:--> Servet to Client There meanily 3 method res.send() , res.json(),res.status()

// Api is way conneitng two application !! it may be frontend(react) and backend(nodejs appliationa) 
// There 4 Types api 
// Maily Focus REST API :--> THE REST API ITS API THAT FOLLOW SOME PROTOCAL AND STANDARD
// REST METHOD GET, POST, PUT , DELETE



app.listen(3000)