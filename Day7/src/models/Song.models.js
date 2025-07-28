const mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
    tittle:String,
    artist:String,
    audio:String // ese file me audio me ham firset file ko cloud par save karge and use link ham mongobdme audio naam se save akrge 
    
})
const songmodel = mongoose.model('song' ,SongSchema)  //  mongodb folder name song
module.exports= songmodel;
// FILES-> song mongodb hames model bahar ek s lahati hae to nam hoga songs