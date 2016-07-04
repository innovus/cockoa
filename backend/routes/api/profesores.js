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
	profesoresController.getCursosMaterias(/*req.user.id*/2,function(data){
		console.log('response')
    	res.status(200).json(data);
    });
}

router.get('/cargas'/*, authenticate*/, getCursosMaterias);

module.exports = router;