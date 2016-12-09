"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo';
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
//select nombre_materia,count(*) as materia from inasistencia join carga_docente on inasistencia.id_carga=carga_docente.id_carga_docente natural join materia where inasistencia.id_estudiante= (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario =  '1') GROUP BY nombre_materia ORDER BY nombre_materia ASC;


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

function addInasistencia (id_tipo_usuario,id_perdiodo,id_estudiante,estado_inasistencia, fecha_inasistencia, id_carga, cb){
	var queri = "insert into inasistencia(id_periodo,id_estudiante,estado_inasistencia, fecha_inasistencia, id_carga) values ("+id_periodo+", "+id_estudiante+", "+estado_inasistencia+", '"+fecha_inasistencia+"', "+id_carga+")";
	db.none(queri)
	.then(function(data){
		cb('{"message":"insertado"}')
	}).catch(function(err){
		return next(err);
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

function getInasistenciaCount(id_usuario, cb){
	var queri = "select id_materia,nombre_materia,count(*) as total_inasistencia from inasistencia join carga_docente on inasistencia.id_carga=carga_docente.id_carga_docente natural join materia where inasistencia.id_estudiante= (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario =  '"+id_usuario+"') GROUP BY nombre_materia,id_materia ORDER BY nombre_materia ASC";
	//"select numero_periodo, id_materia,id_logro, nombre_logro,descripcion_logro from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia join periodo on carga_docente.id_periodo = periodo.id_periodo join logro on logro.id_carga_docente=carga_docente.id_carga_docente where id_materia = '"+id_materia+"' and estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario =  "+id_usuario+") ORDER by numero_periodo";

	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return cb("")
	})


}

//select carga_docente.id_materia,nombre_materia, nombre1, nombre2, apellido1, apellido2, estado_inasistencia, fecha_inasistencia, numero_periodo from inasistencia join carga_docente on inasistencia.id_carga = carga_docente.id_carga_docente join materia on materia.id_materia = carga_docente.id_materia join periodo on periodo.id_periodo = carga_docente.id_periodo join docente on docente.id_docente = carga_docente.id_docente join persona on persona.identificacion = docente.identificacion where materia.id_materia='2' and inasistencia.id_estudiante= (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario =  '1')
function getInasistenciaMateria(id_usuario,id_materia, cb){
	var queri = "select carga_docente.id_materia,nombre_materia, nombre1, nombre2, apellido1, apellido2, estado_inasistencia, fecha_inasistencia, numero_periodo from inasistencia join carga_docente on inasistencia.id_carga = carga_docente.id_carga_docente join materia on materia.id_materia = carga_docente.id_materia join periodo on periodo.id_periodo = carga_docente.id_periodo join docente on docente.id_docente = carga_docente.id_docente join persona on persona.identificacion = docente.identificacion where materia.id_materia='"+id_materia+"' and inasistencia.id_estudiante= (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario =  "+id_usuario+") ORDER by fecha_inasistencia";
	//"select numero_periodo, id_materia,id_logro, nombre_logro,descripcion_logro from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia join periodo on carga_docente.id_periodo = periodo.id_periodo join logro on logro.id_carga_docente=carga_docente.id_carga_docente where id_materia = '"+id_materia+"' and estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario =  "+id_usuario+") ORDER by numero_periodo";

	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return cb("")
	})


}

module.exports = {
	getMiInasistencia: getMiInasistencia,
	addInasistencia: addInasistencia,
	getListadoEstudiantesCurso: getListadoEstudiantesCurso,
	getInasistenciaCount:getInasistenciaCount,
	getInasistenciaMateria:getInasistenciaMateria

}