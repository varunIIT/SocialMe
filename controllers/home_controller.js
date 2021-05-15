const Post=require('../models/post')
module.exports.home=async(req,res)=>{
    try{
        //find all posts and populating user of every post
        const posts=await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        res.render('home',{title:'Home',posts:posts})

    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}