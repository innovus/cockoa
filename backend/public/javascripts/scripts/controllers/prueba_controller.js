//una function javascript q se llama asi misma
(function (){

var app = angular.module('docentes', ['ui.bootstrap','ngCookies']);//creamos el modulo pokedex y le pasamos array con las dependencias


//creamos un controlador
//definimos el primer controlador, le pasamos el nombre
    //del controlador y le pasamos una function javascript

//Agregamos el objecto pokemon asociado al controlador
app.controller('docentes_notasController',['$scope','$http','$cookieStore', '$cookies',function($scope,$http,$cookieStore,$cookies){


  $scope.estudiantes=[];
  $scope.date_asistencia = new Date();
  $scope.carga_seleccionada = null;
  $scope.selected = {
    ids_estudiantes:[]
  };

  $scope.carga_seleccionada = null;
  $scope.periodos = [];
  $scope.periodo_sel = null;
  $scope.activeTabIndex = 0;
  $scope.periodo_actual = null;
  $scope.logros = [];
  $scope.cabeceras=[];

  //Trae el periodo Actual
  $http.get('/api/todos/periodos/actual')
  .success(function(data){
    $scope.periodo_actual = data;

    console.log(data);
  }).error(function(error){
    console.log(error);
  });


  //Trae todos los periodos y pone el actual
  $http.get('/api/todos/periodos')
  .success(function(data){
    $scope.periodos = data; 

    //recorre el vector de todos los periodos 
    for (var i = 0; i < data.length ; i++) {
      //entra cuando el periodo actual es encontrado en el vector
      if(data[i].id_periodo == $scope.periodo_actual.id_periodo){
        //selecciona el periodo actual en las tabs
        $scope.activeTabIndex = i;
        //
        $scope.periodo_sel = $scope.periodos[i];

         // Trae todas las cargas de un periodo seleccionado
        $http.get('/api/docentes/cargas/periodos/'+ $scope.periodo_sel.id_periodo)
        .success(function(data) {
          $scope.cargas = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
       }//cierra el if
     }//cierra for
   }).error(function(error){
    console.log(error);
    $scope.periodos = []
  });
   /////////////////////
  //////// fin trae cargas

  /////prueba

  $scope.visible = false
  $scope.show = function(){
    $scope.visible = true;

  }
  $scope.cancel = function(){
    $scope.visible = false;

  }


  ////////

    //funcion que se la usa cuando le da click en un tab
  $scope.getPeriodoId = function(index){
    $scope.periodo_sel = $scope.periodos[index];
    $http.get('/api/docentes/cargas/periodos/'+ $scope.periodo_sel.id_periodo)
    .success(function(data) {
      $scope.cargas = data;
      var encontrado = false;

      //hace la busqueda si existe la misma carga en las nuevas cargas de este periodo
      //para dejarla seleccionada con las nuevas
      for (var i = 0; i < data.length ; i++) {

     
        (function(i){
        
          if(data[i].nombre_materia == $scope.carga_seleccionada.nombre_materia && data[i].id_curso == $scope.carga_seleccionada.id_curso ){
            $scope.carga_seleccionada = data[i];
            encontrado = true;
            
          }
        })(i);  
      }
      if(encontrado == false){
        $scope.carga_seleccionada = null;
      }

      seleccionarCarga($scope.carga_seleccionada);
            

    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  };

  $scope.selectCurso = function (carga){
    seleccionarCarga(carga);
  }

  function seleccionarCarga(carga){
    $scope.cabeceras = [];
    $scope.carga_seleccionada = carga;
    $scope.estudiantes = [];
    $scope.cantidad = {};
    $scope.selected.ids_estudiantes = [];
    getEstudiantes(carga.id_curso,function(estudiantes){
      $scope.estudiantes=estudiantes;

      getLogros(carga.id_carga_docente, function(logros){
        $scope.logros = logros;

        //fpor para recorrer osgros y agregarle actividades
        for (var i =0; i < logros.length ; i++) {
          (function(i){
            console.log("Entro a recorrer los logros posicion: " + i + "id_logro " +logros[i].id_logro);
          
            getActividades(logros[i].id_logro,function(actividades){


              $scope.logros[i].actividades = actividades;

              //for para llenar las cabeceras segun el numero de actividades
              for (var j =0; j < actividades.length; j++) {
                (function(j){
          
                 $scope.cabeceras.push("A"+ (j+1) + (" ("+actividades[j].porcentaje_actividad+"%)"));
               // $scope.cabeceras.push("{'id_actividad':'"+actividades[j].id_actividad+"','nombre_cabecera':'A"+(j+1)+"'}"+ ;
                })(j);
              }//finaliza for que recorre actividades
              $scope.cabeceras.push("Final");
             
            });

          })(i);
        };//finaliza For recorre logros
        console.log("que pasa")
        console.log($scope.cabeceras);
        //console.log($scope.logros);





///////////////////////////////////////////
        getNotasActividades(carga.id_carga_docente,function(notas_actividades){
          getNotasLogros(carga.id_carga_docente,function(notas_logros){

            for(var i = 0; i < $scope.estudiantes.length; i++){ 

              var notas= [];
            
              (function(i){
                

                //si no encuentro al estudiante en las notas pongo de una vez -  a todas las notas
                if(typeof notas_actividades[$scope.estudiantes[i].id_estudiante] === 'undefined' ){
                 
                  
                  for(var k = 0; k < $scope.cabeceras.length; k++){
                    notas.push(" - ");

                  }
                  
                }
                else{
                  
                  //recorro en vector de logros
                  for (var l =0;  l < $scope.logros.length; l++) {
                    //si no encuentroel logro en el esstudiante busco la nota de el logro y pongo -  a todas las notas de actividades
                    if(typeof notas_actividades[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro] === 'undefined' ){
                      for(var k = 0; k < $scope.logros[l].actividades.length; k++){
                        notas.push(" - ");
                       
                      }
                      //si el logro es indefinido ponga - si no ponga la nota de el logro
                      if(typeof notas_logros[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro] === 'undefined'){
                       
                        notas.push(" - ");
                      }else{
                      
                        notas.push(notas_logros[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro])
                      }
                      //$scope.estudiantes.notas = notas; 
                    }else{
                     
                      //recoore actividades
                      for(var k = 0; k < $scope.logros[l].actividades.length; k++){
                         //si no encuentra nota de actividad ponga - 
                        if(typeof notas_actividades[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro][$scope.logros[l].actividades[k].id_actividad]  === 'undefined'){
                          notas.push(" - ");
                        }else{
                          notas.push(notas_actividades[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro][$scope.logros[l].actividades[k].id_actividad]);
                        }


                      }
                      //si el logro es indefinido ponga - si no ponga la nota de el logro
                      if(typeof notas_logros[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro] === 'undefined'){
                        notas.push(" - ");
                      }else{
                       
                        notas.push(notas_logros[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro])
                      }
                    }
                  }

                }
                $scope.estudiantes[i].notas = notas;
                
                
              })(i);
            }

          })
        })
///////////


      });

    });//CIERRA GETCURSOS
  }//CIERA FUNCION SELECIONAR CARGA

  function getEstudiantes(id_curso,cb){
    $http.get('/api/cursos/'+id_curso+'/estudiantes')
    .success(function(est){
      for (var i = est.length - 1; i >= 0; i--) {
        est[i].nombre1 = delNull(est[i].nombre1);
        est[i].nombre2 = delNull(est[i].nombre2);
        est[i].apellido1 = delNull(est[i].apellido1);
        est[i].apellido2 = delNull(est[i].apellido2);
        est[i].nombrecompleto = est[i].nombre1 + " "+ est[i].nombre2 + " " + est[i].apellido1 + " "+  est[i].apellido2;                
      }//cierra dor
      cb(est);
    }).error(function(error){
      cb([]);
      console.log('Error: ' + error);
    });//cierra get
  }//cierra funcion


  $scope.getMateriasYLogros = function(materia){
    $scope.materia_seleccionada = materia;
    getNotasYLogros($scope.materia_seleccionada,$scope.periodo_sel);
  };

  function getLogros (id_carga,cb){
    $http.get('/api/docentes/cargas/'+id_carga+'/logros')
    .success(function(logros){ 
      cb(logros);                   
      //$scope.logros = logros;
    })
    .error(function(error){
      console.log('Error: '+ error);
      cb([]);
    });

  }
  function getNotas(id_materia,id_periodo,cb){
    $http.get('/estudiantes/materias/'+id_materia +'/notas/periodos/'+ id_periodo)
    .success(function(notas){ 
      cb(notas);                   
      //$scope.logros = logros;
    })
    .error(function(error){
      console.log('Error: '+ error);
      cb({});
    });
  }
  function getActividades (id_logro,cb){
    $http.get('/api/docentes/logros/'+id_logro+'/actividades')
    .success(function(actividades){ 
      cb(actividades);                   
      //$scope.logros = logros;
    })
    .error(function(error){
      console.log('Error: '+ error);
      cb([]);
    });

  }
  function getNotasActividades(id_carga,cb){
    $http.get('/api/docentes/cargas/'+id_carga +'/logros/actividades/notas')
    .success(function(notas){ 
      cb(notas);                   
      //$scope.logros = logros;
    })
    .error(function(error){
      console.log('Error: '+ error);
      cb({});
    });
  }
  function getNotasLogros(id_carga,cb){
    $http.get('/api/docentes/cargas/'+id_carga +'/logros/notas')
    .success(function(notas){ 
      cb(notas);                   
      //$scope.logros = logros;
    })
    .error(function(error){
      console.log('Error: '+ error);
      cb({});
    });
  }
}]);
      
})();
function delNull(item){
  if(item == null){
    return "";
  }else{
    return item;
  }
}



