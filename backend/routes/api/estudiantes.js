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
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);



function getMAterias(req,res){
  /*
  estudiantesController.getMateriasEstudiante(req.user.id,function(data){
    req.materias = data;
    console.log(req.materias);
    next();
  })*/
  estudiantesController.getMateriasYLogrosE(req.user.id,function(data){
    console.log('response')
    res.status(200).json(data);
}
  );

}
function getNotas(req,res, next){
  //req.materias 
  materias = []
  addJsonLogros(req.materias[0],function(nuevaMateria){
        console.log("entra a addJsonLogros")
        materias.push(nuevaMateria);
      })

//console.log("antes del for");
  
 // for (i = 0; i < data.length; i++) { 
  /*i = 0;

    (function(i){
      console.log("empieza el for")
 
      materia = data[i];

 
      addJsonLogros(materia,function(nuevaMateria){
        console.log("entra a addJsonLogros")
        materias.push(nuevaMateria);
      })
      console.log('este es 3: ' + JSON.stringify(materias));
    })(i);
 // }*/

  req.respuesta = materias;
  console.log('recorre las materias ' + JSON.stringify(materias))
  next();
 
  

}
function response(req,res){
  console.log('response')
  res.status(200).json(req.respuesta);


}
function crearJsonReturn(materias, materia){
   materia['logros']= logros;

}
function addJsonLogros(materia,cb){
 // console.log('materia '+ i + '  ' + JSON.stringify(materia));;;;;;;;;;
  estudiantesController.getLogrosEstudiante(1,materia.id_materia,function(dataLogros){
      //dataMaterias[i].logros = dataLogros;

   /*   if(dataLogros == ""){
        dataLogros = {'logros':[]};
      
      }*/
      console.log("se supone q ya trajo los losgros: "+ dataLogros)
      item1={ dataLogros }
      materia['logros']= dataLogros;

     // console.log('logros: ' + JSON.stringify(materia));
      
      cb(materia)
  
      //data.push(dataLogros);

      });

}
//router.get('/materias', authenticate, getMAterias,getNotas, response);
router.get('/materias', authenticate, getMAterias);

/*

router.get('/materias', authenticate, function(req, res) {
  //console.log(req.user);
  estudiantesController.getMateriasEstudiante(req.user.id,function(data){

  	
  	//console.log("primero: "+ JSON.stringify(dataMaterias[0]));
    var respuesta;
  	

  	for (i = 0; i < data.length; i++) { 
  		console.log(data[i].id_materia)
  		estudiantesController.getLogrosEstudiante(req.user.id,data[i].id_materia,function(dataLogros){
  		//dataMaterias[i].logros = dataLogros;
      if(dataLogros == ""){
        dataLogros = {'logros': '7'}
      
      }
  		//console.log('logros: ' + JSON.stringify(dataLogros));
      respuesta = dataLogros;
      console.log('logros: ' + JSON.stringify(respuesta));
  		//data.push(dataLogros);

  		})
  		

  		

    }

 	console.log("final: "+ JSON.stringify(respuesta));
    res.json(respuesta);

  })
  
});*/



module.exports = router;