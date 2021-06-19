const mongoose=require('mongoose')
const Schema=mongoose.Schema

const resetPasswordSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    expiresIn:{
        type:Number,
        default:new Date().getTime()+60*1000
    }
})
const ResetPassword=mongoose.model('ResetPassword',resetPasswordSchema)
module.exports=ResetPassword