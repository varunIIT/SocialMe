const mongoose=require('mongoose')
const Schema=mongoose.Schema

const multer=require('multer')
const path=require('path')
const avatar_path=path.join('/uploads/users/avatars')//path of avatar directory form w.r.t root directory

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
    },
    avatar:{
        type :String 
    }

},{
    timestamps:true//to keep track of when user was created or updated
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',avatar_path))//full path of directory where file will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())//making filename unique by prepending it with Date.now() which will be unique every time
    }
  })

//static methods
userSchema.statics.uploadedAvatar= multer({ storage: storage }).single('avatar')//uploading single file at a time so used single 
userSchema.statics.avatarPath=avatar_path//making avathr path w.r.t root directory static

const User=mongoose.model('User',userSchema)
module.exports=User