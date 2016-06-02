var express = require('express');
var router = express.Router();
//var users = require('../queries/users');


var estudiantesController = require('../../controllers/estudiantesController');
var authenticate = require('./auth').authenticate;

var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);



router.get('/materias', authenticate, function(req, res) {
  //console.log(req.user);
  estudiantesController.getMateriasEstudiante(req.user.id,function(data){
    res.json(data);

  })
  
});

module.exports = router;