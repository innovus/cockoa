var express = require('express');
var router = express.Router();
var FuncionesSeguridad= require('../../helpers/funcionesSeguridad');



var inasistenciaController = require('../../controllers/inasistenciaController');
var authenticate = require('./auth').authenticate;

router.get('/mi_inasistencia', FuncionesSeguridad.autorizacion, inasistenciaController.getMiInasistencia);


router.get('/cargas/:id_carga/estudiantes/:id_estudiante',FuncionesSeguridad.autorizacion, inasistenciaController.getInasistenciaPorCarga);
router.post('/inasistencia',FuncionesSeguridad.autorizacion,  inasistenciaController.addInasistencias)
router.put('/estado',FuncionesSeguridad.autorizacion,  inasistenciaController.updateEstadoInasistencia)


router.get('/cargas/:id_carga', FuncionesSeguridad.autorizacion, inasistenciaController.getCantidadInasistenciasCarga);
router.get('/materias', FuncionesSeguridad.autorizacion, inasistenciaController.getMateriasWithInasistenciaByEstudiante);
router.get('/materias/:id_materia',FuncionesSeguridad.autorizacion, inasistenciaController.getInasistenciasByMateria);
router.get('/cantida/inasistencia/materia',FuncionesSeguridad.autorizacion, inasistenciaController.getCantidadInasistenciaMateria);//getInasistenciasEstudianteByCarga
router.get('/carga/:id_carga/estudiante/:id_estudiante', FuncionesSeguridad.autorizacion, inasistenciaController.getInasistenciasEstudianteByCarga);
router.get('/loginmovil',FuncionesSeguridad.loginMovil);
/*
router.get('/cargas/:id_carga', function(req,res){
	inasistenciaController.getInasistenciasCarga(req.params.id_carga, function(data){
		res.json(data);
	})
})*/

module.exports = router;