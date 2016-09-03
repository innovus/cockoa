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


//inasistencias de una carga
function getInasistenciasCarga(id_carga){

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

function addInasistencias (req,res){

	var queri = pgp.helpers.insert(req.body, ['id_periodo', 'id_estudiante','estado_inasistencia','fecha_inasistencia','id_carga'], 'inasistencia');
	db.none(queri)
	.then(function(){
		respuesta.sendJsonResponse(res,200,{'mensaje':'Inasistencias insertada'});
	}).catch(function(error){
		respuesta.sendJsonResponse(res,500,[]);
		console.log("Error" , error.message || error);
	});
	
}


module.exports = {
	getMiInasistencia: getMiInasistencia,
	getInasistenciasCarga: getInasistenciasCarga,
	addInasistencias: addInasistencias,
	getCantidadInasistenciasCarga: getCantidadInasistenciasCarga,
	getInasistenciaPorCarga: getInasistenciaPorCarga
}