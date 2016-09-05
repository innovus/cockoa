//una function javascript q se llama asi misma

    var app = angular.module('docentes', ['ngAnimate','ui.bootstrap','ngCookies','xeditable']);//creamos el modulo pokedex y le pasamos array con las dependencias


//creamos un controlador
//definimos el primer controlador, le pasamos el nombre
    //del controlador y le pasamos una function javascript

//Agregamos el objecto pokemon asociado al controlador
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
app.controller('crudLogrosController',['$scope','$http','$uibModal','$cookieStore', '$cookies',function($scope,$http,$uibModal,$cookieStore,$cookies){

  $scope.carga_seleccionada = null;
  $scope.periodos = [];
  $scope.periodo_sel = null;
  $scope.activeTabIndex = 0;
  $scope.periodo_actual = null;
  $scope.logros = [];

  $scope.estudiantes=[];
  $scope.date_asistencia = new Date();
  $scope.carga_seleccionada = null;
  $scope.selected = {
    ids_estudiantes:[]
  };

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


     //funcion q abre ventana modal
  $scope.open = function (size,id_logro) {

    $http.get('/api/docentes/logros/'+id_logro+'/actividades/')
    .success(function(data){
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/actividades.ejs',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          actividades: function () {
            return data
          }
        }
      });
    }).error(function(error){
      console.log(error);
    });
  };
   /////////////////////
  //////// fin trae cargas

  ///////form editable
  $scope.saveUser = function() {
    // $scope.user already updated!
    return $http.post('/saveUser', $scope.user).error(function(err) {
      if(err.field && err.msg) {
        // err like {field: "name", msg: "Server-side error for this username!"} 
        $scope.editableForm.$setError(err.field, err.msg);
      } else { 
        // unknown error
        $scope.editableForm.$setError('name', 'Unknown error!');
      }
    });
  };

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

    $scope.carga_seleccionada = carga;
    getLogros(carga.id_carga_docente, function(logros){
      $scope.logros = logros;
      console.log($scope.logros);

    });//CIERRA GET LOGROS

  }//CIERA FUNCION SELECIONAR CARGA

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
}]);
app.controller('ModalInstanceCtrl', function ($http,$scope,$q, $uibModalInstance, actividades) {

  $scope.actividades = actividades;


  console.log("en el modulo modal")
  console.log($scope.actividades);
 // $scope.fechas = fechas;
  /*$scope.selected = {
    fecha: $scope.fechas[0]
  };*/

  $scope.checkPorcentaje = function(data) {
  
    if (data === 'awesome') {
      return "Username should be `awesome`";
    }
  };


  $scope.saveColumn = function(column) {
    console.log(column)
    var results = [];
    var sumatoria = 0;
    angular.forEach($scope.actividades, function(actividad) {
      sumatoria = sumatoria + parseFloat(actividad[column]);
      results.push({ id_actividad: actividad.id_actividad, porcentaje_actividad: parseFloat(actividad[column])});
    })
    if(sumatoria > 100){
      return 'que';



    }else{
      console.log(results);
      $http({
        method: 'PUT',
        url: '/api/docentes/actividades/porcentajes',
        headers:{
          'Content-Type':'application/json'
        },
        data: results

      })
      .success(function(mensaje){
        console.log(mensaje);
        return $q.all(results);

      }).error(function(error){
        console.log(error);
        return  error;
      });
    }



  };

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


