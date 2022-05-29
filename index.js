'use strict'
var app= require('./app');
var port= process.env.PORT || 2001;

app.listen(port, ()=>{
    console.log('El servidor funciona :)');
});