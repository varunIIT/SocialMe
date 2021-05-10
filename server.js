const express=require('express')
const app=express()
const port=5000
const expressSession=require('express-session')
const passport=require('./config/passport_set_up')
const MongoStore = require('connect-mongo')

require('./config/hbs_config').hbsConfig(app)//handlebars configuration
require('./config/db_conn')// db connection

app.use(express.json())
app.use(express.urlencoded({extended:true}))//body parser

app.use(expressSession({//express-session set up
    saveUninitialized:false,
    resave:false,
    secret:'some long string',
    cookie:{
        maxAge:60*60*1000
    },
    store:MongoStore.create({
        mongoUrl: 'mongodb://localhost/SocialMe',
        autoRemove : 'disabled'
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',require('./routes/index'))



app.listen(port,(err)=>{
    if(err){
        console.log(`Error : ${err}`)
    }
    else{
        console.log(`listening at http://localhost:${port}`)
    }
})