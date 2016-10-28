var Models=require("../models/index");
var sequelize = Models.sequelize;

var queryFindCursosMateriasByPeriodo = "SELECT id_carga_docente, id_docente, id_materia, nombre_materia, id_curso, grado, grupo "+ 
	"FROM carga_docente NATURAL JOIN materia NATURAL JOIN curso "+ 
	"WHERE vigente_carga_docente = 'S' and id_docente = '6' and id_periodo = $id_periodo "+
	"ORDER BY grado, grupo ";

var queryFindCursosMateriasByFechaActual = "SELECT id_carga_docente, id_docente, id_materia, nombre_materia, id_curso, grado, grupo "+ 
	"FROM carga_docente NATURAL JOIN materia NATURAL JOIN curso "+ 
	"WHERE vigente_carga_docente = 'S' AND id_docente = '6' "+ 
	"AND id_periodo = "+ 
		"(SELECT  id_periodo "+
	"FROM anio_lectivo NATURAL JOIN periodo WHERE id_estado_anio_lectivo = 1 AND fecha_inicio_periodo <= $fecha_actual "+
	"AND numero_periodo =(SELECT  count(numero_periodo) as numero_periodos FROM periodo NATURAL JOIN anio_lectivo  "+
	"WHERE id_estado_anio_lectivo = 1 AND fecha_inicio_periodo <= $fecha_actual))";

var queries={
	"carga_docente":{
		'findCursosMateriasByPeriodo':queryFindCursosMateriasByPeriodo,
		'findCursosMateriasByFechaActual':queryFindCursosMateriasByFechaActual,
	}

};
var findCursosMateriasByPeriodo = function(id_periodo){
	return sequelize.query(queries.carga_docente.findCursosMateriasByPeriodo,{bind:{id_periodo:id_periodo},type:sequelize.QueryTypes.SELECT})

}
var findCursosMateriasByFechaActual = function(fecha_actual){
	console.log(fecha_actual)
	return sequelize.query(queries.carga_docente.findCursosMateriasByFechaActual,{bind:{fecha_actual:fecha_actual},type:sequelize.QueryTypes.SELECT})
}

module.exports.findCursosMateriasByPeriodo=findCursosMateriasByPeriodo;
module.exports.findCursosMateriasByFechaActual=findCursosMateriasByFechaActual;
