var express = require('express');
var router = express.Router();
//var users = require('../queries/users');


var estudiantesController = require('../../controllers/estudiantesController');
var authenticate = require('./auth').authenticate;

var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo';
var db = pgp(connectionString);



router.get('/materias', authenticate, function(req, res) {
  //console.log(req.user);
  estudiantesController.getMateriasEstudiantes(req.user.id,function(data){
    if(!data){
          return res
            .status(400)
            .json({});
            }else{
              res.json(data);
            }
   // res.json(data);

  })
  
});

router.get('/materias/logros', authenticate, function(req, res) {
  //console.log(req.user);
  estudiantesController.getLogroMateria(req.user.id,function(data){
    res.json(data);

  })
  
});

router.get('/materias/logros/:id_materia?', authenticate, function(req, res) {
  //console.log(req.user);
  estudiantesController.getLogroMateriaId(req.user.id,req.params.id_materia,function(data){
    if(!data){
          return res
            .status(401)
            .json({});
            }else{
              res.json(data);
            }
   // res.json(data);

  })
  
});

router.get('/materias/logro/periodo/:id_materia-:numero_periodo', authenticate, function(req, res) {
  //console.log(req.user);
  estudiantesController.getLogroMateriaPeriodoId(req.user.id,req.params.id_materia,req.params.numero_periodo,function(data){
    if(!data){
          return res
            .status(400)
            .json({});
            }else{
              res.json(data);
            }
   // res.json(data);

  })
  
});

router.get('/materias/notalogro/:id_materia-:id_logro', authenticate, function(req, res) {
  //console.log(req.user);
  estudiantesController.getNotaLogroId(req.user.id,req.params.id_materia,req.params.id_logro,function(data){
    if(!data){
          return res
            .status(400)
            .json({});
            }else{
              res.json(data);
            }
   // res.json(data);

  })
  
});

router.get('/materias/logro/notas', authenticate, function(req, res) {
  //console.log(req.user);
  estudiantesController.getNotaLogro(req.user.id,function(data){
    


    res.json(data);

    /*db.one('select * from area where id_area = '+ id)
              .then(function (data) {
             if(!data){
          return res
            .status(400)
            .send({});
            }else{
                res.status(200)
                       .json({
                         status: 'success',
                         data: data,
                          message: 'Obteniendo una area'
                      });
              }
          })
        .catch(function (err) {
         return res.status(400)
                 .json({});
                 next(err);
        });*/

  })
  
});

router.get('/materias/juan', authenticate, function(req, res) {
  //console.log(req.user);
  estudiantesController.getMateriasYLogrosE(req.user.id,function(data){
    res.json(data);

  })
  
});

module.exports = router;