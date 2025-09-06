const express = require('express')
const authmiddlware = require('./Middleware/auth.middleware.js')
const app = express()
const AuthRouter = require('./routes/auth.routes.js')
const ChatRouter = require('./routes/chat.routes.js')
const cors = require('cors')
app.use(cors({
      origin:'http://localhost:5173',
       credentials: true,
    }))
    // credentials: true, // cookeis se kam kar sakt data read karna bhejtna rakan matlab cookis ke saath kam kar sak hto 

const cookieparser = require('cookie-parser')

app.use(express.json())
app.use(cookieparser())
// Done ai 





app.use('/api/auth',AuthRouter)
app.use('/api/chat',ChatRouter)




module.exports=app;