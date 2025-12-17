const ImageKit = require('imagekit')
var mongoose = require('mongoose')


var imagekit = new ImageKit({
    publicKey: "",
  privateKey: "",
  urlEndpoint: ""
});

function uploadfile(file){

return new Promise((resolve, reject) =>{ // create a promices that handle two 2 state 
      // Extract file extension (like .png, .jpg)
    // const extension = path.extname(file.originalname || '') || '';

    // Generate unique filename with extension
    // const uniqueFileName = mongoose.Types.ObjectId().toString() + extension;
     imagekit.upload({
      
                file: file, 
                fileName: new  mongoose.Types.ObjectId().toString(), // you can use uniqueFilename here
                folder:"song-iamgekit" // imagekit ek hames dashbord me ek folder create karga  song-imagekit se jiske andar apne song hoge 

                
                
            
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
  // unquick karne tarike -> Math.random().toString(36).substring(7)
// hame hamesa use karte hae cloud wala kam ek servies folder karte hae kyu agar  hame agar kabhi cloud storge change karna pada to hame sirf es file code chanege kar sakhte taki sare code change karne ke jarunt nahi hto hae 
                // fileName: "first1" ,// file ka name hamesha unique hona chaiye chaiye use use karne bhaut tarike hota aap crepto, mongoose ,nanoid ka use kar sakte ho .. all to imagekit aapko ek new unquick name data hae but fir bhi 
