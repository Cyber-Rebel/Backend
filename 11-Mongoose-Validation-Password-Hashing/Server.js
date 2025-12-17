const app = require('./src/index.js')
const Database  = require('./src/db/db.js')
Database()

app.listen(4000,()=>{
    console.log('server 4000')
})