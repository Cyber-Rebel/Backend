const express = require('express')
const authmiddlware = require('./Middleware/auth.middleware.js')
const app = express()
const AuthRouter = require('./routes/auth.routes.js')
const ChatRouter = require('./routes/chat.routes.js')

const cookieparser = require('cookie-parser')

app.use(express.json())
app.use(cookieparser())






app.use('/api/auth',AuthRouter)
app.use('/api/chat',ChatRouter)




module.exports=app;