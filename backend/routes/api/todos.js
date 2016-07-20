var express = require('express');
var router = express.Router();
//var users = require('../queries/users');


var todosController = require('../../controllers/todosController');
var authenticate = require('./auth').authenticate;

var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);



router.get('/periodos',/* authenticate,*/ function(req, res) {
	var hoy = new Date();
	var dia = hoy.getDate(); 
	var mes = hoy.getMonth()+3;
	var anio= hoy.getFullYear();
	var fecha_actual = String(anio+"-"+mes+"-"+dia);
  //console.log(req.user);
  todosController.getPeriodosDisponibles(fecha_actual,function(data){
    res.json(data);

  })
  
});

router.get('/periodos/actual',/* authenticate,*/ function(req, res) {
  var hoy = new Date();
  var dia = hoy.getDate(); 
  var mes = hoy.getMonth()+3;
  var anio= hoy.getFullYear();
  var fecha_actual = String(anio+"-"+mes+"-"+dia);
  //console.log(req.user);
  todosController.getPeriodoActual(fecha_actual,function(data){
    res.json(data);

  })
  
});

module.exports = router;