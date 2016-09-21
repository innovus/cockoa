//una function javascript q se llama asi misma
(function (){
var app = angular.module('docentes');//creamos el modulo pokedex y le pasamos array con las dependencias


app.controller('estudiantes_notasController',['$scope','$http','$cookieStore', '$cookies','periodoData','materiaData','logroData','actividadData','nota_actividadData','nota_logroData',function($scope,$http,$cookieStore,$cookies,periodoData,materiaData,logroData,actividadData,nota_actividadData,nota_logroData){
  $scope.materia_seleccionada = null;
  $scope.periodos = [];
  $scope.periodo_actual = null
  $scope.periodo_sel = null;
  $scope.activeTabIndex = 0;

  //Trae el periodo Actual
  periodoData.findPeriodoActual()
  .success(function(data){
    $scope.periodo_actual = data[0];

  }).error(function(error){
    console.log(error);
  });



  periodoData.findPeriodos()
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

     // Cuando se cargue la página, pide del API todos los TODOs

 // $http.get('/estudiantes/materias')
  materiaData.findMateriasWithInasistenciaByEstudiante()
  .success(function(data) {
    $scope.materias = data;
    console.log($scope.materias);
  }).error(function(data) {
    console.log('Error: ' + data);
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
    logroData.findLogrosByMateriaAndPeriodo(id_materia,id_periodo)
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

    nota_logroData.findNotasLogrosByMateriaAndPeriodo(id_materia,id_periodo)
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
  function getNotasActividades(id_logro,cb){
    nota_actividadData.findNotasActividadByEstudianteAndLogro(id_logro)
    .success(function(notas){ 
      cb(notas);                   
      //$scope.logros = logros;
    })
    .error(function(error){
      console.log('Error: '+ error);
      cb({});
    });
  }


 
  function getNotasYLogros(materia,periodo){
    $scope.materia_seleccionada = materia;
    $scope.logros = [];
    $scope.notas = {};
    $scope.notasactividades = {};

    getLogros(materia.id_materia,periodo.id_periodo,function(logros){
      getNotas(materia.id_materia,periodo.id_periodo,function(notas){
        $scope.notas = notas;
        $scope.logros = logros;
        console.log('notas')
        console.log($scope.notas)



  for (var i = 0; i < $scope.logros.length ; i++) {
     (function(i){
        
        getActividades($scope.logros[i].id_logro,function(actividades){
            getNotasActividades($scope.logros[i].id_logro,function(notasactividades){
              console.log('notasactividades')
              console.log(notasactividades)
              $scope.logros[i].actividades = actividades;
              $scope.notasactividades = notasactividades;
            
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

          if(typeof $scope.notas[$scope.logros[i].id_logro] === 'undefined' ){
            $scope.logros[i].nota = ' - ';
          }
          else{
            $scope.logros[i].nota = $scope.notas[$scope.logros[i].id_logro];
          }
          })(i);
          
          
        } //cierra for
        console.log("cierra for y scope logros")
        console.log($scope.logros)



        
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

