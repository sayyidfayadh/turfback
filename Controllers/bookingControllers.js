const turfs=require("../models/turfSchemas")
const user=require("../models/userSchema")
const bookings=require("../models/bookingSchema")
const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")

exports.getSlots=async(req,res)=>{
 
  
  const{turfId,pickedDate}=req.body
  const date=pickedDate
  // console.log(req.body);
  console.log("heree");
  try {
    //to get bookings of the day
    const allbookings=await bookings.find({
      turfId,
      date
    })
  //  console.log(allbookings);
   
    
    //mapping the slots from every booking collection items here
    const bookedSlots=allbookings.map((slot)=>slot.timeslots).flat()
    // console.log(bookedSlots);

    //fetching turfs collection here
    const thisturf=await turfs.findById(turfId)
    // console.log(turf);
    //filtering available slots with booked slots
    const availableSlots=thisturf.timeslots.filter((slot)=>!bookedSlots.includes(slot))
    
    //no booking for the day
    if(availableSlots.length===0){
     return  res.status(200).json({message:"no slots available for the date"})
    }
    res.status(200).json(availableSlots)
  } catch (error) {
    res.status(500).json({message:"cant get bookings",error:error.message})
  }
  
}
//user sot
exports.bookSlot=async (req,res)=>{
  const user_id=req.payload
  console.log(user_id);
  
  const{turfId,date,selectedSlots,turfname,sport,totalFee}=req.body
  // console.log(turfId,date,selectedSlots,user_id,turfname,sport,totalFee);
  const timeslots=selectedSlots
  const fee=totalFee
  if (!turfId || !date || !timeslots.length || !turfname || !sport || !fee) {
    return res.status(400).json({ message: "empty required fields" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
try {
  const ifbooked=await bookings.findOne({
    turfId,
    date,
    timeslots:{$in:selectedSlots}
  }).session(session)
  // console.log(ifbooked);
  if(ifbooked){
    await session.abortTransaction();
      session.endSession();
    return res.status(409).json({
      message: "some of the slots are already booked"
    });
  }
  else{
    const newBooking= new bookings({turfname,sport,fee,user_id,turfId,date,timeslots})
    await newBooking.save({session})
    await session.commitTransaction()
    session.endSession()
    res.status(201).json(newBooking)
  }
  
 
} catch (error) {
  await session.abortTransaction();
    session.endSession();
  console.log(error);
  res.status(500).json({message:"database error",error})
}
finally {
  session.endSession(); 
}
  
}


//admin offline booking or cancel
exports.handleBooking=async(req,res)=>{
  const adminId=req.payload
  const{SelectSlotInManage,turfId,date,name}=req.body
  const sport="offlineBooking"
  const fee="offlineBooking"
  const searchslot=[SelectSlotInManage] //just converting the string to array to apply $in function
  console.log("this",adminId,SelectSlotInManage,turfId,date,searchslot);
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const ifbooked=await bookings.findOneAndDelete({
      turfId,
      date,
      timeslots:{$in:searchslot}}, { session })
    // console.log(ifbooked);
    
    // console.log("ifbooked",ifbooked);
    if(ifbooked){
      await session.commitTransaction();
      res.status(201).json(ifbooked)
    }
    else{
      const offlinebooking=await bookings({name,sport,fee,adminId,turfId,date,timeslots:searchslot})
      await offlinebooking.save({session})
      await session.commitTransaction();
      console.log(offlinebooking);
      res.status(201).json(offlinebooking)
    }
    
}
catch(error){
  await session.abortTransaction();
  console.log(error);
  res.status(500).json({messsage:"database error",error})
  
}
finally {
  session.endSession(); 
}
}
//handleCancel user
exports.handleCancel=async(req,res)=>{
  const {bookingId}=req.body
  const status="cancelled"
  console.log(bookingId);
 try {
  const cancelbooking=await bookings.findByIdAndUpdate({_id:bookingId},{$set:{status:status}},{ new: true, runValidators: true } )
  console.log(cancelbooking);
  
res.status(200).json(cancelbooking)

 } catch (error) {
  console.log("error");
  res.status(404).json(error)
  
 }
  
}
exports.getAllBookings=async(req,res)=>{
 const adminId=req.payload
//  console.log("adm",adminId);
try {
  const theirturf=await turfs.find({adminId})
  const turfId=theirturf[0]._id
 //  console.log(turfId);
 const allbookings=await bookings.find({turfId:turfId})
 res.status(200).json(allbookings)
  
} catch (error) {
 res.status(404).json(error) 
}
}