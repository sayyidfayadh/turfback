const turfs=require("../models/turfSchemas")
const jwt=require("jsonwebtoken")
const user=require("../models/userSchema")
const bookings=require("../models/bookingSchema")
//add turf
exports.addTurf=async(req,res)=>{
  console.log("in controller");
  
  const {name,bookingStatus,location,map}=req.body
  // console.log("hii",timeslots);
  const adminId=req.payload
// console.log(adminId);

  let sports,amenities,timeslots;
  const images = req.files && req.files.length ? req.files.map((file) => file.filename) : [];
  console.log(images);
  
  try {
     sports = JSON.parse(req.body.sports);
    //  console.log(sports);
     amenities = JSON.parse(req.body.amenities);
     timeslots=JSON.parse(req.body.timeslots)
  } catch (error) {
    return res.status(400).json({ error: "Invalid JSON format for sports or amenities" });
  }
  try {
    const turfAlreadyCreated=await turfs.findOne({adminId})
   
    if(turfAlreadyCreated){
     //update turf
    try {
     
      const updateData = {
        name,
        bookingStatus,
        location,
        map,
        sports,
        amenities,
        images: images.length ? [...turfAlreadyCreated.images, ...images] : turfAlreadyCreated.images,
        timeslots,
        adminId
      };
    
      const editTurf=await turfs.findOneAndUpdate({adminId},updateData,{new:true})
     console.log(editTurf);
     
      res.status(200).json(editTurf)
    } catch (error) {
      res.status(500).json(error)
    }
    }
    else{
      const admin=await user.findById({_id:adminId})
      console.log(admin);   
    if(admin.role!=='turfadmin' && admin.role !=='admin'){
      res.status(401).json({message:"not admin"})
    }
    const newTurf=new turfs({name,bookingStatus,location,map,sports,amenities,images,timeslots,adminId})
    await newTurf.save()
    console.log("in catch");
    res.status(201).json(newTurf)
      
    }
  } catch (error) {
    // console.log("this",error);
    res.status(500).json({error})
  }
  
}
//get admin turf
exports.getTurf=async(req,res)=>{
  const {pickedDate}=req.body
  
  
  
  const date=pickedDate
  // console.log(pickedDate);
  
  
  const adminId=req.payload
  // console.log("in catch");

  try {
    const turfData=await turfs.findOne({adminId})
    const turfId=turfData._id.toString()
    // console.log(turfId);
    // console.log("got",JSON.stringify(turfData, null, 2));

    const allbookings=await bookings.find({
      turfId,
      date
    })
  //  console.log(allbookings);
   
    
    //mapping the slots from every booking collection items here
    const bookedSlots=allbookings.map((slot)=>slot.timeslots).flat()
    console.log(bookedSlots);

    //fetching turfs collection here
    const thisturf=await turfs.findById(turfId)
    // console.log(turf);
    //filtering available slots with booked slots
    const availableSlots=thisturf.timeslots.filter((slot)=>!bookedSlots.includes(slot))
    res.status(200).json({turfData,availableSlots,bookedSlots})
  
    }
  catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
  

}
//change booking status
exports.changeStatus=async(req,res)=>{
  const{bookingStatus}=req.body
  const adminId=req.payload
  console.log(adminId);
  
 try {
  const setStatus=await turfs.findOneAndUpdate({adminId},{bookingStatus},{new:true})

  res.status(200).json(setStatus)
 } catch (error) {
  res.status(500).json({ error: error.message })
 }
}
//get all turf
exports.getAllTurfs=async(req,res)=>{
  try {
    const result=await turfs.find()
    res.status(200).json(result)
  } catch (error) {
    res.status(403).json({error:error.message})
  }
}
exports.getViewTurf=async(req,res)=>{
  const{id}=req.params
  console.log(id);
  try {
    const result=await turfs.findById(id)
    res.status(200).json(result)
  } catch (error) {
    
  }
}