const route=require('express').Router()
const resetPasswordController=require('../controllers/reset-password_controller')

route.use('/frontend',resetPasswordController.frontend)
route.use('/send-otp',resetPasswordController.sendOtp)

module.exports=route