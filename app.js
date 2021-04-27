'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');


app.use(express.urlencoded({extended:false}));
app.use(express.json());


//configuración cabeceras http


//rutas base
app.use('/api',user_routes);


module.exports = app;


