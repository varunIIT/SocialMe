var nodemailer = require('nodemailer');
const {email,pass}=require('./keys')//to do-change to environment variables later

const mailer=(target,otp)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: email,
          pass: pass
        }
      });
      
      var mailOptions = {
        from: email,
        to: target,
        subject: 'Reset-Password OTP',
        html: `Your OTP to reset password is:<h1>${otp}</h1>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
module.exports=mailer