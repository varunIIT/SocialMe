const Comment = require("../models/comment")
const Post = require("../models/post")

module.exports.create=async(req,res)=>{
    try{
        const comment=await Comment.create({
            content:req.body.content,//comment content
            user:req.user._id,//user id populated through passport 
            post:req.body.postId//post id under which comment is being done
        })

        const post=await Post.findById(req.body.postId)//find which post the comment is being done
        post.comments.push(comment._id)//pushing comment id to array of comment which will be present in comment schema
        post.save()//we should save it after every updatation

        res.redirect('back')
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}