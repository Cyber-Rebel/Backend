    const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    image:{
        type:String,
    },
    caption:{
       type:String
     }, 
    user:{ //kis user create kiya use Id storge hogi sirf hame objectId likhe hae udar 
        // how to find open mongodb compoass udar folder name hoga use ref pass kardo 
        type:mongoose.Schema.Types.ObjectId ,
        ref:"user"
    }
})

const ImagerModels = mongoose.model('image', ImageSchema)

module.exports= ImagerModels;