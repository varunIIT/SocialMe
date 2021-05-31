const mongoose=require('mongoose')
const Schema=mongoose.Schema

const likeSchema=new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    likable:{
        type:mongoose.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{timestamps:true})
const Like=mongoose.model('Like',likeSchema)
module.exports=Like