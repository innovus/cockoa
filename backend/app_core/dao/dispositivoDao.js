var Models=require("../models/index");
var sequelize = Models.sequelize;

var queryFindTokenByEstudiante = "SELECT * FROM dispositivo WHERE id_estudiante = $id_estudiante";


var queries={
	"dispositivo":{
		'findTokenByEstudiante':queryFindTokenByEstudiante,
		
	}
};

var findTokenByEstudiantes = function(ids_estudiante){


   var cadena="SELECT * FROM dispositivo WHERE id_estudiante IN (";
   var cadenaValores="";
   ids_estudiante.forEach(function(id_estudiante,index){
   		cadenaValores += "'"+id_estudiante.id_estudiante+"'";
       if(index==ids_estudiante.length-1){
           console.log("ultimo registro");
       }
       else{
           console.log("registro");
           cadenaValores+= ",";
       }
   });
   cadena = cadena + cadenaValores + ")"
   console.log(cadenaValores)
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.SELECT
   });

}
var findTokenByEstudiante = function(id_estudiante){

	return sequelize.query(queries.dispositivo.findTokenByEstudiante,{bind:{ids_estudiante:ids_estudiante},type:sequelize.QueryTypes.SELECT});
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

module.exports.findTokenByEstudiante=findTokenByEstudiante;
module.exports.findTokenByEstudiantes=findTokenByEstudiantes;

