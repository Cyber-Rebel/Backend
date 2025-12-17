const app = require('./src/index.js')
require('dotenv').config()// ESA EK BAAR KIKHO 
// JIS BHI FILE ME USE KARNA HAE TO SIRF LIKHO Ki -- > process.env._______ (black me varibale me kam jo aapne .env file diya tha)

const ConnectToDB = require('./src/db/db.js')
ConnectToDB() 

console.log(process.env.MONGODB_URL) // 
app.listen(3000,()=>{
    console.log('Server Start')
})
// Server start and conntect to data base ek folder karna code ki readabily increate hoti hae                