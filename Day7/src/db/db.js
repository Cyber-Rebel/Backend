const mongoose = require('mongoose')

function ConnectToDB(){
    mongoose.connect(process.env.MONGODB_URL).then(()=>{  
        console.log('Conntected To db')
    }).catch((er)=>{
         console.error(er)
    })
}
module.exports=ConnectToDB;

