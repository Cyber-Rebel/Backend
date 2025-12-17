const ImageKit = require('imagekit')
var mongoose = require('mongoose')


var imagekit = new ImageKit({
  publicKey: "",
  privateKey: "", 
  urlEndpoint: ""
});

function uploadfile(file){

return new Promise((resolve, reject) =>{ 
     imagekit.upload({
      
                file: file.buffer,// actual data of image that store in image 
                fileName: new  mongoose.Types.ObjectId().toString(),
                folder:"iamgekit" 
                
                
            
     },(error, result)=>{
        if(error){
            reject(error.message);
        }else{
            resolve(result)
        }


     })

})
}
module.exports=uploadfile;
