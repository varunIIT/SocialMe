const User = require("../models/user")
const ResetPassword=require('../models/reset-password')
const mailer=require('../utils/otp-mailer')//mailer function to send email
const jwt = require('jsonwebtoken');

module.exports.frontend = (req, res) => {
    res.render('reset-password', { title: 'reset-password' })
}
module.exports.sendOtp = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })//verifying if email is valid or not 
        if (user) {//case if email is valid
            var otp='' 
            for(var i=0;i<4;i++){//generating a 4-digit random otp
                var digit=Math.floor(Math.random()*10)
                digit=digit?digit:5
                otp=otp+digit.toString()
            }
            //console.log(otp)
            const data=await ResetPassword.findOne({ email: req.body.email })//checking if user's previous otp session exists or not
            if(data){
                data.remove()//if user's previous otp session exists then deleting it 
            }
            const resetPassword=await ResetPassword.create({email:req.body.email,otp,expiresIn:new Date().getTime()+60*1000})//creating new otp session
            mailer(req.body.email,otp)//seding email to user with otp by nodemailer

            return res.status(200).json({ status: 1, message: 'OTP has been sent to your email!' })
        }
        else {//if email is invalid
            return res.status(200).json({ status: 0, message: 'Invalid Email!' })
        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.verifyOtp=async (req,res)=>{
    try{
        const resetPassword=await ResetPassword.findOne({email:req.body.email})
        //all unsuccessful attempts
        if(!resetPassword){
            return res.status(401)
        }
        if(resetPassword.expiresIn-new Date().getTime()<0){
            //console.log(resetPassword.expiresIn-new Date().getTime())
            return res.status(401)
        }
        if(resetPassword.otp!=req.body.otp){
            return res.status(200).json({status:0,message:'Incorrect OTP!'})
        }
        //if verification is successful
        const token= jwt.sign({email:req.body.email,otp:req.body.otp},'secret', { expiresIn: '60s' })//creating jwt token for proper authentication
        resetPassword.token=token
        await resetPassword.save()
        return res.status(200).json({status:1,message:'Change Password!',token})
    }
    catch(err){
        console.log(err)
    }
}

module.exports.changePassword=async (req,res)=>{
    try{
        const token=req.cookies.token
        jwt.verify(token, 'secret', async (err,payload) => {
            if(err){
                return res.status(403)
            }
            if(!payload){
                return res.status(401)
            }
            if(req.body.newPassword!=req.body.confirmPassword){
                req.flash('error',"New Password and Confirm Password don't Match!")
                return res.redirect('/user/sign-in')
            }
            const user=await User.findOne({email:payload.email})
            user.password=req.body.newPassword
            await user.save()
            req.flash('success','Password Changed Successfully!')
            res.redirect('/user/sign-in')
          })
    }
    catch(err){
        console.log(err)
    }
}