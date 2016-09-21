var Models=require("../models/index");
var sequelize = Models.sequelize;

var queriFindNotasActividadesByCarga = "SELECT  id_estudiante,id_logro, id_actividad, nota_actividad "+ 
	"FROM actividad NATURAL JOIN nota_actividad NATURAL JOIN logro "+ 
	"WHERE id_carga_docente = $id_carga "+
	"ORDER BY id_estudiante, id_logro";

var queryFindNotasActividadesByEstudiante = "SELECT id_actividad, nota_actividad FROM nota_actividad "+ 
	"NATURAL JOIN actividad WHERE id_estudiante = "+
		"(SELECT estudiante.id_estudiante FROM usuario "+ 
		"NATURAL JOIN persona NATURAL JOIN estudiante WHERE "+
		"usuario.id_usuario = $id_usuario) "+" AND id_logro = $id_logro";

var queries={
	"nota_actividad":{
		'findNotasActividadesByCarga':queriFindNotasActividadesByCarga,
		'findNotasActividadesByEstudiante':queryFindNotasActividadesByEstudiante,	
	}
};

var findNotasActividadesByCarga = function(id_carga){
	return sequelize.query(queries.nota_actividad.findNotasActividadesByCarga,{bind:{id_carga:id_carga},type:sequelize.QueryTypes.SELECT})
};

var findNotasActividadesByEstudiante = function(id_usuario,id_logro){
	return sequelize.query(queries.nota_actividad.findNotasActividadesByEstudiante,{bind:{id_usuario:id_usuario,id_logro:id_logro},type:sequelize.QueryTypes.SELECT})
};

var insertNotasActividades= function(notas_actividades){
   var cadena="INSERT INTO nota_actividad(id_actividad,nota_actividad,id_estudiante) VALUES ";
   var cadenaValores="";
   notas_actividades.forEach(function(nota_actividad,index){
   		cadenaValores += "("+nota_actividad.id_actividad+","+nota_actividad.nota_actividad+",'"+nota_actividad.id_estudiante+"')";
       if(index==notas_actividades.length-1){
           console.log("ultimo registro");
       }
       else{
           console.log("registro");
           cadenaValores+= ",";
       }
   });
   cadena= cadena + cadenaValores;
   console.log(cadena)
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.INSERT
   });

};
var updateNotasActividades= function(notas_actividades){
   var cadena="INSERT INTO nota_actividad(id_actividad,nota_actividad,id_estudiante) VALUES ";
   var cadenaValores="";
   notas_actividades.forEach(function(nota_actividad,index){
      cadenaValores += "("+nota_actividad.id_actividad+","+nota_actividad.nota_actividad+",'"+nota_actividad.id_estudiante+"')";
       if(index==notas_actividades.length-1){
           console.log("ultimo registro");
       }
       else{
           console.log("registro");
           cadenaValores+= ",";
       }
   });
   cadena= cadena + cadenaValores;
   console.log(cadena)
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.UPDATE
   });

};

var updateNotaActividad= function(nota_actividad){
   var cadena="UPDATE nota_actividad "+
    "SET nota_actividad = " + nota_actividad.nota_actividad +
    " WHERE id_estudiante = '"+nota_actividad.id_estudiante+
    "' AND id_actividad = "+nota_actividad.id_actividad ;

   
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.UPDATE
   });

};


module.exports.findNotasActividadesByCarga=findNotasActividadesByCarga;
module.exports.findNotasActividadesByEstudiante=findNotasActividadesByEstudiante;
module.exports.insertNotasActividades=insertNotasActividades;
module.exports.updateNotaActividad = updateNotaActividad;