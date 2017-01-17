var Models=require("../models/index");
var sequelize = Models.sequelize;


var queryFindMateriasByEstudiante = "SELECT id_materia, persona.nombre1,nombre2,apellido1,apellido2,"+ 
	"grado, grupo, nombre_materia,numero_periodo AS periodo_actual "+ 
	"FROM estudiante NATURAL JOIN matricula NATURAL JOIN curso "+ 
	"JOIN carga_docente ON curso.id_curso = carga_docente.id_curso "+ 
	"NATURAL JOIN materia JOIN periodo ON periodo.id_periodo = carga_docente.id_periodo "+ 
	"JOIN anio_lectivo ON anio_lectivo.id_anio_lectivo=periodo.id_anio_lectivo "+ 
	"JOIN docente ON docente.id_docente = carga_docente.id_docente "+ 
	"JOIN persona ON docente.identificacion=persona.identificacion "+ 
	"WHERE id_estado_anio_lectivo = 1 and periodo.numero_periodo = "+
	"(SELECT  count(numero_periodo) as numero_periodos FROM periodo "+
		"NATURAL JOIN anio_lectivo  WHERE id_estado_anio_lectivo = 1 "+
		"and fecha_inicio_periodo <= '7/10/2016') "+
    "AND estudiante.id_estudiante = $id_estudiante";

    var queryFindMateriaByActividad = "SELECT nombre_materia "+ 
	"FROM actividad NATURAL JOIN logro NATURAL JOIN carga_docente NATURAL JOIN materia "+
	" WHERE id_actividad =$id_actividad";



	//"WHERE periodo.id_periodo = 1 AND estudiante.id_estudiante = $id_estudiante";

	/*select id_materia,persona.nombre1,nombre2,apellido1,apellido2, grado, grupo, 
	nombre_materia,numero_periodo as periodo_actual from estudiante natural join matricula 
	natural join curso join carga_docente on curso.id_curso = carga_docente.id_curso natural 
	join materia join periodo on periodo.id_periodo = carga_docente.id_periodo join 
	anio_lectivo on anio_lectivo.id_anio_lectivo=periodo.id_anio_lectivo join docente on
	 docente.id_docente = carga_docente.id_docente join persona on 
	 docente.identificacion=persona.identificacion where id_estado_anio_lectivo = 1 and periodo.numero_periodo = 
	 (select  count(numero_periodo) as numero_periodos from periodo natural join anio_lectivo 
	  where id_estado_anio_lectivo = '1' and fecha_inicio_periodo <= '"+fecha_actual+"')
	   and estudiante.id_estudiante = (select estudiante.id_estudiante from usuario natural 
	   	join persona natural join estudiante where usuario.id_usuario = "+id_usuario+")*/

var queryFindMateriasWithInasistenciaByEstudiante = "SELECT id_materia,nombre_materia, "+
	"COUNT(*) AS total_inasistencia FROM inasistencia "+
	"JOIN carga_docente ON inasistencia.id_carga=carga_docente.id_carga_docente "+
	"NATURAL JOIN materia WHERE inasistencia.id_estudiante= $id_estudiante "+
	/*+
		"(SELECT estudiante.id_estudiante "+
		"FROM usuario NATURAL JOIN persona NATURAL JOIN estudiante "+
		"WHERE usuario.id_usuario =  $id_usuario ) "+*/
	"GROUP BY nombre_materia,id_materia ORDER BY nombre_materia ASC";
	

var queries={
	"materia":{
		'findMateriasByEstudiante':queryFindMateriasByEstudiante,
		'findMateriasWithInasistenciaByEstudiante':queryFindMateriasWithInasistenciaByEstudiante,
		'findMateriaByActividad':queryFindMateriaByActividad,
	}
};

var findMateriasByEstudiante = function(id_estudiante){
	return sequelize.query(queries.materia.findMateriasByEstudiante,{bind:{id_estudiante:id_estudiante},type:sequelize.QueryTypes.SELECT})
};
var findMateriasWithInasistenciaByEstudiante = function (id_estudiante){
	return sequelize.query(queries.materia.findMateriasWithInasistenciaByEstudiante, {bind:{id_estudiante:id_estudiante},type:sequelize.QueryTypes.SELECT})
};
var findMateriaByActividad = function(id_actividad){
	return sequelize.query(queries.materia.findMateriaByActividad, {bind:{id_actividad:id_actividad},type:sequelize.QueryTypes.SELECT})
}

module.exports.findMateriasByEstudiante=findMateriasByEstudiante;
module.exports.findMateriasWithInasistenciaByEstudiante=findMateriasWithInasistenciaByEstudiante;
module.exports.findMateriaByActividad = findMateriaByActividad;

