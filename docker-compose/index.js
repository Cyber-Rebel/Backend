const express = require('express')
const app = express()
const userModel = require('./src/model/user.model.js')
const mongoose = require('mongoose')
    
require('dotenv').config()


mongoose.connect(process.env.Mongodb_url, {    
}).then(() => {    
 console.log('Connected to MongoDB') 
}).catch(err => {    
 console.error('Could not connect to MongoDB', err) 
})

app.use(express.json())

app.get('/', (req, res) => {    
 res.send('Hello, World!') 
})


app.get('/users', async (req, res) => {    
 try {        
  const users = await userModel.find()
  res.json(users)    
 } catch (err) {        
  res.status(500).send('Server Error')    
 } 
})


app.post('/users',async(req, res)=>{
    const newUser = new userModel({
        username: Math.random().toString(36).substring(7),
        email: Math.random().toString(36).substring(7) + '@example.com'
    })
    await newUser.save()
    console.log(newUser)
    res.status(201).send('User created')

})




app.listen(3000, () => {    
 console.log('Server is running on port 3000')
})
