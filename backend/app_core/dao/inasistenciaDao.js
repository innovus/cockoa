var Models=require("../models/index");
var sequelize = Models.sequelize;


/*
var queryFindInasistenciasByCarga = "SELECT nombre_materia, nombre1, nombre2, apellido1, apellido2, estado_inasistencia, fecha_inasistencia, numero_periodo "+
	"FROM inasistencia "+
	"JOIN carga_docente ON inasistencia.id_carga = carga_docente.id_carga_docente "+ 
	"JOIN usuario ON usuario.id_usuario =  carga_docente.id_usuario "+
	"JOIN materia ON materia.id_materia = carga_docente.id_materia "+
	"JOIN periodo ON periodo.id_periodo = carga_docente.id_periodo "+
	"JOIN docente ON docente.id_docente = carga_docente.id_docente "+
	"JOIN persona ON persona.identificacion = docente.identificacion  "+ 
	"WHERE id_carga = $id_carga";*/

var queryFindCantidadInasistenciasByCarga = "SELECT estudiante.id_estudiante, COUNT(estudiante.id_estudiante) AS cantidad "+
	"FROM inasistencia "+
	"RIGHT JOIN estudiante ON inasistencia.id_estudiante = estudiante.id_estudiante "+
	"JOIN carga_docente ON inasistencia.id_carga = carga_docente.id_carga_docente "+
	"WHERE carga_docente.id_carga_docente = $id_carga "+
	"GROUP BY estudiante.id_estudiante";

var queryFindInasistenciasByEstudiante = "SELECT nombre_materia, nombre1, nombre2, apellido1, apellido2, estado_inasistencia, fecha_inasistencia, numero_periodo "+
	 "FROM inasistencia "+
	 "JOIN carga_docente ON inasistencia.id_carga = carga_docente.id_carga_docente "+ 
	 "JOIN usuario ON usuario.id_usuario =  carga_docente.id_usuario "+
	 "JOIN materia ON materia.id_materia = carga_docente.id_materia "+
	 "JOIN periodo ON periodo.id_periodo = carga_docente.id_periodo "+
	 "JOIN docente ON docente.id_docente = carga_docente.id_docente "+
	 "JOIN persona ON persona.identificacion = docente.identificacion "+
	 "WHERE usuario.id_usuario = $id_usuario";

var queryFindInasistenciasByCarga = "SELECT id_inasistencia, fecha_inasistencia, estado_inasistencia "+
	"FROM inasistencia "+
	"WHERE id_carga = $id_carga AND id_estudiante = $id_estudiante"

var queries={
	"inasistencia":{
		'findInasistenciasByCarga':queryFindInasistenciasByCarga,
		'findCantidadInasistenciasByCarga': queryFindCantidadInasistenciasByCarga,
		'findInasistenciasByEstudiante':queryFindInasistenciasByEstudiante
	}
};

var findInasistenciasByCarga = function(id_estudiante,id_carga){
	return sequelize.query(queries.inasistencia.findInasistenciasByCarga,{bind:{id_carga:id_carga,id_estudiante:id_estudiante},type:sequelize.QueryTypes.SELECT})
}
var findCantidadInasistenciasByCarga = function(id_carga){
	return sequelize.query(queries.inasistencia.findCantidadInasistenciasByCarga,{bind:{id_carga:id_carga},type:sequelize.QueryTypes.SELECT})
}
var findInasistenciasByEstudiante = function(id_usuario){
	return sequelize.query(queries.inasistencia.findInasistenciasByEstudiante,{bind:{id_usuario:id_usuario},type:sequelize.QueryTypes.SELECT})
}
/*
var findNotasLogrosByEstudiante = function(id_usuario,id_materia,id_periodo){
	return sequelize.query(queries.nota_logro.findNotasLogrosByEstudiante,{bind:{id_usuario:id_usuario,id_materia:id_materia,id_periodo:id_periodo},type:sequelize.QueryTypes.SELECT})
}*/

module.exports.findInasistenciasByCarga=findInasistenciasByCarga;
module.exports.findCantidadInasistenciasByCarga=findCantidadInasistenciasByCarga;
module.exports.findInasistenciasByEstudiante=findInasistenciasByEstudiante;
