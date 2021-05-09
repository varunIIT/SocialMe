const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User=require('../models/user')

passport.use(new LocalStrategy({
    usernameField: 'email',              //telling passport to use email as username
},
    async function (email, password, done) {
        try {
            const user = await User.findOne({ email })       //finding user with given email

            if (!user) {                                   // if user with given email is not found 
                return done(null, false)
            }
            if (user.password != password) {                 // if user with given email is found but password is incorect
                return done(null, false)
            }
            return done(null, user)                       // if email and password are correct
        }
        catch (err) {
            console.log(`Error: ${err}`)
        }
    }
));

passport.serializeUser(function (user, done) {
    //console.log(user)
    done(null, user._id)
})

passport.deserializeUser(async function (userId, done) {
    try {
        const user = await User.findById(userId)
        if (user)
            return done(null, user)
        else
            throw new Error('Could not deserialise User')
    } catch (err) {
        done(err)
    }
})
passport.checkAuthentication=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    
    res.redirect('/user/sign-in')
    
}

module.exports=passport