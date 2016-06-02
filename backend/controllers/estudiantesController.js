"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);



function getMateriasEstudiante(id_usuario, cb){
	var queri = "select identificacion, grado, grupo, nombre_materia from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia where estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario = "+id_usuario+")";
	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return next(err)
	})

}
module.exports = {
	getMateriasEstudiante: getMateriasEstudiante
}
