var express = require('express');
var router = express.Router();
//var users = require('../queries/users');


var profesoresController = require('../../controllers/profesorController');
var authenticate = require('./auth').authenticate;

router.get('/cargas/periodos/:id_periodo'/*, authenticate*/, profesoresController.getCursosMateriasPorPeriodo);
router.get('/cargas'/*, authenticate*/, profesoresController.getCursosMaterias);
router.get('/cargas/:id_carga/logros'/*, authenticate*/,profesoresController.getLogros);
router.get('/logros/:id_logro/actividades'/*, authenticate*/,profesoresController.getActividades);
router.get('/cargas/:id_carga/logros/notas'/*, authenticate*/, profesoresController.getNotasLogros);
router.get('/cargas/:id_carga/logros/actividades/notas'/*, authenticate*/,profesoresController.getNotasActividades);
router.put('/actividades/porcentajes'/*, authenticate*/,profesoresController.updatePorcentajesActividades);
router.put('/:tabla/notas'/*, authenticate*/,profesoresController.updateNota);
router.post('/:tabla/notas'/*, authenticate*/,profesoresController.insertNota);
//(router.get('/prueba'/*, authenticate*/, prueba);


module.exports = router;