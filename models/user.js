const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema= new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    }

},{
    timestamps:true//to keep track of when user was created or updated
})

const User=mongoose.model('User',userSchema)
module.exports=User