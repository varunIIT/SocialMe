var nodemailer = require('nodemailer');
require('dotenv').config()
const mailer=(target,otp)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass:process.env.PASS
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL,
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