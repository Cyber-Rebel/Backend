const express = require('express')
const app = express()

app.use(express.json())// body->raw-> JSON data ko parse karne ke liye use hota hae
app.use(express.urlencoded({ extended: true }))// x-www-form-urlencoded data ko parse karne ke liye use hota hae

app.set('view engine', 'ejs') // ese aap ap Ejs engine set kar liya hae ese ek kam ki and aappko koi html file load karni hae brower par 
// to wo routes me res.render('fileName') se kar sakta hae and only filename likhna hae path ko import nahi karna hae only file nam e
// and views folder hamesaha src ke bahar create karna hae jisme aapki ejs file hogi root me views folder create karna 

app.use(express.static('public')) // static file serve karne ke liye use hota hae jese css, js, images etc. 


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/helloejs', (req, res) => {
    res.render('index') // file ka paath dena jaruru nahi hota {only file ka naam }
     // Edar aapne index.ejs file create karni hae views folder me and usme aapko jo bhi content show karna hae wo likhna hae
// agar aapko useke file me koi css and js and karne hae to use index.ejs jo ki ek html file use dalne ke create public folder and use index.css , index.js aap daal sakte ho 

});

module.exports = app;