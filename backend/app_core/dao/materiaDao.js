var Models=require("../models/index");
var sequelize = Models.sequelize;


var queryFindMateriasByEstudiante = "SELECT id_materia, persona.nombre1,nombre2,apellido1,apellido2,"+ 
	"grado, grupo, nombre_materia,numero_periodo AS perioso_actual "+ 
	"FROM estudiante NATURAL JOIN matricula NATURAL JOIN curso "+ 
	"JOIN carga_docente ON curso.id_curso = carga_docente.id_curso "+ 
	"NATURAL JOIN materia JOIN periodo ON periodo.id_periodo = carga_docente.id_periodo "+ 
	"JOIN anio_lectivo ON anio_lectivo.id_anio_lectivo=periodo.id_anio_lectivo "+ 
	"JOIN docente ON docente.id_docente = carga_docente.id_docente "+ 
	"JOIN persona ON docente.identificacion=persona.identificacion "+ 
	"WHERE periodo.id_periodo = 1 AND estudiante.id_estudiante = "+ 
	"(SELECT estudiante.id_estudiante FROM usuario "+ 
	"NATURAL JOIN persona NATURAL JOIN estudiante WHERE usuario.id_usuario = $id_usuario)";

var queryFindMateriasWithInasistenciaByEstudiante = "SELECT id_materia,nombre_materia, "+
	"COUNT(*) AS total_inasistencia FROM inasistencia "+
	"JOIN carga_docente ON inasistencia.id_carga=carga_docente.id_carga_docente "+
	"NATURAL JOIN materia WHERE inasistencia.id_estudiante= "+
		"(SELECT estudiante.id_estudiante "+
		"FROM usuario NATURAL JOIN persona NATURAL JOIN estudiante "+
		"WHERE usuario.id_usuario =  $id_usuario ) "+
	"GROUP BY nombre_materia,id_materia ORDER BY nombre_materia ASC"
	

var queries={
	"materia":{
		'findMateriasByEstudiante':queryFindMateriasByEstudiante,
		'findMateriasWithInasistenciaByEstudiante':queryFindMateriasWithInasistenciaByEstudiante,
	}
};

var findMateriasByEstudiante = function(id_usuario){
	return sequelize.query(queries.materia.findMateriasByEstudiante,{bind:{id_usuario:id_usuario},type:sequelize.QueryTypes.SELECT})
};
var findMateriasWithInasistenciaByEstudiante = function (id_usuario){
	return sequelize.query(queries.materia.findMateriasWithInasistenciaByEstudiante, {bind:{id_usuario:id_usuario},type:sequelize.QueryTypes.SELECT})
};

module.exports.findMateriasByEstudiante=findMateriasByEstudiante;
module.exports.findMateriasWithInasistenciaByEstudiante=findMateriasWithInasistenciaByEstudiante;

