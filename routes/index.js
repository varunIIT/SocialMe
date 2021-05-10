const express=require('express')
const router=express.Router()
const homeController=require('../controllers/home_controller')
const passport = require('../config/passport_set_up')

router.get('/',homeController.home)
router.use('/user',require('./user.js'))

module.exports=router