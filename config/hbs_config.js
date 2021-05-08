const exphbs=require('express-handlebars')

module.exports.hbsConfig=(app)=>{
    app.engine('hbs', exphbs({
        defaultLayout: 'main',
        extname: '.hbs'
    }));
    
    app.set('view engine', 'hbs');
}