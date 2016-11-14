"use strict"
var promise = require('bluebird');
var options = {
    // Initialization Options
    promiseLib: promise
};
var Respuesta = require("../helpers/respuesta");
var MateriaDao = require("../app_core/dao/materiaDao");
var ActividadDao = require("../app_core/dao/actividadDao");
var LogroDao = require("../app_core/dao/logroDao");
var Nota_logroDao = require("../app_core/dao/nota_logroDao");
var Nota_actividadDao = require("../app_core/dao/nota_actividadDao");
var NotificacionDao = require("../app_core/dao/notificacionDao");
var Tipo_notificacionDao = require("../app_core/dao/tipo_notificacionDao");

function getNotaActividadEstudiantebyMateria(req,res){
    Nota_actividadDao.findNotaActividadEstudiantebyMateria(30011,req.params.id_actividad)
    .then(function(data){
        Respuesta.sendJsonResponse(res,200,data);
        console.log("la fucnion salio bn" + data)

    }).catch(function(err){
        if(err.message == 'No data returned from the query.'){
            respuesta.sendJsonResponse(res,200,[]);
        }else{
            console.log(err.message);
            Respuesta.sendJsonResponse(res,500,[]);
        }
    });
}

function getNotaLogrosMaterias(req, res) {
    var hoy = new Date();
    var dia = hoy.getDate();
    var mes = hoy.getMonth() + 1;
    var anio = hoy.getFullYear();
    var fecha_actual = String(anio + "-" + mes + "-" + dia);

    Nota_logroDao.findNotasLogrosByMateria(fecha_actual, req.params.id_estudiante).
    then(function(data) {
        Respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            Respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            Respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function getMateriasEstudiante(req, res) {
    MateriaDao.findMateriasByEstudiante(30011).then(function(data) {
        Respuesta.sendJsonResponse(res, 200, data);
        console.log("la fucnion salio bn" + data)
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            Respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            Respuesta.sendJsonResponse(res, 500, []);
        }
    });
}
//////esta va en todos se repite con docentes////
function getActividadesEstudiante(req, res) {

    ActividadDao.findActividadesByLogro(req.params.id_logro).then(function(data) {
        console.log("la fucnion salio bn" + data)
        if ((data.length <= 0) || (!data)) {
            return Respuesta.status(400).json({});
        } else {
            Respuesta.sendJsonResponse(res, 200, data); //arrayName.length > 0
        }
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            Respuesta.sendJsonResponse(res, 400, []);
        } else {
            console.log(err.message);
            Respuesta.sendJsonResponse(res, 500, []);
        }
    });
}
///
function getLogrosEstudiante(req, res) {
    console.log("entro aqui a get Logros estudiantes");
    LogroDao.findLogrosByMateriaAndPeriodo(30011, req.params.id_materia, req.params.id_periodo).then(function(data) {
        Respuesta.sendJsonResponse(res, 200, data);
        console.log("la fucnion salio bn" + data)
            //cb(data)
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            Respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            Respuesta.sendJsonResponse(res, 500, []);
        }
    });
}
/////
function getNotasLogros(req, res) {
    Nota_logroDao.findNotasLogrosByEstudiante(30011, req.params.id_materia, req.params.id_periodo).then(function(data) {
        var data1 = {};
        //(function(i){
        console.log("antes del for")
        for (var i = data.length - 1; i >= 0; i--) {
            data1[data[i].id_logro] = data[i].nota_logro;
        }
        console.log(data)
        Respuesta.sendJsonResponse(res, 200, data1);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            Respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            Respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function getNotificaciones(req, res) {
    NotificacionDao.findNotificacionesByEstudiante(req.body.id_estudiante).then(function(data) {
        console.log(req.body);
        Respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            Respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            Respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function getNotificacionesPendientes(req, res) {
    NotificacionDao.findNotificacionesByEstudianteAndEstado(req.body.id_estudiante).then(function(data) {
        Respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            Respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            Respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function getTiposNotificacion(req, res) {
    Tipo_notificacionDao.findTipoNotificacion().then(function(data) {
        Respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            Respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            Respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function updateEstadoNotificacion(req, res) {
    NotificacionDao.updateEstadoNotificacion(req.body.id_notificacion).then(function(data) {
        Respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            Respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            Respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function getNotasActividades(req, res) {
    Nota_actividadDao.findNotasActividadesByEstudiante(30011).then(function(data) {

        console.log(data)
        Respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            Respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            Respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function getNotasActividadbyLogro(req, res) {
    Nota_actividadDao.findNotaActividadLogrobyEstudiante(30011, req.params.id_logro).then(function(data) {
        console.log("la fucnion salio bn" + data)
        if ((data.length <= 0) || (!data)) {
            return Respuesta.status(400).json({});
        } else {
            Respuesta.sendJsonResponse(res, 200, data); //arrayName.length > 0
        }
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            Respuesta.sendJsonResponse(res, 400, []);
        } else {
            console.log(err.message);
            Respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

module.exports = {
    getMateriasEstudiante: getMateriasEstudiante,
    getLogrosEstudiante: getLogrosEstudiante,
    //getMateriasYLogrosE: getMateriasYLogrosE,
    getNotasLogros: getNotasLogros,
    getActividadesEstudiante: getActividadesEstudiante,
    getNotasActividades: getNotasActividades,
    getNotificaciones: getNotificaciones,
    getNotaLogrosMaterias: getNotaLogrosMaterias,
    getNotasActividadbyLogro: getNotasActividadbyLogro,
    getTiposNotificacion: getTiposNotificacion,
    getNotificacionesPendientes: getNotificacionesPendientes,
    updateEstadoNotificacion: updateEstadoNotificacion,
    getNotaActividadEstudiantebyMateria:getNotaActividadEstudiantebyMateria,
}