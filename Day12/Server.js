const app = require('./src/index.js')
const Database  = require('./src/db/db.js')
Database()

app.listen(3000,()=>{
    console.log('server 3000')
})