const express=require('express')
const app=express()
const port=5000

const expressSession=require('express-session')

const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const passport=require('passport')
const passportLocal=require('./config/passport_set_up')
const MongoStore = require('connect-mongo')//MongoDB to store user's session 

const sassMiddleware = require('node-sass-middleware')//using sass middleware
const flash=require('connect-flash')//for storing flash messages in session cookie
const middleware=require('./config/middleware')//requiring flash middlewares

//handlebars configuration
const hbs=exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: '.hbs',
    // helper function for '==' operator
    helpers:{
        eq:(v1,v2)=>String(v1)==String(v2)
    }
})
app.engine('hbs',hbs.engine );
app.set('view engine', 'hbs');



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

app.use(flash())// using this middleware just after initialising express session
app.use(middleware.flashMiddleware)
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