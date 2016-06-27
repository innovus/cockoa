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
var hoy = new Date();	
	/*var dia = hoy.getDate(); 
	var mes = hoy.getMonth()+1;
	var anio= hoy.getFullYear();
	var fecha_actual = String(dia+"-"+mes+"-"+anio);	
	*/
	
	
	var queri = "select id_materia, persona.nombre1,nombre2,apellido1,apellido2, grado, grupo, nombre_materia,numero_periodo as perioso_actual from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia join periodo on periodo.id_periodo = carga_docente.id_periodo join anio_lectivo on anio_lectivo.id_anio_lectivo=periodo.id_anio_lectivo join docente on docente.id_docente = carga_docente.id_docente join persona on docente.identificacion=persona.identificacion where periodo.id_periodo = 1 and estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario = 1)";

	
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		console.log(err);
	})

}
function getLogrosEstudiante(id_usuario, id_materia,cb){
	console.log("entro a getLogrosEStudiantes");
	var queri = "select id_logro,id_nota_logro,porcentaje_logro, nombre_logro, descripcion_logro from nota_logro natural join logro natural join carga_docente where id_estudiante = '1' and id_materia = '"+id_materia+"' ";
	db.many(queri)
	.then(function(data){ 
		console.log("la fucnion salio bn" + data)
		cb(data)
	}).catch(function(err){
		console.log('error: ' +err)
		cb("");
		
	})

}
function getMateriasYLogrosE(id_usuario, cb){
	var queri = "select id_materia, persona.nombre1,nombre2,apellido1,apellido2, grado, grupo, nombre_materia,numero_periodo as perioso_actual from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia join periodo on periodo.id_periodo = carga_docente.id_periodo join anio_lectivo on anio_lectivo.id_anio_lectivo=periodo.id_anio_lectivo join docente on docente.id_docente = carga_docente.id_docente join persona on docente.identificacion=persona.identificacion where periodo.id_periodo = 1 and estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario = 1)";

	db.task(function (t){
		db.many(queri)
	.then(function(data){
		var materias = []
		var materia = data[0];
		//data.forEach(function (materia){
			console.log("entra al for" + JSON.stringify(materia))
			var aux = materia;
			
			queri = "select id_logro,id_nota_logro,porcentaje_logro, nombre_logro, descripcion_logro from nota_logro natural join logro natural join carga_docente where id_estudiante = '1' and id_materia = '"+materia.id_materia+"' ";
			db.many(queri)
			.then(function(logros){

			
      			aux['logros']= logros;
      			materias.push(aux);
      			console.log("materias ciclo" + JSON.stringify(materias))

			}).catch(function(err){
				console.log('error: ' +err)
				var dataLogros = {'logros':[]};
				aux['logros'] = dataLogros;
				materias.push(aux);
				console.log("materias ciclo" + JSON.stringify(materias))
				

			})

		//});
		console.log(materias);
		cb(materias)


	}).then(function(data){
		console.log(data);
	}).catch(function(err){
		console.log(err)
	})
})
	/*
	db.many(queri)
	.then(function(data){
		var materias = []
		data.forEach(function (materia){
			console.log("entra al for" + JSON.stringify(materia))
			var aux = materia;
			
			queri = "select id_logro,id_nota_logro,porcentaje_logro, nombre_logro, descripcion_logro from nota_logro natural join logro natural join carga_docente where id_estudiante = '1' and id_materia = '"+materia.id_materia+"' ";
			db.many(queri)
			.then(function(logros){

			
      			aux['logros']= logros;
      			materias.push(aux);
      			console.log("materias ciclo" + JSON.stringify(materias))

			}).catch(function(err){
				console.log('error: ' +err)
				var dataLogros = {'logros':[]};
				aux['logros'] = dataLogros;
				materias.push(aux);
				console.log("materias ciclo" + JSON.stringify(materias))
				

			})

		});
		console.log(materias);
		cb(materias)
	}).catch(function(err){
		console.log(err);
	})*/

}
/*
function getMateriasEstudiante(id_usuario, cb){
	var queri = "select identificacion, grado, grupo, nombre_materia from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia where estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario = "+id_usuario+")";
	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return next(err)
	})

}*/
module.exports = {
	getMateriasEstudiante: getMateriasEstudiante,
	getLogrosEstudiante: getLogrosEstudiante,
	getMateriasYLogrosE: getMateriasYLogrosE
}
