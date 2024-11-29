const user=require("../models/userSchema")
const jwt=require("jsonwebtoken");
const bookings=require("../models/bookingSchema");

//register user
exports.register=async (req,res)=>{
  const{username,email,password,role}=req.body
  console.log(username,email,password);
  try {
    const existingUser=await user.findOne({email})
    console.log(existingUser);
    if(existingUser){
      res.status(406).json("user already exists,please login")
    }
    else{
      console.log("here");
      const updateUser=new user({username,email,password,role,profileImg:"",phone:"",bio:"",created_at:""})
      await updateUser.save()
      res.status(201).json(updateUser)
    }
  } catch (error) {
    res.status(401).json(error)
  }
  
 
}
//update
exports.updateProfile=async (req,res)=>{
  const{username,email,bio,phone}=req.body
  console.log(username,email,bio,phone);
  try {
    const updatedUser = await user.findOneAndUpdate(
      { email }, {   $set: {username: username,bio: bio, phone: phone,},}, { new: true, runValidators: true } 
    );
    res.status(200).json(updatedUser)
  }
catch (error) {
    res.status(401).json(error)
  }
  
 
}
//login user
exports.login=async(req,res)=>{
  // console.log("in login");
  const{email,password}=req.body
  try {
    console.log("in login");
    const existingUser=await user.findOne({email,password}).select('-password')
    console.log(existingUser);
    
    if(existingUser){
        const token=jwt.sign({userId:existingUser._id},process.env.jwt_secret)
        res.status(200).json({existingUser,token})
      }
      else{
        res.status(406).json("credentials dont match")
      }
  } catch (error) {
    res.status(401).json(error)
  }
  
}
//profiledata
exports.getProfileData=async(req,res)=>{
  const userId=req.payload;
  console.log(userId);
  
  try {
    const existingProfileData=await user.findOne({_id:userId}).select(`-password`)
    const userbookings=await bookings.find({user_id:userId})
    console.log("sss",userbookings);
    
    res.status(200).json({profile:existingProfileData,userbookings:userbookings})
    console.log(existingProfileData);

    
    } catch (error) {
      res.status(401).json(error)
    
  }
}

// getalladmins
exports.getAllAdmins=async(req,res)=>{
  const role="turfadmin"
  try {
    const allturfadmins=await user.find({role})
    console.log(allturfadmins);
    res.status(200).json(allturfadmins)
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}