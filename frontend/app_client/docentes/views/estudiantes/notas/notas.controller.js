//una function javascript q se llama asi misma
(function (){
var app = angular.module('docentes');//creamos el modulo pokedex y le pasamos array con las dependencias


app.controller('estudiantes_notasController',['$scope','$http','$filter','$cookieStore', '$cookies','periodoData','materiaData','logroData','actividadData','nota_actividadData','nota_logroData',function($scope,$http,$filter,$cookieStore,$cookies,periodoData,materiaData,logroData,actividadData,nota_actividadData,nota_logroData){
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

  materiaData.findMateriasByEstudiante()
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
   function getActividadesByLogros (ids_logro,cb){
    console.log(JSON.stringify(ids_logro));
    actividadData.findActividadesByLogros(ids_logro)
    .success(function(actividades){ 
      console.log("actividaes byr logros")
      console.log(actividades)
      cb(actividades);                   
      //$scope.logros = logros;
    })
    .error(function(error){
      console.log('Error: '+ error);
      cb([]);
    });

  }
  function getNotasActividades(cb){
    nota_actividadData.findNotasActividadByEstudianteAndLogro()
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
        console.log($scope.notas);
        getActividadesByLogros(logros,function(actividades){
           getNotasActividades(function(notasactividades){
          $scope.notasactividades = notasactividades;
          $scope.logros.forEach(function(logro,index){
            console.log("recorrer logros")
             selected = $filter('filter')(actividades, {id_logro: logro.id_logro});
             $scope.logros[index].actividades = selected;

             $scope.logros[index].actividades.forEach(function(actividad,j){
              console.log("recorrer atividades")
              console.log($scope.notasactividades)
              console.log(actividad)

              selectedna = $filter('filter')($scope.notasactividades, {id_actividad: actividad.id_actividad});
              console.log(selectedna)
              if(typeof selectedna === 'undefined' || selectedna.length == 0){
                $scope.logros[index].actividades[j].nota = '-'

              }else{
                console.log(selectedna)
                 $scope.logros[index].actividades[j].nota = selectedna[0].nota_actividad


              }
  

             });//cierra foreach actividades


              if(typeof $scope.notas[$scope.logros[index].id_logro] === 'undefined'  ){
                $scope.logros[index].nota = ' - ';
              }
              else{
                $scope.logros[index].nota = $scope.notas[$scope.logros[index].id_logro];
              }
        

           })//cierra foreach logros


         });//cierrra getnotasActividades


        });//cierra getActividadesByLogros



      /* for (var i = 0; i < $scope.logros.length ; i++) {
          (function(i){

           // getNotasActividades($scope.logros[i].id_logro,function(notasactividades){
              console.log('notasactividades')
              console.log(notasactividades)

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

          //  });//cierrra getnotasActividades


          if(typeof $scope.notas[$scope.logros[i].id_logro] === 'undefined' ){
            $scope.logros[i].nota = ' - ';
          }
          else{
            $scope.logros[i].nota = $scope.notas[$scope.logros[i].id_logro];
          }
          })(i);
          
          
        } //cierra for*/
        console.log("cierra for y scope logros")
        console.log($scope.logros)

      });//cierra getNotas
    });//Cierra getLogros
  }//cierra getNotasYLogros

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


