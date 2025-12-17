const express = require('express')
const AuthRoutes = require('./routes/auth.router.js')
const cookieParser = require('cookie-parser')
const app = express()
app.use(express.json())
app.use(cookieParser()) // appliaction middlware hota hae and why we downlaod same and express jise ke server req.body me aaya json data kud se pad sakta
// vese  hi server bydefalut cookie data server nahi pad sakta hae ese liye ham cookeparser ko call karoto ho use install karn padega

app.use('/auth',AuthRoutes)

module.exports=app;