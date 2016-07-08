//una function javascript q se llama asi misma
//(function (){
var app = angular.module('profesores', ['ui.bootstrap','checklist-model']);//creamos el modulo pokedex y le pasamos array con las dependencias


//creamos un controlador
//definimos el primer controlador, le pasamos el nombre
    //del controlador y le pasamos una function javascript

//Agregamos el objecto pokemon asociado al controlador
app.controller('cargaController',['$scope','$http',function($scope,$http){

  //  $scope.formData = {};
  $scope.estudiantes=[];
  $scope.date_asistencia = new Date();
  $scope.carga_seleccionada = null;
  $scope.selected = {
    ids_estudiantes:[]
  };


// Cuando se cargue la página, pide del API todos los TODOs
  $http.get('/api/docentes/cargas')
  .success(function(data) {
    //JSON.stringify(data).replace(/null/i, "\"\""); 
    $scope.cargas = data;
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });
  
  $scope.addInasistencia = function(){
    for (var i = $scope.selected.ids_estudiantes.length - 1; i >= 0; i--) {
      $http.post("/inasistencias/inasistencia",{'id_periodo': 1, 'id_estudiante':$scope.selected.ids_estudiantes[i] ,'fecha_inasistencia': $scope.date_asistencia,'id_carga': $scope.carga_seleccionada.id_carga_docente})
    .success(function(response){
      console.log($scope.carga_seleccionada.id_carga_docente)
      console.log(response);
    }).error(function(error){
        console.log('Error: ' + error);
      });


    }
    
    
  }
  $scope.selectCurso = function (carga){
    $scope.carga_seleccionada = carga;
    $scope.estudiantes = [];
    $scope.cantidad = {};
    $scope.selected.ids_estudiantes = [];
    getCursos(carga.id_curso,function(estudiantes){
      getInasistencias(carga.id_carga_docente,function(cantidad){
        $scope.cantidad = cantidad;
        console.log("antes del for");
        console.log(cantidad);
        console.log($scope.cantidad);
        $scope.estudiantes = estudiantes;

        for (var i = $scope.estudiantes.length - 1; i >= 0; i--) {
          if(typeof $scope.cantidad[$scope.estudiantes[i].id_estudiante] === 'undefined' ){
            $scope.estudiantes[i].inasistencias = 0;
          }
          else{
            console.log("entro al else");
            console.log($scope.cantidad);

            console.log($scope.estudiantes[i]);

            $scope.estudiantes[i].inasistencias = $scope.cantidad[$scope.estudiantes[i].id_estudiante];

          }
          console.log("despues del for");
          console.log($scope.estudiantes);
          } //cierra for       
        });
    });
    function getCursos(id_curso,cb){
      $http.get('/api/cursos/'+id_curso+'/estudiantes')
      .success(function(est){
        console.log("hizo la consulta y sige estudiantes");
        for (var i = est.length - 1; i >= 0; i--) {
          est[i].nombre1 = delNull(est[i].nombre1);
          est[i].nombre2 = delNull(est[i].nombre2);
          est[i].apellido1 = delNull(est[i].apellido1);
          est[i].apellido2 = delNull(est[i].apellido2);
          est[i].nombrecompleto = est[i].nombre1 + " "+ est[i].nombre2 + " " + est[i].apellido1 + " "+  est[i].apellido2;                
        }
        cb(est);
      }).error(function(error){
        cb([]);
        console.log('Error: ' + error);
      });
    }
    function getInasistencias(id_carga,cb){
      $http.get('/inasistencias/cargas/'+id_carga)
      .success(function(cantidad){
        cb(cantidad);
        console.log("hizo la consulta y sige cantidad");
         // console.log($scope.cantidad);
       })
      .error(function(error){
        cb([]);

        console.log('Error: ' + error);
      });
    }
  }
}]);

    /*
     $scope.selectCurso = function (id_curso,id_carga){
      $scope.estudiantes = [];
      $scope.cantidad = {};
      getCursos(id_curso,function(estudiantes){
        getInasistencias(id_carga,function(cantidad){
          $scope.cantidad = cantidad;
          console.log("antes del for")
          console.log(cantidad);
          console.log($scope.cantidad)
          $scope.estudiantes = estudiantes;
          
          for (var i = $scope.estudiantes.length - 1; i >= 0; i--) {
            if(typeof $scope.cantidad[$scope.estudiantes[i].id_estudiante] === 'undefined' ){
              $scope.estudiantes[i].inasistencias = 0;
            }else{
              console.log("entro al else");
              console.log($scope.cantidad);

              console.log($scope.estudiantes[i]);
              
              $scope.estudiantes[i].inasistencias = $scope.cantidad[$scope.estudiantes[i].id_estudiante];

            }
            console.log("despues del for")
            console.log($scope.estudiantes);
  

          } //cierra for       
        })
      

      })


      function getCursos(id_curso,cb){
        $http.get('/api/cursos/'+id_curso+'/estudiantes')
        .success(function(est){
          console.log("hizo la consulta y sige estudiantes")
            //$scope.estudiantes = est;
             for (var i = est.length - 1; i >= 0; i--) {
                est[i].nombre1 = delNull(est[i].nombre1);
                est[i].nombre2 = delNull(est[i].nombre2);
                est[i].apellido1 = delNull(est[i].apellido1);
                est[i].apellido2 = delNull(est[i].apellido2);
                est[i].nombrecompleto = est[i].nombre1 + " "+ est[i].nombre2 + " " + est[i].apellido1 + " "+  est[i].apellido2;                
            };

            cb(est)
            //console.log($scope.estudiantes);
        }).error(function(error){
            cb([]);
            console.log('Error: ' + error);
        });


      }
      function getInasistencias(id_carga,cb){
        $http.get('/inasistencias/cargas/'+id_carga)
        .success(function(cantidad){
          cb(cantidad);
          console.log("hizo la consulta y sige cantidad");
         // console.log($scope.cantidad);
        })
        .error(function(error){
          cb([]);
         
          console.log('Error: ' + error);
        });
      }

    }
    */






//})();
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


