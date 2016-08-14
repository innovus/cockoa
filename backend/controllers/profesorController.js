"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
//"pg-promise": "^3.9.1",
var pgp = require('pg-promise')(options);
var pgp2 = require('pg-promise')(); 
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
	var queri = "select * from actividad where id_logro  = "+id_logro + " order by id_actividad";
	db.many(queri)
	.then(function(data){ 
		console.log("la funion salio bn" + data);
		cb(data);
	}).catch(function(err){
		console.log('error: ' +err);
		cb([]);	
	});
}

/*
  id_estudiante:{
    id_logro:{
      id_actividad:nota_actividad,
      ............
  },
  ......
},
........
}
*/


function getNotasActividades(id_carga_docente,cb){
	var queri = "select  id_estudiante,id_logro, id_actividad, nota_actividad from actividad natural join nota_actividad natural join logro where id_carga_docente = "+id_carga_docente+" order by id_estudiante, id_logro";
	db.many(queri)
	.then(function(data){ 
		var estudiantes = {};
		var logros = {};
		var notas_actividades = {};
		var auxEstudiante=null;
		var auxLogro=null;
		for (var i =0; i < data.length; i++) {
			var estudiante = data[i].id_estudiante;
			var logro = data[i].id_logro;
			if(i==0){
				auxEstudiante = estudiante;
				auxLogro = logro
				//notas_actividades[data[i].id_actividad] = data[i].nota_actividad;
				//logros[data[i].id_logro] = notas_actividades;
			}

			if(estudiante != auxEstudiante){
					logros[auxLogro] = notas_actividades;

					//toca ver si va
					estudiantes[auxEstudiante] = logros;
					notas_actividades = {};
					logros = {}
					auxEstudiante = estudiante;
					auxLogro = logro;
					notas_actividades[data[i].id_actividad] = data[i].nota_actividad;
					
					//no va
					//logros[data[i].id_logro] = notas_actividades;

		

			}else{
				if(logro != auxLogro){
					logros[auxLogro] = notas_actividades;
					notas_actividades = {};
					auxLogro = logro;
					notas_actividades[data[i].id_actividad] = data[i].nota_actividad;

				}else{
					notas_actividades[data[i].id_actividad] = data[i].nota_actividad;
					



				}
			}
			if(i == (data.length-1)){

				//notas_actividades[data[i].id_actividad] = data[i].nota_actividad;
				logros[data[i].id_logro] =  notas_actividades;
				estudiantes[auxEstudiante]= logros;

			}
		}

		cb(estudiantes);
	}).catch(function(err){
		console.log('error: ' +err);
		cb([]);	
	});
}
//donde se organiza primero el id de el estudiante que tiene un objeto
//con los ids de logros y en cada id de logro tiene una nota

/*
{
  id_estudiante:{
    id_logro:nota_logro,
    .........
  },
  ........
}
*/

function updatePorcentajesActividades(data_multi,cb){
	console.log(data_multi);

	var queri= pgp2.helpers.update(data_multi,['?id_actividad','porcentaje_actividad'],'actividad') + 'WHERE v.id_actividad = t.id_actividad';
	db.none(queri)
	.then(function(){
		console.log("bien")
		cb({'status':0,'msg':'Todos los ingresos correctos'});

	})
	.catch(function(error){
		console.log(error)
		cb({'status':1,'msg':error});
	})

}

function prueba(cb){
	var dataSingle = {id_estado_docente: 2, descripcion_estado_docente: 'hello'};
	var dataMulti = [{'id_estado_docente': 2, 'descripcion_estado_docente': 'hello2'},{'id_estado_docente': 1, 'descripcion_estado_docente': 'hello1'}];
	var prueba = pgp2.helpers.update(dataMulti, ['?id_estado_docente', 'descripcion_estado_docente'], 'estado_docente') + ' WHERE v.id_estado_docente = t.id_estado_docente';
	console.log(prueba)
	prueba = prueba.replace('/"/',"");
	//prueba = prueba.replace('/\/',"");
	//console.log(mystring.replace(/,/g , ":"));
	console.log(prueba);
	cb(prueba);
}

//inserto la nota, mando en data_simple los campos que voy a ingresas,
// y en table el nombre de la tabla donde los voy a insertar
function insertNota(data_simple,table,cb){
	var queri= '';
	if(table == "logros"){
		queri= pgp2.helpers.insert(data_simple,null,'nota_logro');

	}else if(table == "actividades"){
		queri= pgp2.helpers.insert(data_simple,null,'nota_actividad');

	}
	db.none(queri)
	.then(function(){
		console.log("bien")
		cb({'status':0,'msg':'La nota se ingreso correctamente'});

	})
	.catch(function(error){
		console.log(error)
		cb({'status':1,'msg':error});
	})
}
function updateNota(data_simple,table,cb){
	var queri = "";

	if(table == "logros"){
		queri= pgp2.helpers.update(data_simple,['nota_logro'],'nota_logro') + " WHERE id_logro= "+ data_simple.id_logro +" and id_estudiante= '"+data_simple.id_estudiante+"'";

	}else if(table == "actividades"){
		queri = pgp2.helpers.update(data_simple,['nota_actividad'],'nota_actividad') + " WHERE id_actividad= "+ data_simple.id_actividad +" and id_estudiante= '"+data_simple.id_estudiante+"'";


	}
	console.log(queri);
	db.none(queri)
	.then(function(){
		console.log("bien")
		cb({'status':0,'msg':'La nota se actualizo correctamente'});

	})
	.catch(function(error){
		console.log(error)
		cb({'status':1,'msg':error});
	})
}

function getNotasLogros(id_carga_docente,cb){
	var queri = "select id_estudiante,id_logro, nota_logro from nota_logro natural join logro where id_carga_docente = "+id_carga_docente+" order by id_estudiante";
	db.many(queri)
	.then(function(data){ 

		var estudiantes = {};
		var notas_logros = {};

		//(function(i){
			console.log("antes del for")
			var aux = null;

			for (var i =0; i < data.length; i++) {

				var estudiante = data[i].id_estudiante;
				//si es diferente el estudiante al anterior, inserteme los datos 
				//con el id del anterior y los logros y borreme logros para el paso
				//al siguiente estudiante 
				if(i ==0){
					aux = estudiante;

				}

				if(estudiante != aux){
					estudiantes[aux]= notas_logros;
					notas_logros = {};
					aux = estudiante;
					notas_logros[data[i].id_logro] = data[i].nota_logro;

				}else{
					notas_logros[data[i].id_logro] = data[i].nota_logro;
				}
				if(i == (data.length-1)){
					
					//notas_logros[data[i].id_logro] = data[i].nota_logro;
					estudiantes[aux]= notas_logros;

				}

				
			}

		console.log(estudiantes)		
		cb(estudiantes)
		
	}).catch(function(err){
		console.log('error: ' +err);
		cb([]);	
	});
	
}


module.exports = {
	getCursosMaterias: getCursosMaterias,
	getCursosMateriasPorPeriodo: getCursosMateriasPorPeriodo,
	getLogros: getLogros,
	getActividades: getActividades,
	getNotasLogros: getNotasLogros,
	getNotasActividades: getNotasActividades,
	prueba: prueba,
	updatePorcentajesActividades:updatePorcentajesActividades,
	insertNota: insertNota,
	updateNota: updateNota
}

