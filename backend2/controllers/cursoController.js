"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo';
var db = pgp(connectionString);
var pgp2 = require('pg-promise')();





function getEstudiantesCurso(id_curso, cb){
	//select id_curso,grado,grupo,id_materia,nombre_materia from carga_docente join docente on docente.id_docente= carga_docente.id_docente join usuario on usuario.identificacion=docente.identificacion join persona on persona.identificacion= usuario.identificacion natural join materia natural join curso where usuario.id_usuario='5' Group by id_curso,id_materia,nombre_materia,grado,grupo;

	var queri = "select nombre1,nombre2, apellido1, apellido2, estudiante.id_estudiante from curso join matricula on curso.id_curso = matricula.id_curso join estudiante on estudiante.id_estudiante = matricula.id_estudiante join persona on estudiante.identificacion = persona.identificacion where curso.id_curso = " + id_curso;
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return cb("")
	})

}

function getCursosMaterias(id_usuario,cb){
	
	var queri = "select docente.id_docente,id_materia,nombre_materia,id_curso,grado,grupo from carga_docente join docente on docente.id_docente= carga_docente.id_docente  natural join materia natural join curso natural join anio_lectivo where id_estado_anio_lectivo = 1 and docente.id_docente=(select docente.id_docente from usuario natural join docente where usuario.id_usuario = '"+id_usuario+"') Group by docente.id_docente,id_curso,id_materia,nombre_materia,grado,grupo order by grado, grupo";
	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return cb("")
	})

}

//select docente.id_docente,id_materia,nombre_materia,id_curso,grado,grupo from carga_docente join docente on docente.id_docente= carga_docente.id_docente  natural join materia natural join curso where vigente='1' and docente.id_docente=(select docente.id_docente from usuario natural join persona natural join docente where usuario.id_usuario =  '2') Group by docente.id_docente,id_curso,id_materia,nombre_materia,grado,grupo order by grado, grupo;
//select id_docente, id_materia, nombre_materia, id_curso, grado, grupo from carga_docente natural join materia natural join curso where vigente_carga_docente = '1' and id_docente = '1' order by grado, grupo ";

function getLogroMateriaProfesor(id_usuario,cb){
	var queri = "select * from logro  join carga_docente on carga_docente.id_carga_docente=logro.id_carga_docente join periodo on carga_docente.id_periodo=periodo.id_periodo where id_curso = 226 and id_materia = '142' and id_docente='111' and numero_periodo=(select  count(numero_periodo) as numero_periodos from periodo natural join anio_lectivo  where id_estado_anio_lectivo = '1' and fecha_inicio_periodo <= '19/07/2016')";
	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return cb("")
	})
}

function getActividadLogroProfesor(id_usuario,cb){
	var queri = "select * from actividad natural join logro where id_logro=100";
	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return cb("")
	})
}
//nota actividad por curso
//select id_estudiante,nota_actividad from carga_docente join logro on carga_docente.id_carga_docente= logro.id_carga_docente natural join actividad natrural natural join nota_actividad where id_docente='1' and id_curso=1 and id_materia='1' and id_logro=100 and id_actividad=1
function getNotaActividadProfesor(id_usuario,cb){
	var queri = "select id_estudiante,nota_actividad from carga_docente join logro on carga_docente.id_carga_docente= logro.id_carga_docente natural join actividad natrural natural join nota_actividad where id_docente='1' and id_curso=1 and id_materia='1' and id_logro=100 and id_actividad=1 order by id_estudiante";
	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return cb("")
	})
}

function postNotaActividadProfesor(id_usuario,nota,id_estudiante,cb){
	var queri = "insert into nota_actividad(id_actividad,nota_actividad,id_estudiante) values(1,"+nota+",'"+id_estudiante+"')";
	console.log(queri)
	db.many(queri)
	.then(function(data){
		cb(data)
	}).catch(function(err){
		return cb("")
	})
}

	/*.post( function(req,res, next){		
		
		var id_areas = parseInt(req.body.id_area);
		var nom_area = String(req.body.nombre_area);
		  db.none("insert into area(id_area, nombre_area) values("+id_areas+", '"+nom_area+"')")
		    .then(function () {
		      res.status(201)
		        .json({
		          status: 'success',
		          message: 'Inserted one Areas'
		        });
		    })
		    .catch(function (err) {
		      return 
		                 next(err);
		      });
	})*/

function addInasistencias (dataMulti, cb){


	var queri = pgp.helpers.insert(dataMulti, ['id_periodo', 'id_estudiante','estado_inasistencia','fecha_inasistencia','id_carga'], 'inasistencia');

	db.none(queri)
	.then(function(){
		
		cb({'mensaje':'Inasistencias insertada'})
	}).catch(function(error){
		console.log("Error" , error.message || error);
	});
	
}



/*function signin(req, res,next){
	var email = req.body.email;
	var password = req.body.password;
	var passwordEncriptada = encriptar(email,password);
	db.one("select * from users where email = ${email}",
		{
			email:email
		})
	.then(function(data){
		res.send("el usuario ya existe");
	}).catch(function(err){

		if (err.code == 0){
			var queri = "insert into users(email,password) values ('"+email+"','"+passwordEncriptada+"')";
			 console.log(queri)
			//si entra qui el usuario no existe
			
			db.none(queri)
			.then(function(data){
				res.send("insertado")

			}).catch(function(err){
				return next(err);
			});
						
		}else return next(err);

	})
		//si entro aqui es por que  el usuario existe, y  va a revisar la contraseña

}*/

module.exports = {
	getEstudiantesCurso: getEstudiantesCurso,
	getCursosMaterias: getCursosMaterias,
	getLogroMateriaProfesor:getLogroMateriaProfesor,
	getActividadLogroProfesor:getActividadLogroProfesor,
	getNotaActividadProfesor:getNotaActividadProfesor,
	postNotaActividadProfesor:postNotaActividadProfesor,
	addInasistencias:addInasistencias

}