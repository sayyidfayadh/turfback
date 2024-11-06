const users=require()
//register user
exports.register=async (req,res)=>{
  const{username,email,password,role}=req.body
  // console.log(username,email,password);
  try {
    const existingUser=await users.findOne({email})
    console.log(existingUser);
    if(existingUser){
      res.status(406).json("user already exists,please login")
    }
    else{
      const newUser=new users({
        username,email,password,role
      })
      await newUser.save()
      res.status(201).json(newUser)
    }
    
  } catch (error) {
    res.status(401).json(error)
  }
  
 
}