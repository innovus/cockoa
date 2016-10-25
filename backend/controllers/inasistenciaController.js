"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var respuesta= require("../helpers/respuesta");


var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);
var pgp2 = require('pg-promise')();

var InasistenciaDao = require("../app_core/dao/inasistenciaDao");
var MateriaDao = require("../app_core/dao/materiaDao");
var NotificacionDao = require("../app_core/dao/notificacionDao");

function getCantidadInasistenciaMateria(req,res){
	InasistenciaDao.findCantidadInasistenciasBYMateria(30011)
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

//cantidad de inasistencias de una carga para un estudiante
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
//funcion que recibe un arreglo de inasistencias y las agrega en la base de datos
function addInasistencias (req,res){
	InasistenciaDao.addInasistencias(req.body)
	.then(function(){
		var notificaciones = [];
		//recorremos inasistencias para crear el arreglo de notificaciones por cada inassistencia agregada
		 req.body.forEach(function(inasistencia,index){
		 	var fecha = new Date(inasistencia.fecha_inasistencia)
		 	var notificacion = {'id_tipo_notificacion':1,'mensaje_notificacion':'Su hijo Falto en la fecha  del '+fecha.toLocaleDateString(),'id_estudiante':inasistencia.id_estudiante,'guia':inasistencia.id_carga}
		 	notificaciones.push(notificacion)
		 })
		 
		 console.log(notificaciones)
		 NotificacionDao.insertarNotificaciones(notificaciones)
		 .then(function(data){
			console.log("se envio notificacion")

		}).catch(function(error){
			console.log("error notificacion")
			console.log(error)
		})

		//manda la respuesta
		respuesta.sendJsonResponse(res,200,{'mensaje':'Inasistencias insertada'});
	}).catch(function(error){
		respuesta.sendJsonResponse(res,500,[]);
		console.log("Error" , error.message || error);
	});
	
}
function getMateriasWithInasistenciaByEstudiante(req,res){
	MateriaDao.findMateriasWithInasistenciaByEstudiante(30011)
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
}
function getInasistenciasByMateria(req,res){
	InasistenciaDao.findInasistenciasByMateria(30011,req.params.id_materia)
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
}