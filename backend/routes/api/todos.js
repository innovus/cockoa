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
router.get('/periodos', /* authenticate,*/ todosController.getPeriodosDisponibles);
router.get('/periodos/actual', /* authenticate,*/ todosController.getPeriodoActual);
module.exports = router;