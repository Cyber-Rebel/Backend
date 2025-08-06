const ImageKit = require('imagekit')
var mongoose = require('mongoose')


var imagekit = new ImageKit({
  publicKey: "public_NnKZPgePRWPpwL30DCmBHsEOdBs=",
  privateKey: "private_2pOTHZR9uG+dCIMkTaHhibaXvZg=",
  urlEndpoint: "https://ik.imagekit.io/cyberrebel"
});

function uploadfile(file){

return new Promise((resolve, reject) =>{ 
     imagekit.upload({
      
                file: file, 
                fileName: new  mongoose.Types.ObjectId().toString(),
                folder:"song-iamgekit" 
                
                
            
     },(error, result)=>{
        if(error){
            reject(error);
        }else{
            resolve(result)
        }


     })

})
}
module.exports=uploadfile;
