const mongoose = require('mongoose')
// mongoose kya kar databse le mongodb database sobot connetion karch kam kart 
//server se database se kese connect hoga ye tun db.js(Databaseconnection.js) file me   likhoge 
// part-1
function connectToDB(){
     mongoose.connect(Mongodb_URl_placehere).then(()=>{
          console.log('Database Connected')
     }).catch((e)=>{
          console.log("Database conntetion fail"+e)
     })
     // connet hover use saf saf lika hae ki use ek string chaiye 
}
// part-2 try catch async and await
  async function connectToDB(){
     try{
        await  mongoose.connect((Mongodb_URl_placehere))
          console.log('data base connetiones')

     }catch(error){
               console.log("Database connetion fail")
     }
}

module.exports =connectToDB

// await me succes ka part then handle karta hae and then and cathch ek function mangte hae 
// exporte try cathch then,cathch
