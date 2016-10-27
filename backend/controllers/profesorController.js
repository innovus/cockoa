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
var request = require('request');

var carga_docenteDao = require("../app_core/dao/carga_docenteDao");
var LogroDao = require("../app_core/dao/logroDao");
var ActividadDao = require("../app_core/dao/actividadDao");
var Nota_logroDao = require("../app_core/dao/nota_logroDao");
var Nota_actividadDao = require("../app_core/dao/nota_actividadDao");
var NotificacionDao = require("../app_core/dao/notificacionDao");
var DispositivoDao = require("../app_core/dao/dispositivoDao");


function getCursosMaterias(req,res){
	var hoy = new Date();
	var dia = hoy.getDate(); 
	var mes = hoy.getMonth();
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
	LogroDao.findLogrosByCargaDocente(req.params.id_carga)
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
	ActividadDao.findActividadesByLogro(req.params.id_logro)
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

function getActividadesByLogros(req,res){
	ActividadDao.findActividadesByLogros(req.body)
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
		/*for (var i =0; i < data.length; i++) {
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
		}*/

		//respuesta.sendJsonResponse(res,200,estudiantes);
		respuesta.sendJsonResponse(res,200,data);
		
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

function updateActividades(req,res){
	/*var sumatoria = 0;
	console.log(req.body)
	req.body.forEach(function(actividad,index){
		sumatoria = sumatoria + parseFloat(actividad.porcentaje_actividad);
   });
	if(sumatoria != 100) {
		console.log("sumatoria != 100")
		respuesta.sendJsonResponse(res,500,{'status':2,'msg':'La sumatoria debe ser 100%'})

	}else{*/
		ActividadDao.updateActividades(req.body)
		.then(function(){	
			respuesta.sendJsonResponse(res,200,{'status':0,'msg':'Todos los ingresos correctos'})		
		})
		.catch(function(error){
			console.log(error)
			respuesta.sendJsonResponse(res,500,{'status':1,'msg':error})
		})
	//}
	

}
function updatePorcentajesLogros(req,res){
	var sumatoria = 0;
	req.body.forEach(function(logro,index){
		sumatoria = sumatoria + parseFloat(logro.porcentaje_logro);
   });
	console.log(sumatoria)
	if(sumatoria != 100) {
		respuesta.sendJsonResponse(res,500,{'status':2,'msg':'La sumatoria debe ser 100%'})

	}else{
		LogroDao.updatePorcentajesLogros(req.body)
		.then(function(){	
			respuesta.sendJsonResponse(res,200,{'status':0,'msg':'Todos los ingresos correctos'})		
		})
		.catch(function(error){
			console.log(error)
			respuesta.sendJsonResponse(res,500,{'status':1,'msg':error})
		})
	}
	

}

function prueba(cb){
	var dataSingle = {id_estado_docente: 2, descripcion_estado_docente: 'hello'};
	var dataMulti = [{'id_estado_docente': 2, 'descripcion_estado_docente': 'hello2'},{'id_estado_docente': 1, 'descripcion_estado_docente': 'hello1'}];
	var prueba = pgp2.helpers.update(dataMulti, ['?id_estado_docente', 'descripcion_estado_docente'], 'estado_docente') + ' WHERE v.id_estado_docente = t.id_estado_docente';
	console.log(prueba)
	prueba = prueba.replace('/"/',"");
	console.log(prueba);
	cb(prueba);
}

//inserto la nota, mando en data_simple los campos que voy a ingresas,
// y en table el nombre de la tabla donde los voy a insertar
function insertNota(req,res){
	console.log("Entro a inserNota")
	
	if(req.params.table == "logros"){
		console.log("es logros")

		Nota_logroDao.insertNotasLogros(req.body)
		.then(function(){



			respuesta.sendJsonResponse(res,200,{'status':0,'msg':'Todos los ingresos correctos'})		
		})
		.catch(function(error){
			console.log(error)
			respuesta.sendJsonResponse(res,500,{'status':1,'msg':error})
		})
	}else if(req.params.table == "actividades"){
		Nota_actividadDao.insertNotasActividades(req.body)
		.then(function(){	
			var mensajeNotificacion = 'Su hijo obtuvo una nota de '+req.body[0].nota_actividad
			var notificacion = {'id_tipo_notificacion':2,'mensaje_notificacion':mensajeNotificacion,'id_estudiante':req.body[0].id_estudiante,'guia':req.body[0].id_actividad}
			console.log(notificacion)
			NotificacionDao.insertarNotificacion(notificacion)
			.then(function(data){
				console.log("exito notificacion insert")
				DispositivoDao.findTokenByEstudiante(req.body[0].id_estudiante)	
				.then(function(tokens){
					var registrations_ids=[];
					console.log(tokens)

					if((tokens.length!=0)||(tokens)){
						var json = null;
						
						tokens.forEach(function(token,index){
							registrations_ids.push(token.token_dispositivo);
						});
						var json = { "registration_ids": registrations_ids,
							"notification":{
								"title":"Nueva Nota",
 								"body":mensajeNotificacion
 							},
 							"data": {
   								"codigo":req.body[0].id_actividad		
 							}
  						}
					var options = {
					uri: 'https://fcm.googleapis.com/fcm/send',
  					method: 'POST',
  					headers: {
  						"Content-Type": "application/json",
  						"Authorization": "key=AIzaSyDdDo5XLcuuJyQh_crrOdXjYSfYDbsnogU"
  					},
  					json: json
				};
				console.log(options)
				request(options, function (error, response, body) {
					//console.log(response)
					console.log(body)
					console.log(error)
					/*if (!error && response.statusCode == 200) {
						console.log(body.id) // Print the shortened url.
					}*/
				});
				}
				}).catch(function(error){
					console.log(error);
				})


				
				console.log("se envio notificacion")

			}).catch(function(error){
				console.log("error notificacion")
				console.log(error)

			})
			respuesta.sendJsonResponse(res,200,{'status':0,'msg':'Todos los ingresos correctos'})		
		})
		.catch(function(error){
			console.log(error)
			respuesta.sendJsonResponse(res,500,{'status':1,'msg':error})
		})
	}
}


function updateNota(req,res){
	console.log("Entro a updateNota")

	if(req.params.table == "logros"){
		Nota_logroDao.updateNotaLogro(req.body)
		.then(function(){	
			respuesta.sendJsonResponse(res,200,{'status':0,'msg':'Actualizo la nota con exito'})		
		})
		.catch(function(error){
			console.log(error)
			respuesta.sendJsonResponse(res,500,{'status':1,'msg':error})
		})
		
	}else if(req.params.table == "actividades"){
		Nota_actividadDao.updateNotaActividad(req.body)
		.then(function(){	
			respuesta.sendJsonResponse(res,200,{'status':0,'msg':'Actualizo la nota con exito'})		
		})
		.catch(function(error){
			console.log(error)
			respuesta.sendJsonResponse(res,500,{'status':1,'msg':error})
		})
	}

}
function deleteLogro(req,res){
	console.log("Eliminar Logro");
	LogroDao.deleteLogro(req.params.id_logro)
	.then(function(){
		respuesta.sendJsonResponse(res,200,{'status':0,'msg':'Elimino el logro con exito'})
	})
	.catch(function(error){
			console.log(error)
			respuesta.sendJsonResponse(res,500,{'status':1,'msg':error})
		})

}
function deleteActividad(req,res){
	console.log("Eliminar Actividad");
	ActividadDao.deleteActividad(req.params.id_actividad)
	.then(function(){
		respuesta.sendJsonResponse(res,200,{'status':0,'msg':'Elimino la actividad con exito'})
	})
	.catch(function(error){
			console.log(error)
			respuesta.sendJsonResponse(res,500,{'status':1,'msg':error})
		})

}

function deleteActividades(req,res){
	console.log("Eliminar Actividad");
	ActividadDao.deleteActividades(req.body)
	.then(function(){
		respuesta.sendJsonResponse(res,200,{'status':0,'msg':'Elimino la actividad con exito'})
	})
	.catch(function(error){
		console.log(error)
		respuesta.sendJsonResponse(res,500,{'status':1,'msg':error})
	})
}

function updateDescripcionLogro(req,res){
	LogroDao.updateDescripcionLogro(req.body)
	.then(function(){
		respuesta.sendJsonResponse(res,200,{'status':0,'msg':'Actualizo el Logro con exito'})		

	}).catch(function(){
		respuesta.sendJsonResponse(res,500,{'status':0,'msg':'Se produjo un erro en la actualizacion'})		

	})

}
function createActividad(req,res){
	ActividadDao.createActividad(req.body)
	.then(function(actividad){
		console.log(actividad)
		respuesta.sendJsonResponse(res,200,{'id_actividad':actividad[0],'status':0,'msg':'Se agrego la actividad con exito'})		

	}).catch(function(){
		respuesta.sendJsonResponse(res,500,{'status':0,'msg':'Se produjo un error'})		

	})
}
function createActividades(req,res){
	ActividadDao.createActividades(req.body)
	.then(function(actividad){
		console.log(actividad)
		respuesta.sendJsonResponse(res,200,{'status':0,'msg':'Se agrego la actividad con exito'})		

	}).catch(function(){
		respuesta.sendJsonResponse(res,500,{'status':0,'msg':'Se produjo un error'})		

	})
}
function createLogro(req,res){
	LogroDao.createLogro(req.body)
	.then(function(logro){
		
		respuesta.sendJsonResponse(res,200,{'id_logro':logro[0],'status':0,'msg':'Se agrego el logro con exito'})		

	}).catch(function(){
		respuesta.sendJsonResponse(res,500,{'status':0,'msg':'Se produjo un error'})		

	})
}
function updateDescripcionActividad(req,res){
	ActividadDao.updateDescripcionActividad(req.body)
	.then(function(){
		respuesta.sendJsonResponse(res,200,{'status':0,'msg':'Se actualizo la actividad con exito'})		

	}).catch(function(){
		respuesta.sendJsonResponse(res,500,{'status':0,'msg':'Se produjo un error'})		

	})

}
function getActividadById(req,res){
	ActividadDao.findActividadById(req.params.id_actividad)
	.then(function(data){
		respuesta.sendJsonResponse(res,200,data);

	}).catch(function(error){
		respuesta.sendJsonResponse(res,500,{});

	})
} function guardarLogrosTransaccion (req,res){
	console.log("logrosEliminadas")
	console.log(req.body.logrosEliminados)

	console.log("logros")
	console.log(req.body.logros)

	var deleteA = req.body.logrosEliminados;
	var updateA = [];
	var createA = [];

	req.body.logros.forEach(function(logro,index){
		if(logro.tipo == 1){
			updateA.push(logro);

		}else if(logro.tipo == 0){
			createA.push(logro)

		}
		
   });
	console.log("deleteA")
	console.log(deleteA);
	console.log("updateA")
	console.log(updateA);
	console.log("createA")
	console.log(createA);

	LogroDao.guardarLogrosTransaccion(deleteA,updateA,createA,function(bien,error){
		if(bien == null){
			respuesta.sendJsonResponse(res,500,error);


		}else{
			respuesta.sendJsonResponse(res,200,bien);

		}
		
	})

}

function guardarActividadesTransaccion(req,res){
	console.log("actividadesEliminadas")
	console.log(req.body.actividadesEliminadas)

	console.log("actividades")
	console.log(req.body.actividades)

	var deleteA = req.body.actividadesEliminadas;
	var updateA = [];
	var createA = [];

	req.body.actividades.forEach(function(actividad,index){
		if(actividad.tipo == 1){
			updateA.push(actividad);

		}else if(actividad.tipo == 0){
			createA.push(actividad)

		}
		
   });
	console.log("deleteA")
	console.log(deleteA);
	console.log("updateA")
	console.log(updateA);
	console.log("createA")
	console.log(createA);



	ActividadDao.guardarActividadesTransaccion(deleteA,updateA,createA,function(bien,error){
		if(bien == null){
			respuesta.sendJsonResponse(res,500,error);


		}else{
			respuesta.sendJsonResponse(res,200,bien);

		}
		
	})
}


function getNotasLogros(req,res){
	Nota_logroDao.findNotasLogrosByCarga(req.params.id_carga)
	.then(function(data){ 
		var estudiantes = {};
		var notas_logros = {};

		//(function(i){
		/*	console.log("antes del for")
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
		*/
		respuesta.sendJsonResponse(res,200,data);
		
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
	updateActividades:updateActividades,
	insertNota: insertNota,
	updateNota: updateNota,
	updateDescripcionLogro: updateDescripcionLogro,
	createActividad: createActividad,
	createActividades: createActividades,
	updateDescripcionActividad: updateDescripcionActividad,
	getActividadesByLogros:getActividadesByLogros,
	deleteLogro:deleteLogro,
	deleteActividad:deleteActividad,
	updatePorcentajesLogros:updatePorcentajesLogros,
	createLogro: createLogro,
	getActividadById:getActividadById,
	deleteActividades: deleteActividades,
	guardarActividadesTransaccion:guardarActividadesTransaccion,
	guardarLogrosTransaccion: guardarLogrosTransaccion,

}

