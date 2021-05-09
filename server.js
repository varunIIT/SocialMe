const express=require('express')
const app=express()
const port=5000

require('./config/hbs_config').hbsConfig(app)  //handlebars configuration
require('./config/db_conn')  // db connection

app.use(express.json())
app.use(express.urlencoded({extended:true}))  //body parser

app.use('/',require('./routes/index'))



app.listen(port,(err)=>{
    if(err){
        console.log(`Error : ${err}`)
    }
    else{
        console.log(`listening at http://localhost:${port}`)
    }
})