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

router.post('/inasitecia',authenticate, function(req,res){
	inasistenciaController.addInasistencia
})

router.get('/curso/:id_curso/estudiantes', authenticate, function(req, res) {
  //console.log(req.user);
  inasistenciaController.getListadoEstudiantesCurso(req.params.id_curso,function(data){
    res.json(data);

  })
  
});


module.exports = router;