const express=require('express')
const app=express()
const port=5000

require('./config/db_conn')
app.use('/',require('./routes/index'))
app.listen(port,(err)=>{
    if(err){
        console.log(`Error : ${err}`)
    }
    else{
        console.log(`listening at http://localhost:${port}`)
    }
})