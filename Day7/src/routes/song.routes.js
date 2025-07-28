
const express = require('express')
const multer= require('multer')
const uploadfile = require('../services/storge.services.js')
const  songsModels = require('../models/Song.models.js')
const router = express.Router() // use aap routes create karto hae in diffrent folder express ki rotutes hot hae app.use('',file path)// code ki readable hota hae ese// expres provide karta hae hamesadhan rakha

const upload = multer({storage:multer.memoryStorage( )})// multer ko bata ki file ko kaha stroge karna hae
// memoryStorage ka matalab tempary data ko RAM me save karan hae  
// ek or hota hae diskStorge 
// upload.single('songs')---> ek middleware hae 
router.post('/songs',upload.single('audio'),async(req,res)=>{
    console.log(req.body) // agar aapne form-data use kiya jo aap by default text and file ko read nahi kar sakte 
// aapne upload.single('__') esme __ filekey ko send karana hae ki naamse apne file ko send kiya hae 
// ab jo text wala data hae use aap req.body me hoga 
// and file(audio,video) ka data hame milta hae req.file me 
    console.log(req.file.buffer)
    const fileData = await  uploadfile(req.file.buffer)
console.log(fileData) // ese imagekit hame file ki link and 
console.log(fileData.url) // ese hame backend me Link ko save karte hae music ko nahi ese database karna and jab use lage tab boluna 

   const responce =   await songsModels.create({
// hame hamesa use karte hae cloud wala kam ek servies folder karte hae kyu agar  hame agar kabhi cloud storge change karna pada to hame sirf es file code chanege kar sakhte taki sare code change karne ke jarunt nahi hto hae 
        tittle:req.body.tittle,
         artist:req.body.artist,
        audio:fileData.url,

    })

     
        res.status(200).json({
            message:"song create sucessfully",
            responce

        })
})

module.exports = router;
// same as video audio
// ye field send karte ahe imagekit hame 
// {
//   fileId: '',
//   name: '',
//   size: ,
//   filePath: ',
//   url: 'h',
//   fileType: '',
//   height: 1192,
//   width: 1756,
//   thumbnailUrl: '',
//   AITags: null,
//   description: null
// }
// multer use karto to express.json() ko hata skate ho but hatana hae 
// json data --> express.json()
// file data --> multer-->:1) req.body  for text data  2) req.file --> large file data hota hae
// multer se aap jsong and file data ko send kar sakte ho 
// age chaiye expess.json() hata bhi sakte ho but hatana nahi hae