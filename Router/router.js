const express=require('express')
const router=express.Router()
const jwtMiddleware=require("../Middlewares/JWTmiddleware")
const userController=require("../Controllers/userControllers")
const turfController=require("../Controllers/turfControllers")
const bookingControllers=require("../Controllers/bookingControllers")
const multerConfig=require('../Middlewares/multerMiddleware')
const nodemail=require("../Controllers/nodeMailer")
//authentication
router.post('/register',userController.register)
router.post('/login',userController.login)
//profiledata
router.get('/profiledata',jwtMiddleware,userController.getProfileData)
router.patch('/updateprofile',userController.updateProfile)
////admin add turf
router.post('/addturf',jwtMiddleware,multerConfig.array('images'),turfController.addTurf)
//get turf data
router.post('/getturf',jwtMiddleware,turfController.getTurf)

//change booking status
router.patch('/changestatus',jwtMiddleware,turfController.changeStatus)
//get all turfs
router.get('/getallturfs',turfController.getAllTurfs)
//get one view turf
router.get('/getviewturf:id',turfController.getViewTurf)
//getslots
router.post('/getslots',bookingControllers.getSlots)
//book slot
router.post('/bookslot',jwtMiddleware,bookingControllers.bookSlot)
//admin booking or offline booking
router.post('/handlebooking',jwtMiddleware,bookingControllers.handleBooking)
//user cancel
router.post('/handlecancel',jwtMiddleware,bookingControllers.handleCancel)
//get all bookings for admin profile
router.post('/getallbookings',jwtMiddleware,bookingControllers.getAllBookings)

//nodemailer
router.post('/send-mail',nodemail.nodemail)
module.exports=router