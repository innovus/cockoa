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
var connectionString = 'postgres://localhost:5432/liceo';
var db = pgp(connectionString);

router.get('/mi_inasistencia', authenticate, function(req, res) {
  //console.log(req.user);
  inasistenciaController.getMiInasistencia(req.user.id,function(data){
    res.json(data);

  })
  
});

router.get('/total_inasistencia', authenticate, function(req, res) {
  inasistenciaController.getInasistenciaCount(req.user.id,function(data){
    if(!data){
          return res
            .status(400)
            .json({});
            }else{
              res.json(data);
            }
  })
  
});
//getInasistenciaMateria
router.get('/inasistencia_materia/:id_materia', authenticate, function(req, res) {
  inasistenciaController.getInasistenciaMateria(req.user.id,req.params.id_materia,function(data){
    if(!data){
          return res
            .status(400)
            .json({});
            }else{
              res.json(data);
            }
  })
  
});

router.post('/inasitecia',authenticate, function(req,res){
	inasistenciaController.addInasistencia
})




module.exports = router;