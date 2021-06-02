const Like = require("../models/like")
const Post=require('../models/post')
const Comment=require('../models/comment')

module.exports.toggle=async (req,res)=>{
    try{
        //it is get req. with url endpoint:/like/toggle?id=1234abc&type=Post
        //likable can be either a post or a comment as user can like on either one post or one comment at a time

        let likable//likable->Post document/Comment document
        let liked//will contain bool value,0 for unliked and 1 for liked

        if(req.query.type=='Post'){//if like was made to a post
            likable=await Post.findById(req.query.id)
        }
        else{//if like was made to a comment
            likable=await Comment.findById(req.query.id)
        }
        let existingLike=await Like.findOne({//trying to find if this like currently exits or not
            user:req.user._id,
            likable:req.query.id,
            onModel:req.query.type
        })
        if(existingLike){//already liked now we should make it unlike
            likable.likes.pull(existingLike._id)
            likable.save()
            existingLike.remove()
            existingLike.save()
            liked=0//for unliked
        } 
        else{//alredy unliked now we should make it liked
            const newLike=await Like.create({//creating new like in Like collection
                user:req.user._id,
                likable:req.query.id,
                onModel:req.query.type
            })
            likable.likes.push(newLike._id)//also pushing like to likes array in likable(post/comment) 
            likable.save()

            liked=1//for likeds
        }  
        res.status(200).json({
            data:{
                liked:liked,
                type:req.query.type,
                likableId:req.query.id
            },
            message:"request successful!"
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}