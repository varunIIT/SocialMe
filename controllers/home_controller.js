const Post=require('../models/post')
const User = require('../models/user')
module.exports.home=async(req,res)=>{
    try{
        //find all posts and populating user of every post
        const posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate('likes')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            },
            options: { sort: { createdAt: -1 } } 
        })
        
        
        const users=await User.find({})
        res.render('home',{title:'Home',posts:posts,profile_users:users})

    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}