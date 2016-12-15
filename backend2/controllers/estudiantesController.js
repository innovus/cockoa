"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo';
var db = pgp(connectionString);

				//select identificacion, grado, grupo, nombre_materia,numero_periodo,id_estado_anio_lectivo from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia join periodo on periodo.id_periodo = carga_docente.id_periodo join anio_lectivo on anio_lectivo.id_anio_lectivo=periodo.id_anio_lectivo where periodo.id_periodo = (select  count(numero_periodo) as numero_periodos from periodo natural join anio_lectivo  where id_estado_anio_lectivo = '1' and fecha_inicio_perido <= '13-06-2016 19:40:27') and estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario = '1');
				//"select identificacion, grado, grupo, nombre_materia from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia where estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario = "+id_usuario+")";
	

function getMateriasEstudiantes(id_usuario, cb){
    var hoy = new Date();	
	var dia = hoy.getDate(); 
	var mes = hoy.getMonth()+1;
	var anio= hoy.getFullYear();
	var fecha_actual = String(dia+"-"+mes+"-"+anio);	
	
	
	var queri = "select id_materia,persona.nombre1,nombre2,apellido1,apellido2, grado, grupo, nombre_materia,numero_periodo as periodo_actual from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia join periodo on periodo.id_periodo = carga_docente.id_periodo join anio_lectivo on anio_lectivo.id_anio_lectivo=periodo.id_anio_lectivo join docente on docente.id_docente = carga_docente.id_docente join persona on docente.identificacion=persona.identificacion where id_estado_anio_lectivo = 1 and periodo.numero_periodo = (select  count(numero_periodo) as numero_periodos from periodo natural join anio_lectivo  where id_estado_anio_lectivo = '1' and fecha_inicio_periodo <= '"+fecha_actual+"') and estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario = "+id_usuario+")";

	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return cb("")
	})

}
//select * from logro  join carga_docente on carga_docente.id_carga_docente=logro.id_carga_docente join periodo on carga_docente.id_periodo=periodo.id_periodo where id_curso = 1 and id_materia = '1' and id_docente='1' and numero_periodo=(select  count(numero_periodo) as numero_periodos from periodo natural join anio_lectivo  where id_estado_anio_lectivo = '1' and fecha_inicio_perido <= '19/07/2016');


function getLogroMateria(id_usuario, cb){
	var queri = "select id_periodo, id_materia,id_logro, nombre_logro,descripcion_logro from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia natural join logro where id_materia = '1' and estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario =  "+id_usuario+")";

	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return next(err)
	})

}

function getNotaLogros(id_usuario, cb){
	var queri = "select id_periodo, id_materia,id_logro, nombre_logro,descripcion_logro, nota_logro from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia natural join logro natural join nota_logro where id_materia = '1'and id_logro = '100' and estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario =  "+id_usuario+")";

	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return next(err)
	})

}

function getLogroMateriaId(id_usuario,id_materia, cb){
	var hoy = new Date();	
	var dia = hoy.getDate(); 
	var mes = hoy.getMonth()+1;
	var anio= hoy.getFullYear();
	var fecha_actual = String(dia+"-"+mes+"-"+anio);	
	var queri = "select numero_periodo, id_materia,id_logro, descripcion_logro,nota_logro,porcentaje_logro from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia join periodo on carga_docente.id_periodo = periodo.id_periodo join logro on logro.id_carga_docente=carga_docente.id_carga_docente natural join nota_logro join anio_lectivo on anio_lectivo.id_anio_lectivo=periodo.id_anio_lectivo where  id_estado_anio_lectivo = 1 and vigente_logro ='S' and fecha_inicio_periodo <= '4/10/2016' and estudiante.identificacion = '1193479112' order by numero_periodo desc"//select numero_periodo, id_materia,id_logro, descripcion_logro from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia join periodo on carga_docente.id_periodo = periodo.id_periodo join logro on logro.id_carga_docente=carga_docente.id_carga_docente join anio_lectivo on anio_lectivo.id_anio_lectivo=periodo.id_anio_lectivo where id_materia = '"+id_materia+"'  and id_estado_anio_lectivo = 1 and vigente_logro ='S' and fecha_inicio_periodo <= '"+fecha_actual+"' and estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario =  "+id_usuario+") ORDER by numero_periodo  desc";

	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return cb("")
	})


}

function getLogroMateriaPeriodoId(id_usuario,id_materia,numero_periodo, cb){
	var queri = "select numero_periodo, id_materia,id_logro, descripcion_logro from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia join periodo on carga_docente.id_periodo = periodo.id_periodo join logro on logro.id_carga_docente=carga_docente.id_carga_docente where id_materia = '"+id_materia+"' and numero_periodo= '"+numero_periodo+"'  and vigente_logro = 'S'and estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario =  "+id_usuario+") ORDER by numero_periodo";

	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return cb("")
	})


}

function getNotaLogroId(id_usuario,id_materia,id_logro, cb){
	var queri = "select id_materia,nombre_materia,id_logro, nombre_logro,descripcion_logro, nota_logro,nombre_actividad,descripcion_actividad,nota_actividad from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia natural join logro natural join nota_logro natural join actividad natural join nota_actividad where id_materia = '"+id_materia+"' and id_logro = '"+id_logro+"' and estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario =  "+id_usuario+")";

	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return cb("")
	})

}

/*sql = "select * from logro;"
		db.many(sql)
		.then(function(logro){
			var logros = []
		var logros = logro[0];
		console.log("entra al for de logro: " + JSON.stringify(logros));

			}).catch(function(err){
		return next(err)
		
	})*/

function getNotaLogro(id_usuario, cb){
	var queri = "select id_materia, persona.nombre1,nombre2,apellido1,apellido2, grado, grupo, nombre_materia,numero_periodo as perioso_actual from estudiante natural join matricula natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural join materia join periodo on periodo.id_periodo = carga_docente.id_periodo join anio_lectivo on anio_lectivo.id_anio_lectivo=periodo.id_anio_lectivo join docente on docente.id_docente = carga_docente.id_docente join persona on docente.identificacion=persona.identificacion where periodo.id_periodo = 1 and estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural join persona natural join estudiante where usuario.id_usuario = 1)";
	var sql = "";
	var suma = 0;
	
	var m=0;
	db.task(function (t){
		db.many(queri)
		//return t.many(queri)
		.then(function(data){			
			var materiax = [];
            var dataLogros = {'logros':[]};
            var me = 0;
            var carl = [];
				/*for(m; m<data.length;m++){
					var juan = data[m];
					 var count = juan;
			        console.log("x materid :  " + data.length);
				      sql = "select * from materia where id_materia='"+ juan.id_materia+"';"
			      	db.many(sql)
					.then(function(logros){

						carl = logros[0];

                      /*  me = me+logros.length;
                        console.log("x for:  " + me);
                                               console.log("x for:  " + carl.id_materia);

           
                        	var name = data[0];
							var count = name;
							count['mama']= logros;
							materiax.push(count);

							console.log("materiax:  " + logros);

				    
					}).catch(function(err){
							return next(err)
			   		   })
									    //count['mama']= dataLogros;

					//materiax.push(count);
				}*/
				/*for(var i=0;i<3;i++){
					sql = "select * from materia";
			     return db.many(sql)
					.then(function(logros){
						materiax = logros;
					
							return materiax;
						
						
					});

				}*/
				return data.forEach(function (materia){
					sql = "select * from materia";
					return db.many(sql)
					.then(function(logros){
						return materiax = logros;					
					});
					//materiax = materia;					
				});

				

					
        return materiax;
				//return "";
			//cb(materiax)

		});
	/*db.task(function (t) {
        // this = t = task protocol context;
        // this.ctx = task config + state context;
        return t.one("select * from users where id=$1", 123)
            .then(function (user) {
                return t.any("select * from events where login=$1", user.name);
            });
    })
    .then(function (events) {
        // success;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message || error);    
    });*/
	/* return t.many(queri)
            .then(function (user) {
            	var materiax = [];            	
            	//console.log("si tu :"+name.id_materia);
            for(var i=0; i<3;i++){
            	var name = user[i];
            	console.log("si tu :"+i);
            	/*return t.many("select * from materia ").then(function (nombre){               	
                    var dataLogros = {'logros':[]};
                    for(var m=0; m<user.length;m++){
                    	var juan = user[m];
						var count = juan;
						count['mama']= nombre;
						materiax.push(count);
                    }           		
            		return materiax;
            		//return materiax;
                });
                //return user;
            }

              

            });*/
       /* return t.many(queri)
		.then(function(data){	
		   return data;

            });*/

            

	}).then(function(events){
		cb(events);
		console.log(events);
	}).catch(function(err){
		console.log(err)
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

module.exports = {
	getMateriasEstudiantes: getMateriasEstudiantes,
	getLogroMateria: getLogroMateria,
	getNotaLogro: getNotaLogro,
    getLogroMateriaId: getLogroMateriaId,
    getNotaLogroId: getNotaLogroId,
    getLogroMateriaPeriodoId: getLogroMateriaPeriodoId,
    getMateriasYLogrosE:getMateriasYLogrosE


}
