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

module.exports.findLogrosByCargaDocente=findLogrosByCargaDocente;
module.exports.findLogrosByMateriaAndPeriodo=findLogrosByMateriaAndPeriodo;
module.exports.updateDescripcionLogro = updateDescripcionLogro;
