const express = require('express')
const songRoutes = require('./routes/song.routes.js')
const app = express();
app.use(express.json())

 
app.use('/',songRoutes)  // ese file ke express paata nahi hota ki hamne routes ke folder me api create kiya hae to use bane ne ke liye ham es line ko likte hae jise 
// server pata cahle ke routes folder me api create kiya hae 

module.exports = app;