const user=require("../models/userSchema")
const jwt=require("jsonwebtoken");
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
      const newUser=new user({username,email,password,role,profileImg:"",phone:"",bio:"",created_at:""})
      await newUser.save()
      res.status(201).json(newUser)
    }
  } catch (error) {
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
    res.status(200).json(existingProfileData)
    console.log(existingProfileData);

    
    } catch (error) {
      res.status(401).json(error)
    
  }
}
