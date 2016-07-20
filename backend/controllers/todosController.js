"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);



function getPeriodosDisponibles(fecha_actual,cb){
	var queri = "select id_periodo,numero_periodo from anio_lectivo natural join periodo where id_estado_anio_lectivo = 1 and fecha_inicio_periodo <= '" + fecha_actual+"'";
	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		if(err.message == 'No data returned from the query.'){
			cb([]);
		}else{
			console.log(err.message)
		}
	})

}

function getPeriodoActual(fecha_actual,cb){
	var queri = "select id_periodo, numero_periodo from  periodo where fecha_inicio_periodo <= '"+fecha_actual+"' and fecha_fin_periodo >= '" + fecha_actual+"'";
	console.log(queri)
	db.one(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		if(err.message == 'No data returned from the query.'){
			cb({});
		}else{
			console.log(err.message)
		}
	})

}
module.exports = {
	getPeriodosDisponibles: getPeriodosDisponibles,
	getPeriodoActual: getPeriodoActual
}