var express = require('express');
var router = express.Router();
//var users = require('../queries/users');


var profesoresController = require('../../controllers/profesorController');
var authenticate = require('./auth').authenticate;

var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

function getCursosMaterias(req,res){
	var hoy = new Date();
	var dia = hoy.getDate(); 
	var mes = hoy.getMonth()+1;
	var anio= hoy.getFullYear();
	var fecha_actual = String(anio+"-"+mes+"-"+dia);

	profesoresController.getCursosMaterias(/*req.user.id*/2,fecha_actual,function(data){
		console.log('response')
    	res.status(200).json(data);
    });
}

function getCursosMateriasPorPeriodo(req, res){
	profesoresController.getCursosMateriasPorPeriodo(/*req.user.id*/2,req.params.id_periodo,function(data){
		console.log('response')
    	res.status(200).json(data);
	});
}
function getLogros(req, res){
	profesoresController.getLogros(req.params.id_carga,function(data){
		console.log('response')
    	res.status(200).json(data);
	});
}
function getActividades(req, res){
	profesoresController.getActividades(req.params.id_logro,function(data){
		console.log('response')
    	res.status(200).json(data);
	});
}

function getLogrosyActividades(req,res){
	profesoresController.getLogros(req.params.id_carga,function(logros){

		for (var i = logros.length - 1; i >= 0; i--) {
			(function(i){
				profesoresController.getActividades(logros[i].id_logro,function(actividades){
					logros[i].actividades = actividades;
					console.log('agrego logros' + i )

				});
				if(i == 0){
					console.log("responde")
					res.status(200).json(logros);
				}


			})(i);
			logros[i]
		};
	})


}
router.get('/cargas/periodos/:id_periodo'/*, authenticate*/, getCursosMateriasPorPeriodo);
router.get('/cargas'/*, authenticate*/, getCursosMaterias);
router.get('/cargas/:id_carga/logros'/*, authenticate*/, getLogros);
router.get('/logros/:id_logro/actividades'/*, authenticate*/, getActividades);


module.exports = router;