"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);

function getTipoUsuario(id, cb){
	db.one("select id_tipo_usuario "+
	 "from usuario "+
	 "where usuario.id_usuario = ${id}",
	 {
	 	id:id
	 })
	.then(function(data){
		console.log(data);
		cb(data)
	}).catch(function(err){
		console.log(err)
		return cb(err);
	})
}

//inasistencias de una carga
function getInasistenciasCarga(id_carga, cb){
	var prueba = "select nombre_materia, nombre1, nombre2, apellido1, apellido2, estado_inasistencia, fecha_inasistencia, numero_periodo "+
	 "from inasistencia "+
	 "join carga_docente on inasistencia.id_carga = carga_docente.id_carga_docente "+ 
	 "join usuario on usuario.id_usuario =  carga_docente.id_usuario "+
	 "join materia on materia.id_materia = carga_docente.id_materia "+
	 "join periodo on periodo.id_periodo = carga_docente.id_periodo "+
	 "join docente on docente.id_docente = carga_docente.id_docente "+
	 "join persona on persona.identificacion = docente.identificacion  where id_carga = "+id_carga;
	db.many(prueba)
	.then(function(data){
		console.log(prueba)
			console.log(data)
		cb(data)
	}).catch(function(err){
		console.log(err)
		return cb(err);
	})

}

//cantidad de inasistencias de una carga para un estudiante
function getCantidadInasistenciasCarga(id_carga, cb){

	var query = "select estudiante.id_estudiante, count(estudiante.id_estudiante) as cantidad from inasistencia "+
	 "right join estudiante on inasistencia.id_estudiante = estudiante.id_estudiante "+
	 "join carga_docente on inasistencia.id_carga = carga_docente.id_carga_docente "+
	 "where carga_docente.id_carga_docente = "+id_carga+" group by estudiante.id_estudiante";
	 db.many(query)
	.then(function(data){
		var data1 = {};
		//(function(i){
			console.log("antes del for")
			for (var i = data.length - 1; i >= 0; i--) {

				console.log("entro al for " + i )
				data1[data[i].id_estudiante] = data[i].cantidad;
			}

		console.log(data1)		
		cb(data1)
	}).catch(function(err){
		console.log(err)
		return cb({});
	})

}


function getMiInasistencia (id,cb){

	db.one("select nombre_materia, nombre1, nombre2, apellido1, apellido2, estado_inasistencia, fecha_inasistencia, numero_periodo "+
	 "from inasistencia "+
	 "join carga_docente on inasistencia.id_carga = carga_docente.id_carga_docente "+ 
	 "join usuario on usuario.id_usuario =  carga_docente.id_usuario "+
	 "join materia on materia.id_materia = carga_docente.id_materia "+
	 "join periodo on periodo.id_periodo = carga_docente.id_periodo "+
	 "join docente on docente.id_docente = carga_docente.id_docente "+
	 "join persona on persona.identificacion = docente.identificacion "+
	 "where usuario.id_usuario = ${id}",
	 {
	 	id:id
	 })
	.then(function(data){
		//console.log(data)
		cb(data)
	}).catch(function(err){
		console.log(err)
		return cb(err);
	})
}
function getInasistenciaPorCarga(id_carga,id_estudiante,cb){
	db.many("select id_inasistencia, fecha_inasistencia, estado_inasistencia from inasistencia"+
	 " where id_carga = ${id_carga} and id_estudiante = ${id_estudiante}",
	 {
	 	id_estudiante:id_estudiante,
	 	id_carga:id_carga
	 })
	.then(function(data){
		//console.log(data)
		cb(data)
	}).catch(function(err){
		console.log(err)
		return cb(err);
	})
}

function addInasistencia (id_tipo_usuario,id_periodo,id_estudiante,estado_inasistencia, fecha_inasistencia, id_carga, cb){
	var queri = "insert into inasistencia(id_periodo,id_estudiante,estado_inasistencia, fecha_inasistencia, id_carga) values ("+id_periodo+", "+id_estudiante+", "+estado_inasistencia+", '"+fecha_inasistencia+"', "+id_carga+")";
	console.log(queri)
	db.none(queri)
	.then(function(){
		
		cb({'mensaje':'Inasistencia insertada'})
	}).catch(function(error){
		console.log("Error" , error.message || error);
	});
	
}

function getListadoEstudiantesCurso(id_curso, cb){
	var queri = "select nombre1,nombre2, apellido1, apellido2 from curso join matricula on curso.id_curso = matricula.id_curso join estudiante on estudiante.id_estudiante = matricula.id_estudiante join persona on estudiante.identificacion = persona.identificacion where curso.id_curso = " + id_curso;
	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return next(err)
	})

}

module.exports = {
	getMiInasistencia: getMiInasistencia,
	getInasistenciasCarga: getInasistenciasCarga,
	addInasistencia: addInasistencia,
	getListadoEstudiantesCurso: getListadoEstudiantesCurso,
	getCantidadInasistenciasCarga: getCantidadInasistenciasCarga,
	getInasistenciaPorCarga: getInasistenciaPorCarga
}