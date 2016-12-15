var express = require('express');
var router = express.Router();
//var users = require('../queries/users');


var cursoController = require('../../controllers/cursoController');
//var inasistenciaController = require('../../controllers/inasistenciaController');
var authenticate = require('./auth').authenticate;

var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo';
var db = pgp(connectionString);






router.get('/:id_curso/estudiantes', authenticate, function(req, res) {
  //console.log(req.user);
  cursoController.getEstudiantesCurso(req.params.id_curso,function(data){
    if(!data){
          return res
            .status(400)
            .json({});
            }else{
              res.json(data);
            }
  })
  
});

router.get('/cursos_materia', authenticate, function(req, res) {
  cursoController.getCursosMaterias(req.user.id,function(data){
    if(!data){
          return res
            .status(400)
            .json({});
            }else{
              res.json(data);
            }
  })
  
});

router.get('/logros_profesor', authenticate, function(req, res) {
  cursoController.getLogroMateriaProfesor(req.user.id,function(data){
    if(!data){
          return res
            .status(400)
            .json({});
            }else{
              res.json(data);
            }
  })
  
});

router.get('/actividad_logros_profesor', authenticate, function(req, res) {
  cursoController.getActividadLogroProfesor(req.user.id,function(data){
    if(!data){
          return res
            .status(400)
            .json({});
            }else{
              res.json(data);
            }
  })
  
});

router.get('/nota_actividad_profesor', authenticate, function(req, res) {
  cursoController.getNotaActividadProfesor(req.user.id,function(data){
    if(!data){
          return res
            .status(400)
            .json({});
            }else{
              res.json(data);
            }
  })
  
});

router.post('/insert_nota', authenticate, function(req, res) {
  cursoController.postNotaActividadProfesor(req.user.id,req.body.nota,req.body.id_estudiante,function(data){
    if(!data){
          return res
            .status(201)
            .json({});
            }else{
              res.json(data);
            }
  })
  
});

router.post('/inasistencia',authenticate,function(req,res){
      cursoController.addInasistencias(req.body, function(data){
      res.json(data);
    });
  });


/*function signin(req, res,next){
  var email = req.body.email;
  var password = req.body.password;
  var passwordEncriptada = encriptar(email,password);
  db.one("select * from users where email = ${email}",
    {
      email:email
    })
  .then(function(data){
    res.send("el usuario ya existe");
  }).catch(function(err){

    if (err.code == 0){
      var queri = "insert into users(email,password) values ('"+email+"','"+passwordEncriptada+"')";
       console.log(queri)
      //si entra qui el usuario no existe
    
      db.none(queri)
      .then(function(data){
        res.send("insertado")

      }).catch(function(err){
        return next(err);
      });
            
    }else return next(err);

  })
    //si entro aqui es por que  el usuario existe, y  va a revisar la contraseña

}*/

module.exports = router;