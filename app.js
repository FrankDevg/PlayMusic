'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//configuración cabeceras http


//rutas base
app.get('/pruebas',function(req,res){
    res.status(200).send({message:'Bienvenidos al curso de means2'});

});
module.exports = app;


