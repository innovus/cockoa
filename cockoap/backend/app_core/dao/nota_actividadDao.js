var Models=require("../models/index");
var sequelize = Models.sequelize;

var queriFindNotasActividadesByCarga = "SELECT  id_estudiante,id_logro, id_actividad, nota_actividad, porcentaje_actividad "
+ "FROM actividad NATURAL JOIN nota_actividad NATURAL JOIN logro "+ 
  "WHERE id_carga_docente = $id_carga "+
  "ORDER BY id_estudiante, id_logro";
  
var queryFindNotasActividadesByEstudiante = "SELECT id_actividad, nota_actividad,id_logro FROM nota_actividad "+ 
  "NATURAL JOIN actividad NATURAL JOIN logro NATURAL JOIN carga_docente WHERE id_estudiante = $id_estudiante and id_materia = $id_materia";

var queryFindNotaActividadLogrobyEstudiante="select * from nota_actividad NATURAL JOIN actividad WHERE id_estudiante = $id_estudiante and id_logro=$id_logro";

var queryFindNotaActividadEstudiantebyMateria = "SELECT * FROM materia NATURAL JOIN logro NATURAL JOIN actividad NATURAL JOIN nota_actividad NATURAL JOIN carga_docente WHERE id_estudiante = $id_estudiante AND id_actividad = $id_actividad";

var queries={
  "nota_actividad":{
    'findNotasActividadesByCarga':queriFindNotasActividadesByCarga,
    'findNotasActividadesByEstudiante':queryFindNotasActividadesByEstudiante, 
    'findNotaActividadLogrobyEstudiante':queryFindNotaActividadLogrobyEstudiante, 
    'findNotaActividadEstudiantebyMateria':queryFindNotaActividadEstudiantebyMateria,
  }
};

var findNotaActividadEstudiantebyMateria = function(id_estudiante,id_actividad){
  return sequelize.query(queries.nota_actividad.findNotaActividadEstudiantebyMateria,{bind:{id_estudiante:id_estudiante,id_actividad:id_actividad},type:sequelize.QueryTypes.SELECT})
};

var findNotaActividadLogrobyEstudiante = function(id_estudiante,id_logro){
  return sequelize.query(queries.nota_actividad.findNotaActividadLogrobyEstudiante,{bind:{id_estudiante:id_estudiante,id_logro:id_logro},type:sequelize.QueryTypes.SELECT})
};

var findNotasActividadesByCarga = function(id_carga){
  return sequelize.query(queries.nota_actividad.findNotasActividadesByCarga,{bind:{id_carga:id_carga},type:sequelize.QueryTypes.SELECT})
};

var findNotasActividadesByCarga = function(id_carga){
  return sequelize.query(queries.nota_actividad.findNotasActividadesByCarga,{bind:{id_carga:id_carga},type:sequelize.QueryTypes.SELECT})
};

var findNotasActividadesByEstudiante = function(id_estudiante, id_materia){
  return sequelize.query(queries.nota_actividad.findNotasActividadesByEstudiante,{bind:{id_estudiante:id_estudiante, id_materia:id_materia},type:sequelize.QueryTypes.SELECT})
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
module.exports.findNotaActividadLogrobyEstudiante=findNotaActividadLogrobyEstudiante;
module.exports.findNotaActividadEstudiantebyMateria=findNotaActividadEstudiantebyMateria;