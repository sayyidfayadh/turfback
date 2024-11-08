const turfs=require("../models/turfSchemas")
const jwt=require("jsonwebtoken")
//add turf
exports.addTurf=async(req,res)=>{
  console.log("in controller");
  
  const {name,bookingStatus,location}=req.body
  // console.log("hii",timeslots);
  let sports,amenities,timeslots;
  const images=req.files.map((files)=>files.filename)
  try {
     sports = JSON.parse(req.body.sports);
    //  console.log(sports);
     amenities = JSON.parse(req.body.amenities);
     timeslots=JSON.parse(req.body.timeslots)
  } catch (error) {
    return res.status(400).json({ error: "Invalid JSON format for sports or amenities" });
  }
  // console.log(images);
  const adminId=req.payload

  // console.log("in catch");
  try {
    const turfAlreadyCreated=await turfs.findOne({adminId})
    // console.log("in catch");
    if(turfAlreadyCreated){
     //update turf
    try {
      const editTurf=await turfs.findOneAndUpdate({adminId},{
        name,bookingStatus,location,sports,amenities,images,timeslots,adminId},{new:true})
 
       res.status(200).json(editTurf)
    } catch (error) {
      res.status(401).json(error)
    }
    }
    else{
      const newTurf=new turfs({name,bookingStatus,location,sports,amenities,images,timeslots,adminId})
      await newTurf.save()
      // console.log("in catch");
      res.status(201).json(newTurf)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message)
  }
  

}
//get admin turf
exports.getTurf=async(req,res)=>{
 
  const adminId=req.payload
  // console.log(adminId);
  

  // console.log("in catch");
  try {
    const turfData=await turfs.findOne({adminId})
    // console.log("got",JSON.stringify(turfData, null, 2));
    res.status(200).json(turfData)
  
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