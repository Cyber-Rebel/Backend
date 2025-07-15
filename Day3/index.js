// The Day 3 build a note appliaction and use all method 
const express = require('express')

const app = express()
app.use(express.json())
const notes=[]

app.get('/notes',(req,res)=>{
    res.json(notes)

})

app.post('/notes',(req,res)=>{
   // That undefind why beacuse express not able read json data so tahta at above write this line app.use(express.json())
   notes.push(req.body)
res.json(req.body)
})

app.patch('/notess/:index',(req,res)=>{
   const index =req.params.index
//    console.log(index) 
//    notes[index] = req.body; change whole notes 
            const {title}= req.body;
        notes[index].title=title,

    res.json({message:"Notes Update sucessfully !!"}) /// res me obje beja laga ese { message:" Notes update"}
                                                                

})
app.delete('/notes/:id',(req,res)=>{
        const{id}=req.params;
    delete notes[id] // delete arr index give value null
    res.json({message:"The delete sucess Fully"})

})

// use case params
// app.get('/user/:id',(req,res)=>{

//     console.log(req.params.id)
//     res.status(200).json('Good')
// })
app.listen(3000)

// obje me ek fecute wo nahe valu va
