'use strict'
var bcrypt = require('bcrypt-nodejs');
const user = require('../models/user');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una accion del controlador de usuarios de la api'
    });
}
function saveUser(req, res) {
    //instanciamos el modelo de usuario
    var user = new User();
    var params = req.body; // 
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';
    if (params.password) {
        // encriptar contraseña y guardar datos
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                //guardar usuario
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar el usuario' });

                    } else {
                        if(!userStored){
                            res.status(404).send({message:'No se ha registrado el usuario'});
                        }else{
                            res.status(200).send({user:userStored});
                        }

                    }
                });


            } else {
                res.status(200).send({ message: 'Rellana todos los campos' });
            }
        });
    } else {
        res.status(500).send({ message: 'Introduce la constraseña' });

    }


}
function loginUser(req,res){
    var params = req.body;
    var email = params.email;
    var password = params.password;
    
    User.findOne({email:email},(err,user)=>{
        if(err){
            res.status(500).send({message:'Error en la petición'});
        }else {
            console.log(user);
            if(!user){
                res.status(404).send({message:'El usuario no existe'});
            }else {
                //comprobar la contraseña
                bcrypt.compare(password,user.password, function(err,check){
                    if(check){
                        //devolver los datos del usuario logueado
                        if(params.getHash){
                            //devolver un token de JWT
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });

                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message:'El usuario no a podido loguearse'});
                    }
                })
            }
        }
    });


}
function updateUser(req,res){
    var userId = req.params.id;
    var update = req.body;

    user.findByIdAndUpdate(userId,update,(err,userUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al Actualizar el usuario'});

        }else{
            if(!userUpdated){
                res.status(404).send({message:'No se ha podido actualizar el usuario'});
                
            }else{
                res.status(200).send({user:userUpdated});

            }
        }
    });
}
module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser
};