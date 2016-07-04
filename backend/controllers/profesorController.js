"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);


function getCursosMaterias(id_usuario,cb){
	
	var queri = "select id_carga_docente, id_docente, id_materia, nombre_materia, id_curso, grado, grupo from carga_docente natural join materia natural join curso where vigente_carga_docente = '1' and id_docente = '1' order by grado, grupo ";
	db.many(queri)
	.then(function(data){ 
		console.log("la funion salio bn" + data)
		cb(data)
	}).catch(function(err){
		console.log('error: ' +err)
		cb([]);	
	})

}


module.exports = {
	getCursosMaterias: getCursosMaterias
}

