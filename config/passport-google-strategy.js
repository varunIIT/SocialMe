const passport=require('passport')
const GoogleStrategy=require('passport-google-oauth20').Strategy
const crypto=require('crypto')
const keys=require('./keys')
const User=require('../models/user')
passport.use(
    new GoogleStrategy(
      {
        clientID: keys.clientID,
        clientSecret: keys.clientSecret,
        callbackURL: "/user/redirect/google"
      },
      (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //check if user already exists in our db with the given profile ID
        User.findOne({email: profile.emails[0].value}).then((currentUser)=>{
          if(currentUser){
            //if we already have a record with the given profile ID
            done(null, currentUser);
          } else{
               //if not, create a new user 
              new User({
               email:profile.emails[0].value,
               name:profile.displayName,
               password : crypto.randomBytes(20).toString('hex')//password of 20 bytes converted to it's hexadecimal string
              }).save().then((newUser) =>{
                done(null, newUser);
              });
           } 
        })
      }
    )
  );
