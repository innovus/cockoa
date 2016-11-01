"use strict"
var promise = require('bluebird');
var options = {
    // Initialization Options
    promiseLib: promise
};
var respuesta = require("../helpers/respuesta");
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);
var MateriaDao = require("../app_core/dao/materiaDao");
var ActividadDao = require("../app_core/dao/actividadDao");
var LogroDao = require("../app_core/dao/logroDao");
var Nota_logroDao = require("../app_core/dao/nota_logroDao");
var Nota_actividadDao = require("../app_core/dao/nota_actividadDao");
var NotificacionDao = require("../app_core/dao/notificacionDao");
var Tipo_notificacionDao = require("../app_core/dao/tipo_notificacionDao");

function getNotaLogrosMaterias(req, res) {
    var hoy = new Date();
    var dia = hoy.getDate();
    var mes = hoy.getMonth() + 1;
    var anio = hoy.getFullYear();
    var fecha_actual = String(anio + "-" + mes + "-" + dia);
    Nota_logroDao.findNotasLogrosByMateria(fecha_actual, req.params.id_estudiante).then(function(data) {
        respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function getMateriasEstudiante(req, res) {
    //MateriaDao.findMateriasByEstudiante
    /*var queri = "select id_materia, persona.nombre1,nombre2,apellido1,apellido2,"+ 
    "grado, grupo, nombre_materia,numero_periodo as perioso_actual "+ 
    "from estudiante natural join matricula natural join curso "+ 
    "join carga_docente on curso.id_curso = carga_docente.id_curso "+ 
    "natural join materia join periodo on periodo.id_periodo = carga_docente.id_periodo "+ 
    "join anio_lectivo on anio_lectivo.id_anio_lectivo=periodo.id_anio_lectivo "+ 
    "join docente on docente.id_docente = carga_docente.id_docente "+ 
    "join persona on docente.identificacion=persona.identificacion "+ 
    "where periodo.id_periodo = 1 and estudiante.id_estudiante = "+ 
    "(select estudiante.id_estudiante from usuario "+ 
    "natural join persona natural join estudiante where usuario.id_usuario = 1)";
	
    db.many(queri)*/
    MateriaDao.findMateriasByEstudiante(30011).then(function(data) {
        respuesta.sendJsonResponse(res, 200, data);
        console.log("la fucnion salio bn" + data)
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            respuesta.sendJsonResponse(res, 500, []);
        }
    });
}
//////esta va en todos se repite con docentes////
function getActividadesEstudiante(req, res) {
    /*var queri = "select id_actividad,id_logro,nombre_actividad,descripcion_actividad,porcentaje_actividad "+ 
    "from actividad where id_logro =  "+req.params.id_logro;
    db.many(queri)*/
    ActividadDao.findActividadesByLogro(req.params.id_logro).then(function(data) {
        console.log("la fucnion salio bn" + data)
        if ((data.length <= 0) || (!data)) {
            return respuesta.status(400).json({});
        } else {
            respuesta.sendJsonResponse(res, 200, data); //arrayName.length > 0
        }
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            respuesta.sendJsonResponse(res, 400, []);
        } else {
            console.log(err.message);
            respuesta.sendJsonResponse(res, 500, []);
        }
    });
}
///
function getLogrosEstudiante(req, res) {
    console.log("entro aqui a get Logros estudiantes");
    console
    LogroDao.findLogrosByMateriaAndPeriodo(30011, req.params.id_materia, req.params.id_periodo).then(function(data) {
        respuesta.sendJsonResponse(res, 200, data);
        console.log("la fucnion salio bn" + data)
            //cb(data)
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            respuesta.sendJsonResponse(res, 500, []);
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
        respuesta.sendJsonResponse(res, 200, data1);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function getNotificaciones(req, res) {
    NotificacionDao.findNotificacionesByEstudiante(req.body.id_estudiante).then(function(data) {
        console.log(req.body);
        respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function getNotificacionesPendientes(req, res) {
    NotificacionDao.findNotificacionesByEstudianteAndEstado(req.body.id_estudiante).then(function(data) {
        respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function getTiposNotificacion(req, res) {
    Tipo_notificacionDao.findTipoNotificacion().then(function(data) {
        respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function updateEstadoNotificacion(req, res) {
    NotificacionDao.updateEstadoNotificacion(req.body.id_notificacion).then(function(data) {
        respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function getNotasActividades(req, res) {
    Nota_actividadDao.findNotasActividadesByEstudiante(30011).then(function(data) {
        /*	var data1 = {};
		//(function(i){
			console.log("antes del for")
			for (var i = data.length - 1; i >= 0; i--) {

				data1[data[i].id_actividad] = data[i].nota_actividad;
			}
*/
        console.log(data)
        respuesta.sendJsonResponse(res, 200, data);
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            respuesta.sendJsonResponse(res, 200, []);
        } else {
            console.log(err.message);
            respuesta.sendJsonResponse(res, 500, []);
        }
    });
}

function getNotasActividadbyLogro(req, res) {
    Nota_actividadDao.findNotaActividadLogrobyEstudiante(30011, req.params.id_logro).then(function(data) {
        console.log("la fucnion salio bn" + data)
        if ((data.length <= 0) || (!data)) {
            return respuesta.status(400).json({});
        } else {
            respuesta.sendJsonResponse(res, 200, data); //arrayName.length > 0
        }
    }).catch(function(err) {
        if (err.message == 'No data returned from the query.') {
            respuesta.sendJsonResponse(res, 400, []);
        } else {
            console.log(err.message);
            respuesta.sendJsonResponse(res, 500, []);
        }
    });
}
/*
function getMateriasEstudiante(id_usuario, cb){
	var queri = "select identificacion, grado, grupo, nombre_materia from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia where estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario = "+id_usuario+")";
	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return next(err)
	})

}*/
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
}