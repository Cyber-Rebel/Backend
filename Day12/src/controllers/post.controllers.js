const multer  = require('multer') // jaha use karna sirf udar multer use karo 
const ImagerModels = require('../models/image.models.js')
const { generatecontext } = require('../services/ai.services.js')
const createpost = async (req,res)=>{
  

       const bufferdata = req.file.buffer
      const base64= new Buffer.from(bufferdata).toString('base64') // buffer to Base64 {buffer me acutal data hota hae }
  const Caption=   await generatecontext(base64)
      console.log("Generated Caption:", Caption);
    
      res.send(Caption)



}
module.exports = createpost;














        //  const fileData = await  uploadfile(req.file.buffer)
  // console.log(req.file)

  // fiile ka data milta buffer me hamesha dyan rakna

  // file hae buffer or hamne chaiye base64 to use convert karna hoga 