var Models=require("../models/index");
var sequelize = Models.sequelize;

var queryFindLogrosByCargaDocente = "SELECT * FROM logro WHERE id_carga_docente = $id_carga";
var queryFindLogrosByMateriaAndPeriodo = "SELECT id_logro,nombre_logro, descripcion_logro, porcentaje_logro "+ 
	"FROM logro NATURAL JOIN carga_docente "+ 
	"WHERE  id_materia = $id_materia AND id_periodo= $id_periodo";


var queries={
	"logro":{
		'findLogrosByCargaDocente':queryFindLogrosByCargaDocente,
		'findLogrosByMateriaAndPeriodo':queryFindLogrosByMateriaAndPeriodo,	
	}
};
var findLogrosByCargaDocente = function(id_carga){
	return sequelize.query(queries.logro.findLogrosByCargaDocente,{bind:{id_carga:id_carga},type:sequelize.QueryTypes.SELECT});
}

var findLogrosByMateriaAndPeriodo = function(id_materia,id_periodo){
	return sequelize.query(queries.logro.findLogrosByMateriaAndPeriodo,{bind:{id_materia:id_materia,id_periodo:id_periodo},type:sequelize.QueryTypes.SELECT});
}

module.exports.findLogrosByCargaDocente=findLogrosByCargaDocente;
module.exports.findLogrosByMateriaAndPeriodo=findLogrosByMateriaAndPeriodo;
