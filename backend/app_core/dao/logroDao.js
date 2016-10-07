var Models=require("../models/index");
var sequelize = Models.sequelize;

var queryFindLogrosByCargaDocente = "SELECT * FROM logro WHERE id_carga_docente = $id_carga AND vigente_logro = 'S' ORDER BY id_logro";
var queryFindLogrosByMateriaAndPeriodo = "SELECT id_logro, descripcion_logro, porcentaje_logro "+ 
	"FROM logro NATURAL JOIN carga_docente "+ 
	"NATURAL JOIN curso "+
	"WHERE  id_materia = $id_materia AND id_periodo= $id_periodo AND vigente_logro = 'S' "+
	" AND id_curso = "+
		"(SELECT id_curso FROM matricula WHERE id_estudiante = $id_estudiante AND vigente_matricula = 'S')"+
	" ORDER BY  id_logro" ;
 
var queries={
	"logro":{
		'findLogrosByCargaDocente':queryFindLogrosByCargaDocente,
		'findLogrosByMateriaAndPeriodo':queryFindLogrosByMateriaAndPeriodo,	
	}
};
var findLogrosByCargaDocente = function(id_carga){
	return sequelize.query(queries.logro.findLogrosByCargaDocente,{bind:{id_carga:id_carga},type:sequelize.QueryTypes.SELECT});
}

var findLogrosByMateriaAndPeriodo = function(id_estudiante,id_materia,id_periodo){
	console.log(queries.logro.findLogrosByMateriaAndPeriodo)
	return sequelize.query(queries.logro.findLogrosByMateriaAndPeriodo,{bind:{id_materia:id_materia,id_periodo:id_periodo,id_estudiante:id_estudiante},type:sequelize.QueryTypes.SELECT});
}
var updateDescripcionLogro= function(logro){
   var cadena="UPDATE logro "+
    "SET descripcion_logro = '" + logro.descripcion_logro +"' "+
    "WHERE id_logro = "+ logro.id_logro ;
   
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.UPDATE
   });

};
var deleteLogro= function(id_logro){
   var cadena="DELETE FROM logro "+
     "WHERE id_logro = "+ id_logro ;
   
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.DELETE
   });

};
var createLogro = function(logro){
  var cadena = "INSERT INTO logro (id_carga_docente,descripcion_logro,porcentaje_logro) "+
  "VALUES ("+logro.id_carga_docente+",'"+logro.descripcion_logro+"',"+logro.porcentaje_logro+") RETURNING id_logro";
  return sequelize.query(cadena,{
     type: sequelize.QueryTypes.INSERT
   });
}

var updatePorcentajesLogros= function(logros){
   var cadena="UPDATE logro ";
   var cadenanombre="";
   var cadenavalor="";
   var cadenawhere="";
   logros.forEach(function(logro,index){
       cadenanombre+= "WHEN "+ logro.id_logro+" THEN "+logro.porcentaje_logro+" ";
      // cadenavalor+= "WHEN "+logro.id_logro+" THEN "+logro.valor+" ";
       if(index==logros.length-1){
           console.log("ultimo registro");
           cadenawhere+=logro.id_logro;
       }
       else{
           console.log("registro");
           cadenawhere+=logro.id_logro+",";
       }
   });
   //console.log(cadenanombre);
   //console.log(cadenavalor);
   cadena= cadena+" SET porcentaje_logro = CASE id_logro "+cadenanombre+" END ";
  // cadena= cadena+",valor = CASE id_logro "+cadenavalor+" END ";
   cadena= cadena+" WHERE id_logro IN("+cadenawhere+")";
   
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.UPDATE
   });

};
module.exports.findLogrosByCargaDocente=findLogrosByCargaDocente;
module.exports.findLogrosByMateriaAndPeriodo=findLogrosByMateriaAndPeriodo;
module.exports.updateDescripcionLogro = updateDescripcionLogro;
module.exports.deleteLogro = deleteLogro;
module.exports.updatePorcentajesLogros=updatePorcentajesLogros;
module.exports.createLogro =createLogro;

