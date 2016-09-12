//una function javascript q se llama asi misma
(function (){

angular
.module('docentes')
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
})
.controller('docentes_notasController',docentes_notasController);

/*
run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
})
.controller('docentes_notasController',docentes_notasController);
*/

docentes_notasController.$inject= ['$scope','$http','$cookieStore', '$cookies','CONFIG','periodoData','estudianteData','actividadData','logroData','nota_actividadData','nota_logroData'];
function docentes_notasController($scope,$http,$cookieStore,$cookies,CONFIG,periodoData,estudianteData,actividadData,logroData,nota_actividadData,nota_logroData) {

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
  $scope.valorBefore = 0.0;


  //Trae el periodo Actual
  periodoData.findPeriodoActual()
  .success(function(data){
    $scope.periodo_actual = data[0];

    console.log(data);
  }).error(function(error){
    console.log(error);
  });

    //Trae todos los periodos y pone el actual
  periodoData.findPeriodos()
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
        periodoData.findCargasByPeriodo($scope.periodo_sel.id_periodo)
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

      //funcion que se la usa cuando le da click en un tab
  $scope.getPeriodoId = function(index){
    $scope.periodo_sel = $scope.periodos[index];
    periodoData.findCargasByPeriodo($scope.periodo_sel.id_periodo)
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
          
                  $scope.cabeceras.push({'id':actividades[j].id_actividad,'tipo':1,'mostrar':"A"+ (j+1) + (" ("+actividades[j].porcentaje_actividad+"%)")});
                  // $scope.cabeceras.push("{'id_actividad':'"+actividades[j].id_actividad+"','nombre_cabecera':'A"+(j+1)+"'}"+ ;
                })(j);
              }//finaliza for que recorre actividades
              $scope.cabeceras.push({'id':logros[i].id_logro,'tipo':0,'mostrar':'Final'}); 
            });
            console.log($scope.cabeceras);
          })(i);
        };//finaliza For recorre logros
      
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
                    (function(k){
                      notas.push({
                        'id':$scope.cabeceras[k].id,
                        'tipo':$scope.cabeceras[k].tipo,
                        'id_estudiante':$scope.estudiantes[i].id_estudiante,
                        'mostrar':'-'
                      });


                    })(k);
                    
                  }
                  
                }
                else{
                  
                  //recorro en vector de logros
                  for (var l =0;  l < $scope.logros.length; l++) {
                    //si no encuentroel logro en el esstudiante busco la nota de el logro y pongo -  a todas las notas de actividades
                    if(typeof notas_actividades[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro] === 'undefined' ){
                      for(var k = 0; k < $scope.logros[l].actividades.length; k++){
                        (function(k){
                          notas.push({
                            'id':$scope.logros[l].actividades[k].id_actividad,
                            'tipo':1,
                            'id_estudiante':$scope.estudiantes[i].id_estudiante,
                            'mostrar':'-'
                          });
                        })(k); 
                       
                      }
                      //si el logro es indefinido ponga - si no ponga la nota de el logro
                      if(typeof notas_logros[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro] === 'undefined'){
                        notas.push({
                          'id':$scope.logros[l].id_logro,
                          'tipo':0,
                          'id_estudiante':$scope.estudiantes[i].id_estudiante,
                          'mostrar':'-'}); 
                      }else{
                        notas.push(
                          {'id':$scope.logros[l].id_logro,
                          'tipo':0,
                          'id_estudiante':$scope.estudiantes[i].id_estudiante,
                          'mostrar':notas_logros[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro]
                        });
         
                      }
                      
                    }else{
                     
                      //recoore actividades
                      for(var k = 0; k < $scope.logros[l].actividades.length; k++){
                         //si no encuentra nota de actividad ponga - 
                         (function(k){
                          if(typeof notas_actividades[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro][$scope.logros[l].actividades[k].id_actividad]  === 'undefined'){
                            notas.push({
                              'id':$scope.logros[l].actividades[k].id_actividad,
                              'tipo':1,
                              'id_estudiante':$scope.estudiantes[i].id_estudiante,
                              'mostrar':'-'});
                          }else{
                            notas.push({
                              'id':$scope.logros[l].actividades[k].id_actividad,
                              'tipo':1,
                              'id_estudiante':$scope.estudiantes[i].id_estudiante,
                              'mostrar':notas_actividades[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro][$scope.logros[l].actividades[k].id_actividad]
                            });
                      
                          }
                        })(k);
                      }
                      //si el logro es indefinido ponga - si no ponga la nota de el logro
                      if(typeof notas_logros[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro] === 'undefined'){
                        notas.push({'id':$scope.logros[l].id_logro,'tipo':0,'id_estudiante':$scope.estudiantes[i].id_estudiante,'mostrar':'-'});
                      }else{
                        notas.push(
                          {'id':$scope.logros[l].id_logro,
                          'tipo':0,
                          'id_estudiante':$scope.estudiantes[i].id_estudiante,
                          'mostrar':notas_logros[$scope.estudiantes[i].id_estudiante][$scope.logros[l].id_logro]
                        });
                      }// cierra else
                    }//cierra else
                  }//cierra for que recorro en vector de logros
                } // cierra if type of - si no encuentro al estudiante en las notas pongo de una vez -  a todas las notas
                console.log(notas)
                $scope.estudiantes[i].notas = notas;
              })(i);//cierra funcion()
            }//cierra for

          })//cierra gerNotasLogros
        })//cierra getNotasActividades
      });//vierra GEt logros

    });//CIERRA GETCURSOS
  }//CIERA FUNCION SELECIONAR CARGA


  $scope.before = function(valor1){
    $scope.valorBefore = valor1.mostrar;
    console.log("entro a before");
    console.log($scope.valorBefore);
    //console.log($scope.valor);
  }
  $scope.after = function(valor){
    console.log(valor)
    var results = {};

    //miro que tipo es si es logro(0) o actividad(1)
    if(valor.tipo == 0 ){
      var results = {
        'id_logro':valor.id,
        'id_estudiante': valor.id_estudiante,
        'nota_logro': parseFloat(valor.mostrar) 

      }
      //si es 0 miro si esta '-' es para insertar la nota, si no es para actualizarla
      if($scope.valorBefore == '-'){
        console.log("es un logro y es para insertar");

        $http({
          method: 'POST',
          url: CONFIG.http_address+'/api/docentes/logros/notas',
          headers:{
            'Content-Type':'application/json'
          },
          data: results

        })
        .success(function(mensaje){
          console.log(mensaje);
        

        }).error(function(error){
          console.log(error);
          return  error;
        });
      }else{
        console.log("es un logro y es para actualizar");

        $http({
          method: 'PUT',
          url: CONFIG.http_address+'/api/docentes/logros/notas',
          headers:{
            'Content-Type':'application/json'
          },
          data: results

        })
        .success(function(mensaje){
          console.log(mensaje);
        

        }).error(function(error){
          console.log(error);
          return  error;
        });

      }
    
    }else {
      var results = {
        'id_actividad':valor.id,
        'id_estudiante': valor.id_estudiante,
        'nota_actividad': parseFloat(valor.mostrar) 

      }
      if($scope.valorBefore == '-'){
        $http({
          method: 'POST',
          url: CONFIG.http_address+'/api/docentes/actividades/notas',
          headers:{
            'Content-Type':'application/json'
          },
          data: results

        })
        .success(function(mensaje){
          console.log(mensaje);
        

        }).error(function(error){
          console.log(error);
          return  error;
        });
      }else{

        $http({
          method: 'PUT',
          url: CONFIG.http_address+'/api/docentes/actividades/notas',
          headers:{
            'Content-Type':'application/json'
          },
          data: results

        })
        .success(function(mensaje){
          console.log(mensaje);
        

        }).error(function(error){
          console.log(error);
          return  error;
        });

      }
    }
  }
  //

  function getEstudiantes(id_curso,cb){
    estudianteData.findEstudiantesByCurso(id_curso)
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
    logroData.findLogrosByCarga(id_carga)
    .success(function(logros){ 
      cb(logros);                   
      //$scope.logros = logros;
    })
    .error(function(error){
      console.log('Error: '+ error);
      cb([]);
    });

  }

  function getActividades (id_logro,cb){
    actividadData.findActividadesByLogro(id_logro)
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
    nota_actividadData.findNotasActividadByCarga(id_carga)
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
    nota_logroData.findNotasLogrosByCarga(id_carga)
    .success(function(notas){ 
      cb(notas);                   
      //$scope.logros = logros;
    })
    .error(function(error){
      console.log('Error: '+ error);
      cb({});
    });
  }

  function delNull(item){
  if(item == null){
    return "";
  }else{
    return item;
  }
}






}// body...     
})();




