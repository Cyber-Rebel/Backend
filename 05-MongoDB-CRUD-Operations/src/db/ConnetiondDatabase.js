const mongoose = require('mongoose')

 function ConnectToDB (){
    mongoose.connect(Mongode_url.nets/Foldername).then(()=>{
        console.log("Connted to database")
    }).catch((error)=>{
        console.log("Error To Connnted Database"+error)
    })
}

module.exports =ConnectToDB;
// Foldername aap /cohort  kuch lik sakte ho Matalb Wo main Folder hoga Database me 
// Schema se Model banta hae
// Model creation hame CRUD operation karna aasan hota hae 

