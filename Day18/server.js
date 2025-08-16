const app = require('./src/index')
const db = require('./src/db/db.js')
require('dotenv').config()
db()

app.listen(3000,(req,res)=>{
console.log('server listen on port 3000')
})