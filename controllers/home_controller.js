const Post=require('../models/post')
module.exports.home=async(req,res)=>{
    try{
        const posts=await Post.find({}).populate('user')//find all posts and populating user of every post
        res.render('home',{title:'Home',posts:posts})

    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}