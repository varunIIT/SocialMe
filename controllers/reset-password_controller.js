const User = require("../models/user")
const ResetPassword=require('../models/reset-password')
const mailer=require('../utils/otp-mailer')//mailer function to send email

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
            const resetPassword=await ResetPassword.create({email:req.body.email,otp})//creating new otp session
            mailer(req.body.email,otp)//seding email to user with otp by nodemailer

            return res.status(200).json({ status: 1, message: 'Otp has been sent to your email!' })
        }
        else {//if email is invalid
            return res.status(200).json({ status: 0, message: 'Invalid Email!' })
        }
    }
    catch (err) {
        console.log(err)
    }
}