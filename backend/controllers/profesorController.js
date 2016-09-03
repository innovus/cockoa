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
var respuesta= require("../helpers/respuesta");

var carga_docenteDao = require("../app_core/dao/carga_docenteDao");
var logroDao = require("../app_core/dao/logroDao");
var actividadDao = require("../app_core/dao/actividadDao");
var Nota_logroDao = require("../app_core/dao/nota_logroDao");
var Nota_actividadDao = require("../app_core/dao/nota_actividadDao");

function getCursosMaterias(req,res){
	var hoy = new Date();
	var dia = hoy.getDate(); 
	var mes = hoy.getMonth()+1;
	var anio= hoy.getFullYear();
	var fecha_actual = String(anio+"-"+mes+"-"+dia);

	carga_docenteDao.findCursosMateriasByFechaActual(fecha_actual)
	.then(function(data){
		respuesta.sendJsonResponse(res,200,data);
		console.log("la fucnion salio bn" + data)

	}).catch(function(err){
		if(err.message == 'No data returned from the query.'){
			respuesta.sendJsonResponse(res,200,[]);
		}else{
			console.log(err.message);
			respuesta.sendJsonResponse(res,500,[]);
		}
	});

}
function getCursosMateriasPorPeriodo(req,res){
	carga_docenteDao.findCursosMateriasByPeriodo(req.params.id_periodo)
	.then(function(data){
		respuesta.sendJsonResponse(res,200,data);
		console.log("la fucnion salio bn" + data)

	}).catch(function(err){
		if(err.message == 'No data returned from the query.'){
			respuesta.sendJsonResponse(res,200,[]);
		}else{
			console.log(err.message);
			respuesta.sendJsonResponse(res,500,[]);
		}
	});
}
function getLogros(req,res){
	logroDao.findLogrosByCargaDocente(req.params.id_carga)
	.then(function(data){
		respuesta.sendJsonResponse(res,200,data);
		console.log("la fucnion salio bn" + data)

	}).catch(function(err){
		if(err.message == 'No data returned from the query.'){
			respuesta.sendJsonResponse(res,200,[]);
		}else{
			console.log(err.message);
			respuesta.sendJsonResponse(res,500,[]);
		}
	});
}

 
function getActividades(req,res){
	actividadDao.findActividadesByLogro(req.params.id_logro)
	.then(function(data){
		respuesta.sendJsonResponse(res,200,data);
		console.log("la fucnion salio bn" + data)

	}).catch(function(err){
		if(err.message == 'No data returned from the query.'){
			respuesta.sendJsonResponse(res,200,[]);
		}else{
			console.log(err.message);
			respuesta.sendJsonResponse(res,500,[]);
		}
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

function getNotasActividades(req,res){
	Nota_actividadDao.findNotasActividadesByCarga(req.params.id_carga)
	.then(function(data){ 
		var estudiantes = {};
		var logros = {};
		var notas_actividades = {};
		var auxEstudiante=null;
		var auxLogro=null;

		//inicia for que recorre la consulta
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

		respuesta.sendJsonResponse(res,200,estudiantes);
		
	}).catch(function(err){
		if(err.message == 'No data returned from the query.'){
			respuesta.sendJsonResponse(res,200,[]);
		}else{
			console.log(err.message);
			respuesta.sendJsonResponse(res,500,[]);
		}
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

function updatePorcentajesActividades(req,res){
	//console.log(data_multi);

	/*var queri= pgp2.helpers.update(req.body,['?id_actividad','porcentaje_actividad'],'actividad') + 'WHERE v.id_actividad = t.id_actividad';
	console.log(queri);
	db.none(queri)
	*/
	actividadDao.updatePorcentajesActividades(req.body)
	.then(function(){
		
		respuesta.sendJsonResponse(res,200,{'status':0,'msg':'Todos los ingresos correctos'})		

	})
	.catch(function(error){
		console.log(error)
		respuesta.sendJsonResponse(res,500,{'status':1,'msg':error})
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
function insertNota(req,res){
	var queri= '';
	if(req.params.table == "logros"){
		queri= pgp2.helpers.insert(req.body,null,'nota_logro');

	}else if(req.params.table == "actividades"){
		queri= pgp2.helpers.insert(req.body,null,'nota_actividad');

	}
	db.none(queri)
	.then(function(){
		console.log("bien")
		respuesta.sendJsonResponse(res,200,{'status':0,'msg':'La nota se ingreso correctamente'})		

	})
	.catch(function(error){
		console.log(error)
		respuesta.sendJsonResponse(res,500,{'status':1,'msg':error})
	})
}


function updateNota(req,res){
	var queri = "";

	if(req.params.table == "logros"){
		queri= pgp2.helpers.update(req.body,['nota_logro'],'nota_logro') + " WHERE id_logro= "+ req.params.id_logro +" and id_estudiante= '"+req.params.id_estudiante+"'";

	}else if(req.params.table == "actividades"){
		queri = pgp2.helpers.update(req.body,['nota_actividad'],'nota_actividad') + " WHERE id_actividad= "+ req.params.id_actividad +" and id_estudiante= '"+req.params.id_estudiante+"'";
	}
	console.log(queri);
	db.none(queri)
	.then(function(){
		console.log("bien")
		respuesta.sendJsonResponse(res,200,{'status':0,'msg':'La nota se actualizo correctamente'})		

	})
	.catch(function(error){
		console.log(error)
		respuesta.sendJsonResponse(res,500,{'status':1,'msg':error})
	})
}

function getNotasLogros(req,res){
	Nota_logroDao.findNotasLogrosByCarga(req.params.id_carga)
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

		respuesta.sendJsonResponse(res,200,estudiantes);
		console.log(estudiantes);
		
	}).catch(function(err){
		if(err.message == 'No data returned from the query.'){
			respuesta.sendJsonResponse(res,200,[]);
		}else{
			console.log(err.message);
			respuesta.sendJsonResponse(res,500,[]);
		}
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

