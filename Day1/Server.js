const http = require('http') // file ko  reauire ab file ke method use kar sakte hae .createSErver etc..

// function temp (){
//     return a+b;
// }
// es code ko run karne ke liye aapko temp() call karna padega ese ke http ko use karn cerateServer ko call karna padga 
// server crate ho gaya hae 
// const server= http.createServer() ese line par server create huva hae 

const server=http.createServer((req,res)=>{  // es line par hamme ek SERVER KO PROGRAM KIYA HAE KI USE KYA KARN HAE 
    res.end('hellp world server')
}) 
// server ko program kar diya hae 
server.listen(3000,()=>{
    console.log("server is runnig on port 3000")
})



// server.js ke ffile ko run karne ke liye tume node_modules jarut nahi but index.js cat package ke vajt se lagela
