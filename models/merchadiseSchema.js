const mongoose = require('mongoose')
const merchandiseSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  size:{
    type:String,
    default:"Regular"
  },
  stock:{
    type:Number,
    required:true
  }

})
const merchandise=mongoose.model('merchs',merchandiseSchema)
module.exports=merchandise