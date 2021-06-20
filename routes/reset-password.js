const route=require('express').Router()
const resetPasswordController=require('../controllers/reset-password_controller')

route.get('/frontend',resetPasswordController.frontend)
route.post('/send-otp',resetPasswordController.sendOtp)
route.post('/verify-otp',resetPasswordController.verifyOtp)
route.post('/change-password',resetPasswordController.changePassword)
module.exports=route