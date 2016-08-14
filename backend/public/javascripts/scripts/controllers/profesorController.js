//una function javascript q se llama asi misma
//(function (){
var app = angular.module('profesores', ['ngAnimate','ui.bootstrap','checklist-model']);//creamos el modulo pokedex y le pasamos array con las dependencias



app.controller('cargaController',['$scope','$http','$uibModal','$log',function($scope,$http,$uibModal,$log){

  $scope.fechas = [];
  $scope.estudiantes=[];
  $scope.date_asistencia = new Date();
  $scope.carga_seleccionada = null;
  $scope.selected = {
    ids_estudiantes:[]
  };


  $scope.materia_seleccionada = null;
  $scope.periodos = [];
  $scope.periodo_sel = null;
  $scope.activeTabIndex = 0;
  $scope.periodo_actual = null;

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
            console.log("if ycarga seleccionada");
            console.log($scope.carga_seleccionada)
            encontrado = true;
            
          }
        })(i);  
      }
      if(encontrado == false){
        $scope.carga_seleccionada = null;
        console.log($scope.carga_seleccionada )
      }
      console.log("sale de for");
      console.log($scope.carga_seleccionada);

      seleccionarCarga($scope.carga_seleccionada);
            

    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  //funcion q abre ventana modal
  $scope.open = function (size,id_carga,id_estudiante) {

    $http.get('/inasistencias/cargas/'+id_carga+'/estudiantes/'+id_estudiante)
    .success(function(data){
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/asistencia.ejs',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          fechas: function () {
            return data
          }
        }
      });
    }).error(function(error){
      console.log(error);
    });
  };
  $scope.selectCurso = function (carga){
    seleccionarCarga(carga);
  }

  function seleccionarCarga(carga){
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
          }//CIERRA IF
        else{
            $scope.estudiantes[i].inasistencias = $scope.cantidad[$scope.estudiantes[i].id_estudiante];
          } //CIERRA ELSE

        } //cierra for       
      });//CIERRA GERINASISTENCIAS
    });//CIERRA GETCURSOS
  }//CIERA FUNCION SELECIONAR CARGA
  $scope.addInasistencia = function(){
    for (var i = $scope.selected.ids_estudiantes.length - 1; i >= 0; i--) {
      $http.post("/inasistencias/inasistencia",{'id_periodo': 1, 'id_estudiante':$scope.selected.ids_estudiantes[i] ,'fecha_inasistencia': $scope.date_asistencia,'id_carga': $scope.carga_seleccionada.id_carga_docente})
      .success(function(response){
        console.log($scope.carga_seleccionada.id_carga_docente)
        console.log(response);
      }).error(function(error){
        console.log('Error: ' + error);
      });
    }//cierra for
  }

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
      }//cierra dor
      cb(est);
    }).error(function(error){
      cb([]);
      console.log('Error: ' + error);
    });//cierra get
  }//cierra funcion
  function getInasistencias(id_carga,cb){
    $http.get('/inasistencias/cargas/'+id_carga)
    .success(function(cantidad){
      cb(cantidad);
    })
    .error(function(error){
      cb([]);
      console.log('Error: ' + error);
    });
  }
}]);

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

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, fechas) {

  $scope.fechas = fechas;


  console.log("en el modulo modal")
  console.log($scope.fechas);
 // $scope.fechas = fechas;
  /*$scope.selected = {
    fecha: $scope.fechas[0]
  };*/

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


