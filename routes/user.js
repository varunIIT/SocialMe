const express=require('express')
const passport = require('../config/passport_set_up')
const router=express.Router()
const userController=require('../controllers/user_controller')

router.get('/sign-up',userController.signUp)
router.get('/sign-in',userController.signIn)
router.post('/create',userController.createUser)
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/sign-in'}),userController.createSession)
router.get('/profile',passport.checkAuthentication,passport.setAuthenticatedUser,userController.profile)
module.exports=router