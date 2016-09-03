var Models=require("../models/index");
var sequelize = Models.sequelize;


var queryFindPeriodosDisponibles = "SELECT id_periodo,numero_periodo "+
	"FROM anio_lectivo NATURAL JOIN periodo "+
	"WHERE id_estado_anio_lectivo = 1 AND fecha_inicio_periodo <= $fecha_actual";
var queryFindPeriodoActual = "SELECT  id_periodo, numero_periodo "+
	"FROM  periodo WHERE fecha_inicio_periodo <= $fecha_actual "+
	"AND fecha_fin_periodo >= $fecha_actual";
	



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

