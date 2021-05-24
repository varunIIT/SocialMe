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
        if(req.xhr){
            const populatedComment=await Comment.findById(comment._id).populate('user')
            //console.log(populatedComment)
            return res.status(201).json({
                data:{comment:populatedComment},
                message:'comment published!'
            })
        }
        req.flash('success',' comment published successfully!')
        res.redirect('back')
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}
module.exports.delete=async(req,res)=>{
    try{
        const commentId=req.params.id
        const comment=await Comment.findById(commentId)
        const userId=comment.user

        if(String(userId)==req.user.id){
            const postId=comment.post
            comment.remove()
            await Post.findByIdAndUpdate(postId,{$pull:{comments:commentId}})
            if(req.xhr){
                return res.status(200).json({
                    data:{comment_id:comment._id},
                    message:'comment deleted!'
                })
            }
            req.flash('success',' comment deleted successfully!')
            res.redirect('back')
        }
        else{
            req.flash('error','unauthorised!')
            res.redirect('back')
        }
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}