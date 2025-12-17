const express = require('express')
const {LoginHandler,SingupHandler} = require('../controllers/auth.controller.js')

const router = express.Router()
router.post('/login',LoginHandler)
router.post('/register',SingupHandler)

module.exports= router