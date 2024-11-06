const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['turfadmin', 'user'],
    default: 'user',
    required: true
  },
  profileImg: {
    type: String
  }
  ,
  phone: {
    type: String,
  },
  bio: {
    type: String
  },
  created_at: { type: Date, default: Date.now }
})
const user=mongoose.model('user',userSchema)
module.exports=user