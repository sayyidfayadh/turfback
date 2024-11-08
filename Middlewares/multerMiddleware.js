const multer=require('multer')
const storage=multer.diskStorage({
  destination:function(req,file,callback){
    callback(null,'./upload') 
  }
  ,filename:function (req,file,callback){
    const filename=`image-${Date.now()}-${file.originalname}`
    callback( null,filename)
  }
})
const fileFilter=(req,file,callback)=>{
  if(file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg"){
    callback(null,true)
  }
  else{
    callback(new Error("please upload file type of jpg,png or jpeg"),false)
    
  }
}
const multerConfig=multer({
  storage,fileFilter
})
module.exports=multerConfig