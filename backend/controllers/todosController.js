"use strict"
var promise = require('bluebird');
var options = {
    // Initialization Options
    promiseLib: promise
};
var PeriodoDao = require("../app_core/dao/periodoDao");
var Respuesta = require("../helpers/respuesta");
var PersonaDao = require("../app_core/dao/personaDao");
var FuncionesSeguridad = require("../helpers/funcionesSeguridad");
var EstudianteDao = require("../app_core/dao/estudianteDao");
var DocenteDao = require("../app_core/dao/docenteDao");

function getPeriodosDisponibles(req, res) {
    var hoy = new Date();
    var dia = hoy.getDate() ;
    var mes = hoy.getMonth() +10;
    var anio = hoy.getFullYear() -1;
    var fecha_actual = String(anio + "-" + mes + "-" + dia);
    /*var queri = "select id_periodo,numero_periodo from anio_lectivo natural join periodo where id_estado_anio_lectivo = 1 and fecha_inicio_periodo <= '" + fecha_actual+"'";
    console.log(queri)
    db.many(queri)*/
    PeriodoDao.findPeriodosDisponibles(fecha_actual).then(function(data) {
        Respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            Respuesta.sendJsonResponse(res, 200, {});
        } else {
            console.log(err.message);
            Respuesta.sendJsonResponse(res, 500, {});
        }
    })
}

function getPerfil(req,res){
    var token=req.headers.authorization.split(' ')[1];
    FuncionesSeguridad.getTokenData(token).then(function(decoded){


        //solamente si el rol es de un estudiante
        if(decoded.rol == 7){
            EstudianteDao.findEstudianteByIdUsuario(decoded.id).then(function(estudiante){

                console.log("to bbn to fine");
                console.log(estudiante[0]);
                Respuesta.sendJsonResponse(res,200,estudiante[0]);
              
            }).catch(function(e){
                console.log("erro what happend")
                Respuesta.sendJsonResponse(res, 500, {"error":"Error Usuario"});
                console.log(e)
            });

        }else if(decoded.rol == 6){
                DocenteDao.findDocenteByIdUsuario(decoded.id).then(function(docente){
                console.log(docente[0].id_docente)
                Respuesta.sendJsonResponse(res,200,docente[0]);
                console.log("la fucnion salio bn" + docente[0])
            }).catch(function(e){
                Respuesta.sendJsonResponse(res, 500, {"error":"Error Usuario"});
                console.log(e)
            });


        }else{
            Respuesta.sendJsonResponse(res, 500, {"error":"No tiene permisos"});
        }


    });

}

function getPeriodoActual(req, res) {
    var hoy = new Date();
    var dia = hoy.getDate();
    var mes = hoy.getMonth() +10;
    var anio = hoy.getFullYear() -1;
    var fecha_actual = String(anio + "-" + mes + "-" + dia);
    console.log(fecha_actual)
    PeriodoDao.findPeriodoActual(fecha_actual).then(function(data) {
        Respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            Respuesta.sendJsonResponse(res, 200, {});
        } else {
            console.log(err.message);
            Respuesta.sendJsonResponse(res, 500, {});
        }
    })
}
module.exports = {
    getPeriodosDisponibles: getPeriodosDisponibles,
    getPeriodoActual: getPeriodoActual,
    getPerfil: getPerfil,
}