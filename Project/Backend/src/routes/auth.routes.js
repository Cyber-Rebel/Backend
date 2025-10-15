const express = require('express')
const {LoginHandler,SingupHandler,authdata} = require('../controllers/auth.controller.js')
const authMiddleware = require('../Middleware/auth.middleware.js')

const router = express.Router()
router.post('/login',LoginHandler)
router.post('/register',SingupHandler)
router.get('/me',authMiddleware.authUser,authdata)

module.exports= router