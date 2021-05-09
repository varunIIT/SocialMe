const User=require('../models/user')

module.exports.signUp=(req,res)=>{
    res.render('home_sign_up')
}
module.exports.signIn=(req,res)=>{
    res.render('home_sign_in')
}
module.exports.createUser=async (req,res)=>{
    if(req.body.password!=req.body.confirmPassword){ 
        res.redirect('back') 
        return
    }
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
            await User.create(req.body)
            res.redirect('/user/sign-in')
            return
        }
        res.redirect('back')
    }
    catch(err){
        console.log(`Error creating user: ${err}`)
    }
}