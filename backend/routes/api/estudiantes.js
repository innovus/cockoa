var express = require('express');
var router = express.Router();
//var users = require('../queries/users');
var estudiantesController = require('../../controllers/estudiantesController');
var authenticate = require('./auth').authenticate;


//router.get('/materias', authenticate, getMAterias,getNotas, response);
router.get('/materias', /*authenticate,*/ estudiantesController.getMateriasEstudiante);
router.get('/materias/:id_materia/logros/periodos/:id_periodo', /*authenticate,*/estudiantesController.getLogrosEstudiante);
router.get('/materias/:id_materia/notas/periodos/:id_periodo', /*authenticate,*/estudiantesController.getNotasLogros);
router.get('/logros/:id_logro/actividades', /*authenticate,*/estudiantesController.getActividadesEstudiante);
router.get('/actividades/notas', /*authenticate,*/estudiantesController.getNotasActividades);
router.post('/notificaciones/',estudiantesController.getNotificaciones);
router.get('/notas/logros/materia/:id_estudiante',estudiantesController.getNotaLogrosMaterias);
router.get('/logro/:id_logro/notas/actividad/',estudiantesController.getNotasActividadbyLogro);
router.get('/tipos_notificaciones/',estudiantesController.getTiposNotificacion);
router.post('/notificaciones/pendientes',estudiantesController.getNotificacionesPendientes);
router.put('/notificaciones/estado',estudiantesController.updateEstadoNotificacion);
module.exports = router;