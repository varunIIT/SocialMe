const express=require('express')
const passport = require('passport')
const router=express.Router()
const userController=require('../controllers/user_controller')

router.get('/sign-up',userController.signUp)
router.get('/sign-in',userController.signIn)
router.post('/create',userController.createUser)
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/sign-in'}),userController.createSession)
router.get('/profile/:id',passport.checkAuthentication,userController.profile)
router.get('/sign-out',userController.signOut)
router.post('/update/:id',userController.update)
module.exports=router