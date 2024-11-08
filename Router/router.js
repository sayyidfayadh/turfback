const express=require('express')
const router=express.Router()
const jwtMiddleware=require("../Middlewares/JWTmiddleware")
const userController=require("../Controllers/userControllers")
const turfController=require("../Controllers/turfControllers")
const multerConfig=require('../Middlewares/multerMiddleware')
//authentication
router.post('/register',userController.register)
router.post('/login',userController.login)
//profiledata
router.get('/profiledata',jwtMiddleware,userController.getProfileData)
////admin add turf
router.post('/addturf',jwtMiddleware,multerConfig.array('images'),turfController.addTurf)
//get turf data
router.get('/getturf',jwtMiddleware,turfController.getTurf)
//change booking status
router.patch('/changestatus',jwtMiddleware,turfController.changeStatus)
//get all turfs
router.get('/getallturfs',turfController.getAllTurfs)
//get one view turf
router.get('/getviewturf:id',turfController.getViewTurf)

module.exports=router