require("dotenv").config()
const sendMailRoute = require('./Router/router');
const express=require("express")
const cors=require("cors")
const turfServer=express()
const router=require("./Router/router")
const connection=require("./DB/Connection")
turfServer.use(cors())
turfServer.use(express.json())
turfServer.use(router)
turfServer.use('/upload',express.static('./upload'))
const PORT=3001;
turfServer.listen(PORT,()=>{
  console.log(`turfserver started running at ${PORT}`);
})
turfServer.get('/',(req,res)=>{
  res.status(200).send('<h1>turf server runninng</h1>')
})


//nodemail

turfServer.use('/api', sendMailRoute);