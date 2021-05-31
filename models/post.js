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
    },
    //array of comments to get all comments under a post faster
    comments:[{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }],
    likes:[{
        type:Schema.Types.ObjectId,
        ref:'Like'
    }]
},{
    timestamps:true//to keep track of when user was created or updated
})
const Post=mongoose.model('Post',postSchema)
module.exports=Post