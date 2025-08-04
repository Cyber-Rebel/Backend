
const express = require('express')
const { SingupHandler, LoginHandler} = require('../controllers/auth.controllers.js')

const router = express.Router()  // router create

router.post('/register',SingupHandler)
router.post('/login',LoginHandler)



  module.exports = router;

  // router ke funation ko handle karnta hae controllers jo ek funcation hota hae jisme api call back hota hae 
// controller se readable hota hae code 

  // controller me ham class se use karte hae ham  most of time 