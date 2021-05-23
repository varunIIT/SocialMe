const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create=async (req,res)=>{
    try{
        const post=await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        if(req.xhr){
           return res.status(201).json({
                data:{post},
                message:"post created!"
            })
        }
        req.flash('success','post published successfully!')
        res.redirect('back')
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}
module.exports.delete=async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        //type conversion into string because '=='returns false as comparison is done using an Object Reference
        if(String(post.user)==String(req.user._id)){
            await Post.findByIdAndDelete(req.params.id)//deleting the post with id passed as params
            await Comment.deleteMany({post:req.params.id})//deleting all the comments associated to this post
            req.flash('success','post/associated comments deleted successfully!')
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