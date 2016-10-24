var Models=require("../models/index");
var sequelize = Models.sequelize;

var queryFindNotificacionesByEstudiante = "SELECT * FROM notificacion WHERE id_estudiante=$id_estudiante ORDER BY fecha_notificacion DESC"
var queryFindNotificacionesByEstudianteAndEstado= "SELECT * FROM notificacion WHERE id_estudiante=$id_estudiante and estado_notificacion = '0'"
var queryUpdateEstadoNotificacion = "UPDATE notificacion SET estado_notificacion = '1' WHERE id_notificacion = $id_notificacion" ;
//var queryFindCantidadNotificacionesEstadoCero =

var queries={
	"notificacion":{
		'findNotificacionesByEstudiante':queryFindNotificacionesByEstudiante,
		'findNotificacionesByEstudianteAndEstado':queryFindNotificacionesByEstudianteAndEstado,
		'updateEstadoNotificacion':queryUpdateEstadoNotificacion	
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
var updateEstadoNotificacion = function(id_notificacion){
	console.log(id_notificacion);
	return sequelize.query(queries.notificacion.updateEstadoNotificacion,{bind:{id_notificacion:id_notificacion},type:sequelize.QueryTypes.UPDATE});

}

var insertarNotificacion = function(notificacion){
	console.log(notificacion)
  var cadena = "INSERT INTO notificacion (id_tipo_notificacion,mensaje_notificacion, id_estudiante,guia) "+
  "VALUES ("+notificacion.id_tipo_notificacion+",'"+notificacion.mensaje_notificacion +"','"+notificacion.id_estudiante+"','"+notificacion.guia+"' )";
  console.log(cadena)
  return sequelize.query(cadena,{
     type: sequelize.QueryTypes.INSERT
   });
}
var insertarNotificaciones = function(notificaciones){
var cadena = "INSERT INTO notificacion (id_tipo_notificacion,mensaje_notificacion, id_estudiante,guia) VALUES ";
   var cadenaValores="";
   notificaciones.forEach(function(notificacion,index){
   		cadenaValores += "("+notificacion.id_tipo_notificacion+",'"+notificacion.mensaje_notificacion +"','"+notificacion.id_estudiante+"','"+notificacion.guia+"' )";
       if(index==notificaciones.length-1){
           console.log("ultimo registro");
       }
       else{
           console.log("registro");
           cadenaValores+= ",";
       }
   });
   cadena = cadena + cadenaValores
   console.log(cadenaValores)
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.INSERT
   });
}

module.exports.findNotificacionesByEstudiante=findNotificacionesByEstudiante;
module.exports.findNotificacionesByEstudianteAndEstado = findNotificacionesByEstudianteAndEstado;
module.exports.updateEstadoNotificacion = updateEstadoNotificacion;
module.exports.insertarNotificacion = insertarNotificacion;
module.exports.insertarNotificaciones = insertarNotificaciones