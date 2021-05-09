const express=require('express')
const router=express.Router()
const userController=require('../controllers/user_controller')

router.get('/sign-up',userController.signUp)
router.get('/sign-in',userController.signIn)
router.post('/create',userController.createUser)
module.exports=router