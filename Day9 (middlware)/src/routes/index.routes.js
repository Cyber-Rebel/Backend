const express  = require('express')
const router = express.Router()

router.use((req,res,next)=>{ //m-2
    console.log('This middlware in between router and api ')
    next()
})

router.get('/',(req,res)=>{
    console.log('hello  ')
    res.json({
        message:"welcome to server "
    })
})


module.exports= router;