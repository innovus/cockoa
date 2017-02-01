var Models=require("../models/index");
var sequelize = Models.sequelize;

var queryFindTipoNotificacion = "SELECT * FROM tipo_notificacion";

var queries={
	"tipo_notificacion":{
		'findTipoNotificacion':queryFindTipoNotificacion,
		
	}
};

var findTipoNotificacion = function(){

	return sequelize.query(queries.tipo_notificacion.findTipoNotificacion,{type:sequelize.QueryTypes.SELECT});
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

module.exports.findTipoNotificacion=findTipoNotificacion;

