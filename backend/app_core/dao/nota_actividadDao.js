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


module.exports.findNotasActividadesByCarga=findNotasActividadesByCarga;
module.exports.findNotasActividadesByEstudiante=findNotasActividadesByEstudiante;