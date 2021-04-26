'use strict'
require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 }).then(()=>{
     console.log(`.....connection to database established.....`)
 }).catch(err=>{
     console.log(`db error ${err.message}`);
     process.exit(-1)
 })