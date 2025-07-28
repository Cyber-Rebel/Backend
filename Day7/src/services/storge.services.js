const ImageKit = require('imagekit')



var imagekit = new ImageKit({
    publicKey: "",
  privateKey: "",
  urlEndpoint: ""
});

function uploadfile(file){

return new Promise((resolve, reject) =>{ // create a promices that handle two 2 state 
     imagekit.upload({
      
                file: file, 
                fileName: "first1" // file ka name hamesha unique hona chaiye chaiye use use karne bhaut tarike hota aap crepto, mongoose ,nanoid ka use kar sakte ho .. all to imagekit aapko ek new unquick name data hae but fir bhi 
            
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

// hame hamesa use karte hae cloud wala kam ek servies folder karte hae kyu agar  hame agar kabhi cloud storge change karna pada to hame sirf es file code chanege kar sakhte taki sare code change karne ke jarunt nahi hto hae 