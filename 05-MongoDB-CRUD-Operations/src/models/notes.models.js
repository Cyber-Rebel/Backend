const mongoose = require('mongoose')


const noteschema = new mongoose.Schema({ // Schema ko create kiya with help of mongoose  Schma ek () ese andar obje create kiya hae 
    tittle:String,
    content:String
})

const NoteModel = mongoose.model("Notes",noteschema)  //Model Creation kiya  
module.exports = NoteModel;
// Schema told
