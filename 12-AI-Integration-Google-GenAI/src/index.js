const express = require('express')
const Authrouter = require('../src/routes/auth.routes')
const Postsrouter=require('../src/routes/post.routes.js')
require('dotenv').config()
const cookieparser = require('cookie-parser')
const app = express()
app.use(express.json())
app.use(cookieparser()) 



app.use('/api/auth',Authrouter)

app.use('/api/posts',Postsrouter)
module.exports = app;