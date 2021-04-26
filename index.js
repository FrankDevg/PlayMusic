'use strict'
require('dotenv').config();
var mongoose = require('mongoose');
var app=require('./app');
var port= process.env.PORT; 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 }).then(()=>{
     console.log(".....connection to database established.....");
     app.listen(port, function(){
        console.log(".....connection to API REST server  in port http://localhost:"+port +".....");
     });
 }).catch(err=>{
     console.log(`db error ${err.message}`);
     process.exit(-1)
 })