var Models=require("../models/index");
var sequelize = Models.sequelize;

var queriFindNotasLogrosByCarga = "SELECT id_estudiante,id_logro, nota_logro "+
  "FROM nota_logro NATURAL JOIN logro "+
  "WHERE id_carga_docente = $id_carga "+
  "ORDER BY id_estudiante";
var queryFindNotasLogrosByEstudiante = "SELECT id_logro, nota_logro FROM nota_logro "+ 
  "NATURAL JOIN logro  NATURAL JOIN carga_docente "+ 
  "WHERE id_estudiante = $id_estudiante "+
  "AND id_materia= $id_materia AND id_periodo= $id_periodo AND vigente_logro = 'S'";

var queryFindNotasLogrosByMateria = "select numero_periodo, id_materia,id_logro,"+
" descripcion_logro,nota_logro,porcentaje_logro from estudiante natural join matricula "+
"natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural"+
" join materia join periodo on carga_docente.id_periodo = periodo.id_periodo join logro on "+
"logro.id_carga_docente=carga_docente.id_carga_docente natural join nota_logro join anio_lectivo"+
" on anio_lectivo.id_anio_lectivo=periodo.id_anio_lectivo "+
"where  id_estado_anio_lectivo = 1 and vigente_logro ='S' and fecha_inicio_periodo <= $fecha_actual and"+
" id_estudiante = $id_estudiante order by numero_periodo desc";


var queries={
  "nota_logro":{
    'findNotasLogrosByCarga':queriFindNotasLogrosByCarga,
    'findNotasLogrosByEstudiante':queryFindNotasLogrosByEstudiante,
    'findNotasLogrosByMateria':queryFindNotasLogrosByMateria,
  }
};

var findNotasLogrosByMateria = function(fecha_actual,id_estudiante){
 return sequelize.query(queries.nota_logro.findNotasLogrosByMateria,{bind:{fecha_actual:fecha_actual,id_estudiante:id_estudiante},type:sequelize.QueryTypes.SELECT})
}

var findNotasLogrosByCarga = function(id_carga){
  return sequelize.query(queries.nota_logro.findNotasLogrosByCarga,{bind:{id_carga:id_carga},type:sequelize.QueryTypes.SELECT})
}
var findNotasLogrosByEstudiante = function(id_estudiante,id_materia,id_periodo){
  return sequelize.query(queries.nota_logro.findNotasLogrosByEstudiante,{bind:{id_estudiante:id_estudiante,id_materia:id_materia,id_periodo:id_periodo},type:sequelize.QueryTypes.SELECT})
}
var insertNotasLogros= function(notas_logro){
   var cadena="INSERT INTO nota_logro(id_logro,nota_logro,id_estudiante) VALUES ";
   var cadenaValores="";
   notas_logro.forEach(function(nota_logro,index){
      cadenaValores += "("+nota_logro.id_logro+","+nota_logro.nota_logro+",'"+nota_logro.id_estudiante+"')";
       if(index==notas_logro.length-1){
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

};
var updateNotaLogro= function(nota_logro){
   var cadena="UPDATE nota_logro "+
    "SET nota_logro = " + nota_logro.nota_logro +
    " WHERE id_estudiante = '"+nota_logro.id_estudiante+
    "' AND id_logro = "+nota_logro.id_logro ;

   
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.UPDATE
   });

};

module.exports.findNotasLogrosByCarga=findNotasLogrosByCarga;
module.exports.findNotasLogrosByEstudiante=findNotasLogrosByEstudiante;
module.exports.insertNotasLogros = insertNotasLogros;
module.exports.updateNotaLogro =updateNotaLogro;
module.exports.findNotasLogrosByMateria =findNotasLogrosByMateria;

