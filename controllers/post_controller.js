const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create=async (req,res)=>{
    try{
        const post=await Post.create({
            content:req.body.content,
            user:req.user._id
        })
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
            res.redirect('back')
        }
        else{
            res.redirect('back')
        }
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}