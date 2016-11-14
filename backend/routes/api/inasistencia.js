var express = require('express');
var router = express.Router();
//var users = require('../queries/users');


var inasistenciaController = require('../../controllers/inasistenciaController');
var authenticate = require('./auth').authenticate;

router.get('/mi_inasistencia', /*authenticate,*/inasistenciaController.getMiInasistencia);
router.get('/cargas/:id_carga/estudiantes/:id_estudiante',/* authenticate,*/ inasistenciaController.getInasistenciaPorCarga);
router.post('/inasistencia',/*authenticate,*/ inasistenciaController.addInasistencias)
router.put('/estado',/*authenticate,*/ inasistenciaController.updateEstadoInasistencia)
router.get('/cargas/:id_carga',inasistenciaController.getCantidadInasistenciasCarga);
router.get('/materias',inasistenciaController.getMateriasWithInasistenciaByEstudiante);
router.get('/materias/:id_materia',inasistenciaController.getInasistenciasByMateria);
router.get('/cantida/inasistencia/materia',inasistenciaController.getCantidadInasistenciaMateria);//getInasistenciasEstudianteByCarga
router.get('/carga/:id_carga/estudiante/:id_estudiante',/* authenticate,*/ inasistenciaController.getInasistenciasEstudianteByCarga);
/*
router.get('/cargas/:id_carga', function(req,res){
	inasistenciaController.getInasistenciasCarga(req.params.id_carga, function(data){
		res.json(data);
	})
})*/

module.exports = router;