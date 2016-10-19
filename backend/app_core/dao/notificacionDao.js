var Models=require("../models/index");
var sequelize = Models.sequelize;

var queryFindNotificacionesByEstudiante = "SELECT * FROM notificacion WHERE id_estudiante=$id_estudiante"
var queryFindNotificacionesByEstudianteAndEstado= "SELECT * FROM notificacion WHERE id_estudiante=$id_estudiante and estado_notificacion = '0'"
//var queryFindCantidadNotificacionesEstadoCero =

var queries={
	"notificacion":{
		'findNotificacionesByEstudiante':queryFindNotificacionesByEstudiante,
		'findNotificacionesByEstudianteAndEstado':queryFindNotificacionesByEstudianteAndEstado
		
	}
};

var findNotificacionesByEstudiante = function(id_estudiante){
	console.log(id_estudiante);
	return sequelize.query(queries.notificacion.findNotificacionesByEstudiante,{bind:{id_estudiante:id_estudiante},type:sequelize.QueryTypes.SELECT});
}

var findNotificacionesByEstudianteAndEstado = function(id_estudiante){
	console.log(id_estudiante);
	return sequelize.query(queries.notificacion.findNotificacionesByEstudiante,{bind:{id_estudiante:id_estudiante},type:sequelize.QueryTypes.SELECT});
}


/*
var insertarNotificacion = function(logro){
  var cadena = "INSERT INTO logro (id_carga_docente,descripcion_logro,porcentaje_logro) "+
  "VALUES ("+logro.id_carga_docente+",'"+logro.descripcion_logro+"',"+logro.porcentaje_logro+") RETURNING id_logro";
  return sequelize.query(cadena,{
     type: sequelize.QueryTypes.INSERT
   });
}
*/

module.exports.findNotificacionesByEstudiante=findNotificacionesByEstudiante;
module.exports.findNotificacionesByEstudianteAndEstado = findNotificacionesByEstudianteAndEstado;

