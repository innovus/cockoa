var express = require('express');
var router = express.Router();
//var users = require('../queries/users');


var profesoresController = require('../../controllers/profesorController');
var authenticate = require('./auth').authenticate;

router.get('/cargas/periodos/:id_periodo'/*, authenticate*/, profesoresController.getCursosMateriasPorPeriodo);
router.get('/cargas'/*, authenticate*/, profesoresController.getCursosMaterias);
router.get('/cargas/:id_carga/logros'/*, authenticate*/,profesoresController.getLogros);
router.get('/logros/:id_logro/actividades'/*, authenticate*/,profesoresController.getActividades);
router.delete('/logros/:id_logro'/*, authenticate*/,profesoresController.deleteLogro);
router.delete('/actividades/:id_actividad'/*, authenticate*/,profesoresController.deleteActividad);
router.post('/logros/actividades'/*, authenticate*/,profesoresController.getActividadesByLogros);
router.post('/logros',profesoresController.createLogro);
router.get('/cargas/:id_carga/logros/notas'/*, authenticate*/, profesoresController.getNotasLogros);
router.get('/cargas/:id_carga/logros/actividades/notas'/*, authenticate*/,profesoresController.getNotasActividades);
router.put('/actividades/porcentajes'/*, authenticate*/,profesoresController.updatePorcentajesActividades);
router.put('/logros/porcentajes'/*, authenticate*/,profesoresController.updatePorcentajesLogros);
router.put('/:table/notas'/*, authenticate*/,profesoresController.updateNota);
router.put('/logros/descripcion'/*, authenticate*/,profesoresController.updateDescripcionLogro);
router.post('/:table/notas'/*, authenticate*/,profesoresController.insertNota);
router.post('/actividades',profesoresController.createActividad);
router.put('/actividades/descripcion'/*, authenticate*/,profesoresController.updateDescripcionActividad);

//(router.get('/prueba'/*, authenticate*/, prueba);


module.exports = router;