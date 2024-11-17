const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
  name:{
    type:String,
    default:"appuserbooking"
  },
  turfname:{
  type:String
  },
  sport:{
    type:String
  },
  fee:{
    type:String
  },
  user_id: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'user' 
    },
  turfId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'turfs'
     },
  date:
   { type: String,
     required: true 
    },
  timeslots: { 
    type: Array,
     required: true 
    }, 
  status: { 
    type: String,
    default: 'confirmed'
   },
   created_at: { type: Date, default: Date.now }
});

const bookings=mongoose.model('bookings',bookingSchema)
module.exports=bookings