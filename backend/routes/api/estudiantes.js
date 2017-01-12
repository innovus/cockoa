var express = require('express');
var router = express.Router();
//var users = require('../queries/users');
var estudiantesController = require('../../controllers/estudiantesController');
var authenticate = require('./auth').authenticate;
var FuncionesSeguridad= require('../../helpers/funcionesSeguridad');


//router.get('/materias', authenticate, getMAterias,getNotas, response);
router.get('/materias', FuncionesSeguridad.autorizacion, estudiantesController.getMateriasEstudiante);
router.get('/materias/:id_materia/logros/periodos/:id_periodo', FuncionesSeguridad.autorizacion,estudiantesController.getLogrosEstudiante);
router.get('/materias/:id_materia/notas/periodos/:id_periodo', FuncionesSeguridad.autorizacion,estudiantesController.getNotasLogros);
router.get('/logros/:id_logro/actividades',estudiantesController.getActividadesEstudiante);
router.get('/actividades/notas', FuncionesSeguridad.autorizacion,estudiantesController.getNotasActividades);

//de post a get
router.get('/notificaciones/',FuncionesSeguridad.autorizacion ,estudiantesController.getNotificaciones);
router.get('/notas/logros/materia/',FuncionesSeguridad.autorizacion,estudiantesController.getNotaLogrosMaterias);
router.get('/logro/:id_logro/notas/actividad/',FuncionesSeguridad.autorizacion,estudiantesController.getNotasActividadbyLogro);
router.get('/tipos_notificaciones/'/*authenticate,*/,estudiantesController.getTiposNotificacion);

//de post a get
router.get('/notificaciones/pendientes',FuncionesSeguridad.autorizacion,estudiantesController.getNotificacionesPendientes);
router.put('/notificaciones/estado',FuncionesSeguridad.autorizacion,estudiantesController.updateEstadoNotificacion);
router.get('/actividad/nota/:id_actividad',FuncionesSeguridad.autorizacion,estudiantesController.getNotaActividadEstudiantebyMateria);//getNotaActividadEstudiantebyMateria

router.delete('/dispositivo',FuncionesSeguridad.autorizacion,estudiantesController.deleteDispositivo);
router.POST('/dispositivo',FuncionesSeguridad.autorizacion,estudiantesController.createDispositivo);//getNotaActividadEstudiantebyMateria

module.exports = router;