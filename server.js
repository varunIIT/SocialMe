const express=require('express')
const app=express()
const port=5000
const expressSession=require('express-session')
const passport=require('./config/passport_set_up')
const MongoStore = require('connect-mongo')//MongoDB to store user's session 
const sassMiddleware = require('node-sass-middleware')//using sass middleware

require('./config/hbs_config').hbsConfig(app)//handlebars configuration
require('./config/db_conn')// db connection

//body parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//express-session set up
app.use(expressSession({
    saveUninitialized:false,
    resave:false,
    secret:'some long string',
    cookie:{
        maxAge: 60*60*1000
    },
    //link between expressSession and MongoDB to store user's session in MongoDB
    store:MongoStore.create({
        mongoUrl: 'mongodb://localhost/SocialMe',
        autoRemove : 'disabled'
    })
}))
//passport middlewares
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

//sass middleware
app.use(sassMiddleware({
    /* Options */
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use(express.static(__dirname+'/assets'))

app.use('/',require('./routes/index'))



app.listen(port,(err)=>{
    if(err){
        console.log(`Error : ${err}`)
    }
    else{
        console.log(`listening at http://localhost:${port}`)
    }
})