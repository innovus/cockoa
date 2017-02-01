var express = require('express');
var router = express.Router();
//var users = require('../queries/users');
var todosController = require('../../controllers/todosController');
var FuncionesSeguridad= require('../../helpers/funcionesSeguridad');
var authenticate = require('./auth').authenticate;
var promise = require('bluebird');
var options = {
    // Initialization Options
    promiseLib: promise
};


router.get('/periodos', /* authenticate,*/ todosController.getPeriodosDisponibles);
router.get('/periodos/actual', /* authenticate,*/ todosController.getPeriodoActual);
router.get('/perfil', FuncionesSeguridad.autorizacion, todosController.getPerfil);
module.exports = router;