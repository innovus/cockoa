"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var respuesta= require("../helpers/respuesta");
var request = require('request');


var InasistenciaDao = require("../app_core/dao/inasistenciaDao");
var MateriaDao = require("../app_core/dao/materiaDao");
var NotificacionDao = require("../app_core/dao/notificacionDao");
var DispositivoDao = require("../app_core/dao/dispositivoDao");
var EstudianteDao = require("../app_core/dao/estudianteDao");
var FuncionesSeguridad = require("../helpers/funcionesSeguridad");
var MateriaDao = require("../app_core/dao/materiaDao");


function getInasistenciasEstudianteByCarga(req,res){


         var token=req.headers.authorization.split(' ')[1];
    FuncionesSeguridad.getTokenData(token).then(function(decoded){
        
        //solamente si el rol es de un estudiante
        if(decoded.rol == 7){
            EstudianteDao.findEstudianteByIdUsuario(decoded.id).then(function(estudiante){
                console.log(estudiante[0].id_estudiante);


                        InasistenciaDao.findInasistenciasEstudianteByCarga(req.params.id_carga,estudiante[0].id_estudiante)
    .then(function(data){
        respuesta.sendJsonResponse(res,200,data);
        console.log("la fucnion salio bn" + data)

    }).catch(function(err){
        if(err.message == 'No data returned from the query.'){
            respuesta.sendJsonResponse(res,200,[]);
        }else{
            console.log(err.message);
            respuesta.sendJsonResponse(res,500,[]);
        }
    });





            }).catch(function(e){
                Respuesta.sendJsonResponse(res, 500, {"error":"Error Usuario"});
                console.log(e)
            });

        }else{
            Respuesta.sendJsonResponse(res, 500, {"error":"No tiene permisos"});


        }
        //console.log(decoded.body.rol);
    });



} 

function getCantidadInasistenciaMateria(req,res){

     var token=req.headers.authorization.split(' ')[1];
    FuncionesSeguridad.getTokenData(token).then(function(decoded){
        
        //solamente si el rol es de un estudiante
        if(decoded.rol == 7){
            EstudianteDao.findEstudianteByIdUsuario(decoded.id).then(function(estudiante){
                console.log(estudiante[0].id_estudiante);


                    InasistenciaDao.findCantidadInasistenciasBYMateria(estudiante[0].id_estudiante)
    .then(function(data){
        respuesta.sendJsonResponse(res,200,data);
        console.log("la fucnion salio bn" + data)

    }).catch(function(err){
        if(err.message == 'No data returned from the query.'){
            respuesta.sendJsonResponse(res,200,[]);
        }else{
            console.log(err.message);
            respuesta.sendJsonResponse(res,500,[]);
        }
    });





            }).catch(function(e){
                Respuesta.sendJsonResponse(res, 500, {"error":"Error Usuario"});
                console.log(e)
            });

        }else{
            Respuesta.sendJsonResponse(res, 500, {"error":"No tiene permisos"});


        }
        //console.log(decoded.body.rol);
    });




}

//inasistencias de una carga
function getInasistenciasCarga(req,res){

    InasistenciaDao.findInasistenciasByCarga(req.params.id_carga)
    .then(function(data){
        respuesta.sendJsonResponse(res,200,data);
        console.log("la fucnion salio bn" + data)

    }).catch(function(err){
        if(err.message == 'No data returned from the query.'){
            respuesta.sendJsonResponse(res,200,[]);
        }else{
            console.log(err.message);
            respuesta.sendJsonResponse(res,500,[]);
        }
    });

}


function getMiInasistencia (req,res){

    InasistenciaDao.findInasistenciasByEstudiante(1)
    .then(function(data){
        respuesta.sendJsonResponse(res,200,data);
        console.log("la fucnion salio bn" + data)

    }).catch(function(err){
        if(err.message == 'No data returned from the query.'){
            respuesta.sendJsonResponse(res,200,[]);
        }else{
            console.log(err.message);
            respuesta.sendJsonResponse(res,500,[]);
        }
    });
}
function getInasistenciaPorCarga(req,res){
    InasistenciaDao.findInasistenciasByCarga(req.params.id_estudiante,req.params.id_carga)
    .then(function(data){
        respuesta.sendJsonResponse(res,200,data);
        console.log("la fucnion salio bn" + data)

    }).catch(function(err){
        if(err.message == 'No data returned from the query.'){
            respuesta.sendJsonResponse(res,200,[]);
        }else{
            console.log(err.message);
            respuesta.sendJsonResponse(res,500,[]);
        }
    });
}


//trae un vector de los estudiantes que tienen faltas con el id de el estudiante y alfrente la cantidad de inasistencias cantidad de inasistencias de una carga para un estudiante
function getCantidadInasistenciasCarga(req,res){

     InasistenciaDao.findCantidadInasistenciasByCarga(req.params.id_carga)
    .then(function(data){
        var data1 = {};
        //(function(i){
            console.log("antes del for")
            for (var i = data.length - 1; i >= 0; i--) {

                console.log("entro al for " + i )
                data1[data[i].id_estudiante] = data[i].cantidad;
            }

        respuesta.sendJsonResponse(res,200,data1);
        console.log("la fucnion salio bn" + data1)
    }).catch(function(err){
        if(err.message == 'No data returned from the query.'){
            respuesta.sendJsonResponse(res,200,[]);
        }else{
            console.log(err.message);
            respuesta.sendJsonResponse(res,500,[]);
        }
    });

}

//funcion que recibe un arreglo de inasistencias y las agrega en la base de datos
function addInasistencias (req,res){
    //agrega inasistencias
    InasistenciaDao.addInasistencias(req.body).then(function(){

        //encuentra la materia de la q vamos a agregar la inasistencia
        MateriaDao.findMateriaByCargaDocente(req.body[0].id_carga).then(function(nombre_materia){
            var notificaciones = [];
            var fecha = new Date(req.body[0].fecha_inasistencia);
            var mensajeNotificacion = 'Se agrego una nueva inasistencia el dia  '+fecha.toLocaleDateString() + ' en ' +nombre_materia[0].nombre_materia;

            //recorremos inasistencias para crear el arreglo de notificaciones por cada inassistencia agregada
            req.body.forEach(function(inasistencia,index){
                var notificacion = {'id_tipo_notificacion':1,'mensaje_notificacion':mensajeNotificacion,'id_estudiante':inasistencia.id_estudiante,'guia':inasistencia.id_carga,'nombre_materia':nombre_materia[0].nombre_materia};
                notificaciones.push(notificacion);
            });

            // inserta las notificaciones
            NotificacionDao.insertarNotificaciones(notificaciones).then(function(data){

                //encuentra el toquen de cada estudiante
                DispositivoDao.findTokenByEstudiantes(notificaciones).then(function(tokens){
                    var registrations_ids=[];
                    console.log(tokens);

                    //s
                    if((tokens.length!=0)||(tokens)){
                        var json = null;
                        
                        //recorre tokens y los ahreha a el vector de registration_ids
                        tokens.forEach(function(token,index){
                            registrations_ids.push(token.token_dispositivo);
                        });

                        //crea el json para enviar la notificacion
                        var json = {
                            "registration_ids": registrations_ids,
                            "notification":{
                                "title":"Inasistencia",
                                "body":mensajeNotificacion,
                                "icon" : "ic_border_color_white_24dp",
                                "sound" : "defaull",
                                "click_action":"OPEN_ACTIVITY_2"
                            },
                            "data": {
                                "guia":req.body[0].id_carga,
                                "tipo":"1",
                                "nombre_materia": nombre_materia[0].nombre_materia
                            }
                        };
                        var options = {
                            uri: 'https://fcm.googleapis.com/fcm/send',
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "key=AIzaSyDdDo5XLcuuJyQh_crrOdXjYSfYDbsnogU"
                            },
                            json: json
                        };
                        console.log(options);
                        request(options, function (error, response, body) {
                            console.log("entro al request");
                            //console.log(response)
                            console.log(body);
                            console.log(error);
                            /*if (!error && response.statusCode == 200) {
                             console.log(body.id) // Print the shortened url.
                            }*/
                        });
                    }// cierra if
                //cathc findTokenByEstudiantes
                }).catch(function(error){
                    console.log("error token by sttudiantes");
                    console.log(error);
                });
            //catch insertarNotificaciones
            }).catch(function(error){
                console.log("error notificacion");
                console.log(error);
            });

            //manda la respuesta
            respuesta.sendJsonResponse(res,200,{'mensaje':'Inasistencias insertada'});

        //catch findMateriaByCargaDocente    
        }).catch(function(error) {
            console.log(error);
            Respuesta.sendJsonResponse(res, 500, {
                'status': 1,
                'msg': error
            });
        });

    // catch addInasistencias
    }).catch(function(error){
        respuesta.sendJsonResponse(res,500,[]);
        console.log("Error" , error.message || error);
    });
    
}
function getMateriasWithInasistenciaByEstudiante(req,res){

        var token=req.headers.authorization.split(' ')[1];
    FuncionesSeguridad.getTokenData(token).then(function(decoded){
        
        //solamente si el rol es de un estudiante
        if(decoded.rol == 7){
            EstudianteDao.findEstudianteByIdUsuario(decoded.id).then(function(estudiante){
                console.log(estudiante[0].id_estudiante)


                    MateriaDao.findMateriasWithInasistenciaByEstudiante(estudiante[0].id_estudiante)
    .then(function (data){
        respuesta.sendJsonResponse(res,200,data);
        console.log("la fucnion salio bn" + data);
    }).catch(function(err){
        if(err.message == 'No data returned from the query.'){
            respuesta.sendJsonResponse(res,200,[]);
        }else{
            console.log(err.message);
            respuesta.sendJsonResponse(res,500,[]);
        }
    });





            }).catch(function(e){
                Respuesta.sendJsonResponse(res, 500, {"error":"Error Usuario"});
                console.log(e)
            });

        }else{
            Respuesta.sendJsonResponse(res, 500, {"error":"No tiene permisos"});


        }
        //console.log(decoded.body.rol);
    });




}
function getInasistenciasByMateria(req,res){

     var token=req.headers.authorization.split(' ')[1];
    FuncionesSeguridad.getTokenData(token).then(function(decoded){
        
        //solamente si el rol es de un estudiante
        if(decoded.rol == 7){
            EstudianteDao.findEstudianteByIdUsuario(decoded.id).then(function(estudiante){
                console.log(estudiante[0].id_estudiante)


    InasistenciaDao.findInasistenciasByMateria(estudiante[0].id_estudiante,req.params.id_materia)
    .then(function (data){
        respuesta.sendJsonResponse(res,200,data);
        console.log("la fucnion salio bn" + data);
    }).catch(function(err){
        if(err.message == 'No data returned from the query.'){
            respuesta.sendJsonResponse(res,200,[]);
        }else{
            console.log(err.message);
            respuesta.sendJsonResponse(res,500,[]);
        }
    });




            }).catch(function(e){
                Respuesta.sendJsonResponse(res, 500, {"error":"Error Usuario"});
                console.log(e)
            });

        }else{
            Respuesta.sendJsonResponse(res, 500, {"error":"No tiene permisos"});


        }
        //console.log(decoded.body.rol);
    });




}
function updateEstadoInasistencia(req,res){
    InasistenciaDao.updateEstadoInasistencia(req.body)
    .then(function(data){
        respuesta.sendJsonResponse(res,200,{'msg':'Inasistencia Actualizada'});

    }).catch(function(err){
        respuesta.sendJsonResponse(res,500,{'msg':'Error al actualizar'});
    })
}


module.exports = {
    getMiInasistencia: getMiInasistencia,
    getInasistenciasCarga: getInasistenciasCarga,
    addInasistencias: addInasistencias,
    getCantidadInasistenciasCarga: getCantidadInasistenciasCarga,
    getInasistenciaPorCarga: getInasistenciaPorCarga,
    getMateriasWithInasistenciaByEstudiante:getMateriasWithInasistenciaByEstudiante,
    getInasistenciasByMateria: getInasistenciasByMateria,
    updateEstadoInasistencia: updateEstadoInasistencia,
    getCantidadInasistenciaMateria:getCantidadInasistenciaMateria,
    getInasistenciasEstudianteByCarga:getInasistenciasEstudianteByCarga
}