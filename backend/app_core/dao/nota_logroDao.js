var Models=require("../models/index");
var sequelize = Models.sequelize;

var queriFindNotasLogrosByCarga = "SELECT id_estudiante,id_logro, nota_logro "+
	"FROM nota_logro NATURAL JOIN logro "+
	"WHERE id_carga_docente = $id_carga "+
	"ORDER BY id_estudiante";
var queryFindNotasLogrosByEstudiante = "SELECT id_logro, nota_logro FROM nota_logro "+ 
	"NATURAL JOIN logro  NATURAL JOIN carga_docente "+ 
	"WHERE id_estudiante = "+
		"(SELECT estudiante.id_estudiante FROM usuario "+ 
		"NATURAL JOIN persona NATURAL JOIN estudiante WHERE "+
		"usuario.id_usuario = $id_usuario) "+
	"AND id_materia= $id_materia AND id_periodo= $id_periodo";


var queries={
	"nota_logro":{
		'findNotasLogrosByCarga':queriFindNotasLogrosByCarga,
		'findNotasLogrosByEstudiante':queryFindNotasLogrosByEstudiante,
	}
};
var findNotasLogrosByCarga = function(id_carga){
	return sequelize.query(queries.nota_logro.findNotasLogrosByCarga,{bind:{id_carga:id_carga},type:sequelize.QueryTypes.SELECT})
}
var findNotasLogrosByEstudiante = function(id_usuario,id_materia,id_periodo){
	return sequelize.query(queries.nota_logro.findNotasLogrosByEstudiante,{bind:{id_usuario:id_usuario,id_materia:id_materia,id_periodo:id_periodo},type:sequelize.QueryTypes.SELECT})
}

module.exports.findNotasLogrosByCarga=findNotasLogrosByCarga;
module.exports.findNotasLogrosByEstudiante=findNotasLogrosByEstudiante;
