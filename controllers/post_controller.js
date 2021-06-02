const Comment = require('../models/comment')
const Like = require('../models/like')
const Post = require('../models/post')

module.exports.create=async (req,res)=>{
    try{
        const post=await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        if(req.xhr){
            const populatedPost= await Post.findById(post._id).populate('user')
            return res.status(201).json({
                data:{post:populatedPost},
                message:'Post Published Successfully!'
            })
        }
        req.flash('success','Post Published Successfully!')
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
            await Like.deleteMany({likable:post._id,onModel:'Post'})//deleting all the likes associated to this post
            await Like.deleteMany({likable:{$in:post.comments},onModel:'Comment'})//deleting all the likes associated to the comments of this post
            if(req.xhr){
                return res.status(200).json({
                    data:{post_id:req.params.id},
                    message:'Post/Associated Comments Deleted Successfully!'
                })
            }
            req.flash('success','Post/Associated Comments Deleted Successfully!')
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