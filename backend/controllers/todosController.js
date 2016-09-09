"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var PeriodoDao = require("../app_core/dao/periodoDao");

var respuesta= require("../helpers/respuesta");


function getPeriodosDisponibles(req,res){
	var hoy = new Date();
	var dia = hoy.getDate(); 
	var mes = hoy.getMonth()+3;
	var anio= hoy.getFullYear();
	var fecha_actual = String(anio+"-"+mes+"-"+dia);

	/*var queri = "select id_periodo,numero_periodo from anio_lectivo natural join periodo where id_estado_anio_lectivo = 1 and fecha_inicio_periodo <= '" + fecha_actual+"'";
	console.log(queri)
	db.many(queri)*/

	PeriodoDao.findPeriodosDisponibles(fecha_actual)
	.then(function(data){
		respuesta.sendJsonResponse(res,200,data);
	}).catch(function(err){
		if(err.message == 'No data returned from the query.'){
			respuesta.sendJsonResponse(res,200,{});
		}else{
			console.log(err.message);
			respuesta.sendJsonResponse(res,500,{});
		}
	})

}

function getPeriodoActual(req,res){
	var hoy = new Date();
  	var dia = hoy.getDate(); 
  	var mes = hoy.getMonth()-1;
  	var anio= hoy.getFullYear();
  	var fecha_actual = String(anio+"-"+mes+"-"+dia);
  	console.log(fecha_actual)

	PeriodoDao.findPeriodoActual(fecha_actual)
	.then(function(data){
		respuesta.sendJsonResponse(res,200,data);
	}).catch(function(err){
		if(err.message == 'No data returned from the query.'){
			respuesta.sendJsonResponse(res,200,{});
		}else{
			console.log(err.message);
			respuesta.sendJsonResponse(res,500,{});
		}
	})

}
module.exports = {
	getPeriodosDisponibles: getPeriodosDisponibles,
	getPeriodoActual: getPeriodoActual
}