var express = require('express');
var router = express.Router();
//var users = require('../queries/users');
var profesoresController = require('../../controllers/profesorController');
var FuncionesSeguridad= require('../../helpers/funcionesSeguridad');


router.get('/cargas/periodos/:id_periodo',FuncionesSeguridad.autorizacion, profesoresController.getCursosMateriasPorPeriodo);
router.get('/cargas' ,FuncionesSeguridad.autorizacion, profesoresController.getCursosMaterias);
router.get('/cargas/:id_carga/logros',FuncionesSeguridad.autorizacion, profesoresController.getLogros);
router.get('/logros/:id_logro/actividades' ,FuncionesSeguridad.autorizacion , profesoresController.getActividades);
router.get('/actividades/:id_actividad', profesoresController.getActividadById)
router.delete('/logros/:id_logro' ,FuncionesSeguridad.autorizacion , profesoresController.deleteLogro);
router.get('/cursos/:id_curso/estudiantes',FuncionesSeguridad.autorizacion,profesoresController.getAllEstudianteByIdCurso);
router.delete('/actividades/:id_actividad' ,FuncionesSeguridad.autorizacion , profesoresController.deleteActividad);
router.post('/logros/actividades' ,FuncionesSeguridad.autorizacion, profesoresController.getActividadesByLogros);
router.post('/logros',,FuncionesSeguridad.autorizacion profesoresController.createLogro);
router.get('/cargas/:id_carga/logros/notas' ,FuncionesSeguridad.autorizacion, profesoresController.getNotasLogros);
router.get('/cargas/:id_carga/logros/actividades/notas' ,FuncionesSeguridad.autorizacion , profesoresController.getNotasActividades);
router.put('/actividades' ,FuncionesSeguridad.autorizacion , profesoresController.updateActividades);
router.delete('/actividades',FuncionesSeguridad.autorizacion , profesoresController.deleteActividades);
router.post('/actividades',FuncionesSeguridad.autorizacion, profesoresController.createActividades);
router.post('/actividades/guardar' ,FuncionesSeguridad.autorizacion, profesoresController.guardarActividadesTransaccion)
router.post('/logros/guardar',FuncionesSeguridad.autorizacion, profesoresController.guardarLogrosTransaccion);
router.put('/logros/porcentajes' ,FuncionesSeguridad.autorizacion , profesoresController.updatePorcentajesLogros);
router.put('/:table/notas' ,FuncionesSeguridad.autorizacion , profesoresController.updateNota);
router.put('/logros/descripcion' ,FuncionesSeguridad.autorizacion , profesoresController.updateDescripcionLogro);
router.post('/:table/notas' ,FuncionesSeguridad.autorizacion , profesoresController.insertNota);
//router.post('/actividades',profesoresController.createActividad);
router.put('/actividades/descripcion' ,FuncionesSeguridad.autorizacion , profesoresController.updateDescripcionActividad);
//(router.get('/prueba'/*, authenticate*/, prueba);
module.exports = router;