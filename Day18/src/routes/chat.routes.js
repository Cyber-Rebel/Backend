const express = require('express')

const authMiddleware = require('../Middleware/auth.middleware.js')
const chatController = require('../controllers/chat.controller.js')
const routes = express.Router()// pure express call nahi kiya sirf router calll kiya

routes.post('/', authMiddleware.authUser,chatController.createChat) // authUser is a middleware and createChat is a controller function


module.exports=routes
