"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);



function getEstudiantesCurso(id_curso, cb){
	var queri = "select nombre1,nombre2, apellido1, apellido2, estudiante.id_estudiante from curso join matricula on curso.id_curso = matricula.id_curso join estudiante on estudiante.id_estudiante = matricula.id_estudiante join persona on estudiante.identificacion = persona.identificacion where curso.id_curso = " + id_curso;
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
module.exports = {
	getEstudiantesCurso: getEstudiantesCurso
}