const mongoose = require('mongoose')


const noteschema = new mongoose.Schema({
    tittle:String,
    content:String
})

const NoteModel = mongoose.model("Notes",noteschema)
module.exports = NoteModel;