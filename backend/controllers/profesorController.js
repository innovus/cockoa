"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);


function getCursosMaterias(id_usuario,fecha_actual,cb){
	
	var queri = "select id_carga_docente, id_docente, id_materia, nombre_materia, id_curso, grado, grupo from carga_docente natural join materia natural join curso where vigente_carga_docente = '1' and id_docente = '1' and id_periodo = (select distinct id_periodo from carga_docente natural join periodo where fecha_inicio_periodo <= '"+fecha_actual+"' and fecha_fin_periodo >= '"+fecha_actual+"' ) order by grado, grupo ";
	db.many(queri)
	.then(function(data){ 
		console.log("la funion salio bn" + data)
		cb(data)
	}).catch(function(err){
		console.log('error: ' +err)
		cb([]);	
	})

}
function getCursosMateriasPorPeriodo(id_usuario,id_periodo,cb){
	
	var queri = "select id_carga_docente, id_docente, id_materia, nombre_materia, id_curso, grado, grupo from carga_docente natural join materia natural join curso where vigente_carga_docente = '1' and id_docente = '1' and id_periodo = "+id_periodo+" order by grado, grupo ";
	db.many(queri)
	.then(function(data){ 
		console.log("la funion salio bn" + data);
		cb(data);
	}).catch(function(err){
		console.log('error: ' +err);
		cb([]);	
	});

}
function getLogros(id_carga,cb){
	var queri = "select * from logro where id_carga_docente = "+id_carga;
	db.many(queri)
	.then(function(data){ 
		console.log("la funion salio bn" + data);
		cb(data);
	}).catch(function(err){
		console.log('error: ' +err);
		cb([]);	
	});
}

function getActividades(id_logro,cb){
	var queri = "select * from actividad where id_logro = "+id_logro;
	db.many(queri)
	.then(function(data){ 
		console.log("la funion salio bn" + data);
		cb(data);
	}).catch(function(err){
		console.log('error: ' +err);
		cb([]);	
	});
}
function getNotasActividades(){
	
}


module.exports = {
	getCursosMaterias: getCursosMaterias,
	getCursosMateriasPorPeriodo: getCursosMateriasPorPeriodo,
	getLogros: getLogros,
	getActividades: getActividades
}

