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
module.exports.profile=async (req,res)=>{
    const profile_user=await User.findById(req.params.id)
    res.render('profile',{title:'Profile',profile_user})// render profile page
}
module.exports.createUser=async (req,res)=>{
    if(req.body.password!=req.body.confirmPassword){// if password and confirm password are not equal redirect back to sign-up page
        req.flash('error','password and confirm password do not match!')
        res.redirect('back') 
        return
    }
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){//if user is not found this implies there is new user and register him successfully and redirect to sign-up page
            await User.create(req.body)
            res.flash('success','signed up successfully!')
            res.redirect('/user/sign-in')
            return
        }
        req.flash('error','email already exists!')
        res.redirect('back')// if user email is already exists redirect back to sign-up page
    }
    catch(err){
        console.log(`Error creating user: ${err}`)
    }
}
module.exports.createSession=(req,res)=>{
    req.flash('success','signed in successfully!')
    res.redirect('/')
}
module.exports.signOut=(req,res)=>{
    req.logout()
    req.flash('success','signed out successfully!')
    res.redirect('/')
}
module.exports.update=async (req,res)=>{
    try{
        if(req.user.id==req.params.id){
            const user=await User.findById(req.params.id)
            //Now due to enctype="multipart/form-data" body-parser can'nt parse req.body so we are using static method 
            //which we created while creating user model
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    return console.log('***Multer-Error*** ->',err)
                }
                console.log(req.file)
                //now req.body id defined and we can use it as usual
                user.name=req.body.name
                user.email=req.body.email
                if(req.file){//as file input is not required ,we should check if user has given file as input or not
                    user.avatar=User.avatarPath+'/'+req.file.filename
                }
                user.save()
                res.redirect('/')

    
            })
        }
        else{
            req.flash('error','UNAUTHORIZED!')
            return res.status(401).send('UNAUTHORIZED!')
        }
        
    }
    catch(err){
        console.log(err)
    }
}
