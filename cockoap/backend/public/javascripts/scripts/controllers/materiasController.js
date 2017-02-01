//una function javascript q se llama asi misma
(function (){
var app = angular.module('estudiantes', ['ui.bootstrap','ngCookies']);//creamos el modulo pokedex y le pasamos array con las dependencias


app.controller('materiasController',['$scope','$http','$cookieStore', '$cookies',function($scope,$http,$cookieStore,$cookies){
  $scope.materia_seleccionada = null;
  $scope.periodos = [];
  $scope.periodo_actual = null
  $scope.periodo_sel = null;
  $scope.activeTabIndex = 0;

  //Trae el periodo Actual
  $http.get('/api/todos/periodos/actual')
  .success(function(data){
    $scope.periodo_actual = data;

    console.log(data);
  }).error(function(error){
    console.log(error);
  });



  $http.get('/api/todos/periodos')
  .success(function(data){
    $scope.periodos = data;  
    for (var i = 0; i < data.length ; i++) {
      (function(i){
        if(data[i].id_periodo == $scope.periodo_actual.id_periodo){
          $scope.activeTabIndex = i;
          $scope.periodo_sel = $scope.periodos[i];
        }
      })(i);    

    }

    console.log(data);
  }).error(function(error){
    console.log(error);
    $scope.periodos = [];
  });
  $scope.getPeriodoId = function(index){
    $scope.periodo_sel = $scope.periodos[index];
    getNotasYLogros($scope.materia_seleccionada,$scope.periodo_sel);
    console.log("selecciono periodo" + $scope.periodo_sel);
  };

  $scope.getMateriasYLogros = function(materia){
    $scope.materia_seleccionada = materia;
    getNotasYLogros($scope.materia_seleccionada,$scope.periodo_sel);
  };

  function getLogros (id_materia,id_periodo,cb){
    $http.get('/estudiantes/materias/'+id_materia +'/logros/periodos/'+id_periodo)
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
    $http.get('/estudiantes/logros/'+id_logro +'/actividades')
    .success(function(actividades){ 
      cb(actividades);                   
      //$scope.logros = logros;
    })
    .error(function(error){
      console.log('Error: '+ error);
      cb([]);
    });

  }
  function getNotasActividades(id_logro,cb){
    $http.get('/estudiantes/logros/'+id_logro +'/actividades/notas')
    .success(function(notas){ 
      cb(notas);                   
      //$scope.logros = logros;
    })
    .error(function(error){
      console.log('Error: '+ error);
      cb({});
    });
  }


    // Cuando se cargue la página, pide del API todos los TODOs
  $http.get('/estudiantes/materias')
  .success(function(data) {
    $scope.materias = data;
            //console.log(data)
            //console.log($cookies.accessToken);
            
    for (var i = $scope.materias.length - 1; i >= 0; i--) {
        $scope.materias[i].nombre1 = delNull($scope.materias[i].nombre1);
        $scope.materias[i].nombre2 = delNull($scope.materias[i].nombre2);
        $scope.materias[i].apellido1 = delNull($scope.materias[i].apellido1);
        $scope.materias[i].apellido2 = delNull($scope.materias[i].apellido2);
        $scope.materias[i].nombrecompleto = $scope.materias[i].nombre1 + " "+ $scope.materias[i].nombre2 + " " + $scope.materias[i].apellido1 + " "+  $scope.materias[i].apellido2; 
               // console.log($scope.materias[i]);
               /*(function(i){
                $http.get('/estudiantes/materias/'+$scope.materias[i].id_materia +'/logros')
                  .success(function(logros){
                    
                    $scope.materias[i].logros = logros;

                   // $scope.logros = logros;
                   // console.log($scope.logros);
                    
                   // $scope.materias[i].logros = logros; 
                    

                  }).error(function(error){console.log('Error: '+ error)})

               })(i);*/
               
    }
    console.log($scope.materias);
  }).error(function(data) {
    console.log('Error: ' + data);
  });
  function getNotasYLogros(materia,periodo){
    $scope.materia_seleccionada = materia;
    $scope.logros = [];
    $scope.notas = {};
    $scope.notasactividades = {};

    getLogros(materia.id_materia,periodo.id_periodo,function(logros){
      getNotas(materia.id_materia,periodo.id_periodo,function(notas){
        $scope.notas = notas;
        $scope.logros = logros;


  for (var i = $scope.logros.length - 1; i >= 0; i--) {
    (function(i){
          console.log("aqui")
          console.log($scope.logros[i].id_logro);

          getActividades($scope.logros[i].id_logro,function(actividades){
            console.log("entro a getActividades");
            console.log("este es el = "+i)
            getNotasActividades($scope.logros[i].id_logro,function(notasactividades){
              $scope.logros[i].actividades = actividades;
              $scope.notasactividades = notasactividades;
              console.log("logros con actividades");
              console.log($scope.logros);

              for (var j = $scope.logros[i].actividades.length - 1; j >= 0; j--) {
                (function(j){
                  if(typeof $scope.notasactividades[$scope.logros[i].actividades[j].id_actividad] === 'undefined' ){
                    $scope.logros[i].actividades[j].nota = ' - ';
                  }
                  else{
                    $scope.logros[i].actividades[j].nota = $scope.notasactividades[$scope.logros[i].actividades[j].id_actividad];
                  }
                })(j);
              }//cierra for j







            });//cierrra getnotasActividades

            
            

          });//cierra getActividades
          console.log("ciclo" + i);

          console.log($scope.logros[i].id_logro);
          console.log($scope.notas[$scope.logros[i].id_logro]);
          if(typeof $scope.notas[$scope.logros[i].id_logro] === 'undefined' ){
            $scope.logros[i].nota = ' - ';
          }
          else{
            $scope.logros[i].nota = $scope.notas[$scope.logros[i].id_logro];
          }
          })(i);
        } //cierra for



        
      });//cierra getNotas
    });//Cierra getLogros
  }//cierra getNotasYLogros



        /*$scope.getNotasYLogros = function(materia,periodo){
          $scope.materia_seleccionada = materia;
          $scope.logros = [];
          $scope.notas = {}
          getLogros(materia.id_materia,periodo.id_periodo,function(logros){
            getNotas(materia.id_materia,periodo.id_periodo,function(notas){
              $scope.notas = notas;
              $scope.logros = logros;

              for (var i = $scope.logros.length - 1; i >= 0; i--) {
                console.log("ciclo" + i);
                console.log($scope.logros[i].id_logro);
                console.log($scope.notas[$scope.logros[i].id_logro])
                if(typeof $scope.notas[$scope.logros[i].id_logro] === 'undefined' ){
                  $scope.logros[i].nota = ' - ';
                }
                else{
     

                  $scope.logros[i].nota = $scope.notas[$scope.logros[i].id_logro];

                }
                //console.log("despues del for");
            
                } //cierra for
            })
          })
        }*/
}]);
      
})();
function delNull(item){
  if(item == null){
    return "";
  }else{
    return item;
  }
}

function setCookieData(cookies, accesstoken){
  var accessToken = accesstoken;
  cookies.put("accessToken", accesstoken);
}
function getCookieData(cookies){
  var accessToken = cookies.get("accessToken");
  return accessToken;
}
function clearCookieData(cookies){
  var accessToken = "";
  cookies.remove("accessToken");
}

