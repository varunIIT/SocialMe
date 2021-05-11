const User=require('../models/user')

module.exports.signUp=(req,res)=>{
    if(req.isAuthenticated()){//checking if user is already signed-in or not 
        return res.redirect('/user/profile')//if user is already signed in redirect to profile page
    }
    res.render('home_sign_up',{title:'sign-up'})
}
module.exports.signIn=(req,res)=>{
    if(req.isAuthenticated()){//checking if user is already signed-in or not 
        return res.redirect('/user/profile')//if user is already signed in redirect to profile page
    }
    res.render('home_sign_in',{title:'sign-in'})
}
module.exports.profile=(req,res)=>{
    res.render('profile')// render profile page
}
module.exports.createUser=async (req,res)=>{
    if(req.body.password!=req.body.confirmPassword){// if password and confirm password are not equal redirect back to sign-up page
        res.redirect('back') 
        return
    }
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){//if user is not found this implies there is new user and register him successfully and redirect to sign-up page
            await User.create(req.body)
            res.redirect('/user/sign-in')
            return
        }
        res.redirect('back')// if user email is already exists redirect back to sign-up page
    }
    catch(err){
        console.log(`Error creating user: ${err}`)
    }
}
module.exports.createSession=(req,res)=>{
    res.redirect('/')
}
module.exports.signOut=(req,res)=>{
    req.logout()
    res.redirect('/')
}