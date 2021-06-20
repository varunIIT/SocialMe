const express=require('express')
const app=express()
const port=5000

//chat server for chatting using web sockets
const server=require('http').Server(app)//we want two type of server i.e app and chat(io) so that is done using http.Server
const chatSocket=require('./config/chat-socket').chatSocket(server)//creating chat server finally
console.log('chat server is active')

const cookieParser=require('cookie-parser')
app.use(cookieParser())

//passport set-ups
const passport=require('passport')
const passportLocal=require('./config/passport-local-strategy')
const passportGoogle=require('./config/passport-google-strategy')
const MongoStore = require('connect-mongo')//MongoDB to store user's session 

//express-session set up
const expressSession=require('express-session')
app.use(expressSession({
    saveUninitialized:false,
    resave:false,
    secret:'some long string',
    cookie:{
        maxAge: 60*60*1000//cookie expires after 1 hour
    },
    //link between expressSession and MongoDB to store user's session in MongoDB
    store:MongoStore.create({
        mongoUrl: 'mongodb://localhost/SocialMe',
        autoRemove:'native'//By this mongoDb automatically deletes expired sessions
    })
}))
//passport middlewares
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

//handlebars configuration
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
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

const flash=require('connect-flash')//for storing flash messages in session cookie
const middleware=require('./config/middleware')//requiring flash middlewares
app.use(flash())// using this middleware just after initialising express session
app.use(middleware.flashMiddleware)

//sass middleware
const sassMiddleware = require('node-sass-middleware')//using sass middleware
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
app.use(express.static(__dirname+'/assets'))//accessing assets directory as home route
app.use('/uploads',express.static(__dirname+'/uploads'))//accessing uploads directory as /uploads start point

app.use('/',require('./routes/index'))//entry of all route end points

server.listen(port,(err)=>{
    if(err){
        console.log(`Error : ${err}`)
    }
    else{
        console.log(`listening at http://localhost:${port}`)
    }
})