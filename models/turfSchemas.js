const mongoose = require('mongoose');

const turfSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true 
    },
    bookingStatus:{
      type:Boolean,
      default:true,
      required:true
    },
  location: {
     type: String, 
     required: true },
  map:{
type:String,
required:true
  },
  sports: [{
    name: { 
      type: String, 
      required: true 
    },
    prices: {
      defaultPrice: {
        type: Number
      },
      fiveAside: {
        type:Number
      },
      sevenAside:{
        type:Number
      } 
    }
  }],
  amenities: {
     type: [String], 
     required: true },
  images: { 
    type: [String], 
    default: [] 
  },
  timeslots:{
    type:[String],
    required:true
  }
  ,
  adminId:{
    type:String,
    required:true
  }
  ,
  
  created_at: { type: Date, default: Date.now }
});

turfSchema.index({ location: 1 });
turfSchema.index({ name: 1 });
const turfs = mongoose.model('turfs', turfSchema);

module.exports = turfs;
