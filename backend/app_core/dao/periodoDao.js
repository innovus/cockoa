var Models=require("../models/index");
var sequelize = Models.sequelize;


var queryFindPeriodosDisponibles = "SELECT id_periodo,numero_periodo "+
	"FROM anio_lectivo NATURAL JOIN periodo "+
	"WHERE id_estado_anio_lectivo = 1 AND fecha_inicio_periodo <= $fecha_actual";
var queryFindPeriodoActual = "SELECT  id_periodo, numero_periodo "+
	"FROM anio_lectivo NATURAL JOIN periodo WHERE id_estado_anio_lectivo = 1 and fecha_inicio_periodo <= $fecha_actual "+
	"AND numero_periodo ="+
	"(SELECT  count(numero_periodo) as numero_periodos FROM periodo NATURAL JOIN anio_lectivo  "+
	"where id_estado_anio_lectivo = 1 and fecha_inicio_periodo <= $fecha_actual)";

	/*SELECT  id_periodo, numero_periodo 
	FROM anio_lectivo NATURAL JOIN periodo  WHERE id_estado_anio_lectivo = 1 and 
	fecha_inicio_periodo <= '8/10/2016' and numero_periodo =
	(select  count(numero_periodo) as numero_periodos from periodo natural join anio_lectivo  
	where id_estado_anio_lectivo = 1 and fecha_inicio_periodo <= '8/10/2016');*/
	



var queries={
	"periodo":{
		'findPeriodosDisponibles':queryFindPeriodosDisponibles,
		'findPeriodoActual':queryFindPeriodoActual,	

	}
};
var findPeriodosDisponibles = function(fecha_actual){
	return sequelize.query(queries.periodo.findPeriodosDisponibles,{bind:{fecha_actual:fecha_actual},type:sequelize.QueryTypes.SELECT});
}

var findPeriodoActual = function(fecha_actual){
	return sequelize.query(queries.periodo.findPeriodoActual,{bind:{fecha_actual:fecha_actual},type:sequelize.QueryTypes.SELECT});
}


module.exports.findPeriodoActual=findPeriodoActual;
module.exports.findPeriodosDisponibles=findPeriodosDisponibles;

