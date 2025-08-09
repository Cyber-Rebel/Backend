const express = require('express')
const authMiddlware = require('../Middleware/auth.middleware')
const createpost  = require('../controllers/post.controllers.js')
const multer = require('multer')
const router = express.Router()
const upload = multer({storage:multer.memoryStorage( )})


router.post('/' ,  authMiddlware,upload.single('image'),createpost)


module.exports = router;
