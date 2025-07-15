const express = require('express')
const connectToDB = require('./src/db/ConnetiondDatabase.js')
const NoteModel = require('./src/models/notes.models.js')

const app = express() // create a server thoudhgh express
connectToDB()

app.use(express.json()) // that help reading data from servver the json data jo hame milta hae req.body mainly


app.get('/',(req,res)=>{ // server program kiya start kiya
    console.log('hellow')
    res.send('Hello world' )
})

app.post('/notes',(req,res)=>{
    const {tittle,content} = req.body;
    NoteModel.create({
        tittle:tittle,
        content:content  // content first from models content second from users
    })
    
    res.json({
        message:"Req Data Send To server"
    })



})
app.get('/notes',async(req,res)=>{

    const data =  await NoteModel.find()
    console.log(data)
    console.log(data)
    res.json({
        message:"Data send to Frontend",
        Data:data
        
    })

})
app.patch('/notes/:id', async (req,res)=>{
    const {tittle} = req.body;
    const id = req.params.id;
    await NoteModel.findByIdAndUpdate({
        _id:id
    },{
        tittle:tittle
    })
    res.json({
        message:"Data update success fully",

    })
})

app.delete('/notes/:id', async (req,res)=>{
    // const {tittle} = req.body;
    const id = req.params.id;
    await NoteModel.findByIdAndDelete({
        _id:id
    })
    res.json({
        message:"Data update Remove Sucess",

    })
})





app.listen(3000,()=>{ // listen a server
    console.log('serrver start 3000')
})