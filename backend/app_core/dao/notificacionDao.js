var Models=require("../models/index");
var sequelize = Models.sequelize;

var queryFindNotificacionesByEstudiante = "SELECT * FROM notificacion WHERE usuario_notificacion=$usuario_notificacion";
var queryFind

var queries={
	"notificacion":{
		'findNotificacionesByEstudiante':queryFindNotificacionesByEstudiante,
		
	}
};

var findNotificacionesByEstudiante = function(usuario_notificacion){
	return sequelize.query(queries.notificacion.findNotificacionesByEstudiante,{bind:{usuario_notificacion:usuario_notificacion},type:sequelize.QueryTypes.SELECT});
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

