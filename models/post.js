const mongoose=require('mongoose')
const Schema=mongoose.Schema

const postSchema=new Schema({
    content:{
        type:String,
        required:true,
    },

    user:{
        type:Schema.Types.ObjectId,//userId will be stored as value of this field and later respective user will be populated
        ref:'User'//user relationship made for a post
    }
},{
    timestamps:true//to keep track of when user was created or updated
})
const Post=mongoose.model('Post',postSchema)
module.exports=Post