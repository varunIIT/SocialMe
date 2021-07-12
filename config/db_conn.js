const mongoose=require('mongoose')
mongoose.connect(process.env.MONGOURI||'mongodb://localhost/SocialMe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(()=>{
    console.log('db connection successfully')
    
})
.catch((err)=>{
    console.log('db connection unsuccessfull')
})