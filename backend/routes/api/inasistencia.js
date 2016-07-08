var express = require('express');
var router = express.Router();
//var users = require('../queries/users');


var inasistenciaController = require('../../controllers/inasistenciaController');
var authenticate = require('./auth').authenticate;

var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);

router.get('/mi_inasistencia', authenticate, function(req, res) {
  //console.log(req.user);
  inasistenciaController.getMiInasistencia(req.user.id,function(data){
    res.json(data);

  })
  
});

router.post('/inasistencia',/*authenticate,*/ function(req,res){
 
	inasistenciaController.addInasistencia(1,req.body.id_periodo,req.body.id_estudiante,1,req.body.fecha_inasistencia,req.body.id_carga, function(data){
    res.json(data);
  });
})
/*
router.get('/cargas/:id_carga', function(req,res){
	inasistenciaController.getInasistenciasCarga(req.params.id_carga, function(data){
		res.json(data);
	})
})*/


router.get('/cargas/:id_carga', function(req,res){
  

  inasistenciaController.getCantidadInasistenciasCarga(req.params.id_carga, function(data){
    res.json(data);
  })
})




module.exports = router;