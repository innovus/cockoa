var app = angular.module('docentes');//creamos el modulo pokedex y le pasamos array con las dependencias

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
app.controller('crudLogrosController',['$scope','$http','$uibModal','$cookieStore', '$cookies','CONFIG','periodoData','actividadData','logroData','$mdBottomSheet','$mdToast','$timeout',function($scope,$http,$uibModal,$cookieStore,$cookies,CONFIG,periodoData,actividadData,logroData, $mdBottomSheet,$mdToast,$timeout){

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
  //periodoData.findPeriodoActual()
   //$http.get(CONFIG.http_address+'/api/todos/periodos/actual')
   periodoData.findPeriodoActual()
  .success(function(data){
    console.log("entro al succes del controller")
    $scope.periodo_actual = data[0];

    console.log(data);
  }).error(function(error){
    console.log("entro al error del controller")
    console.log(error);
  });

  //Trae todos los periodos y pone el actual
  //$http.get(CONFIG.http_address+'/api/todos/periodos')

  periodoData.findPeriodos()
  .success(function(data){
    $scope.periodos = data; 
    console.log("succes findPeriodos")
    console.log($scope.periodos)

    //recorre el vector de todos los periodos 
    for (var i = 0; i < data.length ; i++) {

      //entra cuando el periodo actual es encontrado en el vector
     // console.log(data[i].id_periodo)
      console.log($scope.periodo_actual)

      if(data[i].id_periodo == $scope.periodo_actual.id_periodo){

        //selecciona el periodo actual en las tabs
        $scope.activeTabIndex = i;
        //
        $scope.periodo_sel = $scope.periodos[i];

         // Trae todas las cargas de un periodo seleccionado
        //$http.get(CONFIG.http_address+'/api/docentes/cargas/periodos/'+ $scope.periodo_sel.id_periodo)
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


     //funcion q abre ventana modal
  $scope.open = function (size,id_logro) {

    //$http.get(CONFIG.http_address+'/api/docentes/logros/'+id_logro+'/actividades/')
    var modalInstance = null;
     actividadData.findActividadesByLogro(id_logro)
    .success(function(data){
      modalInstance = $uibModal.open({
        animation: true,
        backdrop: "static",
        templateUrl: '/views/logros/actividades.html',
        controller: 'actividadesModalController',
        size: size,
        resolve: {
          actividades: function () {
            return data
          },
          id_logro: function(){
            return id_logro
          }
        }
      });
      console.log(modalInstance)
    }).error(function(error){
      console.log(error);
    });
    console.log(modalInstance)
  };
    $scope.open_nuevo_logro = function (size,id_carga_docente) {


      var modalInstance = $uibModal.open({
        animation: true,
        backdrop: "static",
        templateUrl: '/views/logros/nuevo_logro.html',
        controller: 'nuevo_logroCtrl',
        size: size,
        resolve: {
          id_carga_docente: function(){
            return id_carga_docente
          }
        }
      });
      modalInstance.result.then(function (nuevo_logro) {
        $scope.logros.push(nuevo_logro);
      //$ctrl.selected = selectedItem;
    });

  };
      $scope.open_update_logros = function (size) {


      var modalInstance = $uibModal.open({
        animation: true,
        backdrop: "static",
        templateUrl: '/views/logros/actualizar_porcentaje.html',
        controller: 'updatePorcentajesCtrl',
        size: size,
        resolve: {
          logros: function(){
            return $scope.logros
          }
        }
      });
      modalInstance.result.then(function (logros) {
        $scope.logros = logros;
      //$ctrl.selected = selectedItem;
    });

  };
   /////////////////////
  //////// fin trae cargas

  ///////form editable
  $scope.saveLogro = function(logro) {
    console.log(logro)
    logroData.updateDescripcionLogro(logro)
    .success(function(mensaje){
    swal("Good job!", mensaje.msg, "success")
                 
      //$scope.logros = logros;
    })
    .error(function(error){
      console.log('Error: '+ error);
      swal("Oops..."," Algo salio mal!","error");
    });

    // $scope.user already updated!

  };

  ////////

      //funcion que se la usa cuando le da click en un tab
  $scope.getPeriodoId = function(index){
    $scope.periodo_sel = $scope.periodos[index];
    //$http.get(CONFIG.http_address+'/api/docentes/cargas/periodos/'+ $scope.periodo_sel.id_periodo)
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

    $scope.carga_seleccionada = carga;
    getLogros(carga.id_carga_docente, function(logros){
      $scope.logros = logros;
      console.log($scope.logros);

    });//CIERRA GET LOGROS

  }//CIERA FUNCION SELECIONAR CARGA

  function getLogros (id_carga,cb){
   // $http.get(CONFIG.http_address+'/api/docentes/cargas/'+id_carga+'/logros')

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
  $scope.deleteLogro = function (id_logro){
  logroData.deleteLogro(id_logro)
  .success(function(data){
    swal("Ok","se elimino con exito","success");
    console.log("elimino con exito")

  }).error(function(error){
    if(error.msg.name == "SequelizeForeignKeyConstraintError" && error.msg.parent.table =="nota_logro"){
        swal("Oops...","Debe eliminar primero las notas de los estudiantes","error");
    }else  if(error.msg.name == "SequelizeForeignKeyConstraintError" && error.msg.parent.table =="actividad"){
      swal("Oops...","Debe eliminar primero las actividades","error");
    }else{
      swal("Oops...","Algo aslio mal","error");
    }
  })
}






}]);


/*
app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});*/
app.controller('actividadesModalController', function ($http,$scope,$q, $uibModalInstance, actividades,id_logro,actividadData) {

  $scope.actividades = actividades;
  $scope.id_logro = id_logro;
  console.log(actividades)


  console.log("en el modulo modal")
  console.log($scope.actividades);
 // $scope.fechas = fechas;
  /*$scope.selected = {
    fecha: $scope.fechas[0]
  };*/


  $scope.checkPorcentaje = function(){
    
    var sumatoria = 0;
    angular.forEach($scope.actividades,function(actividad){
      if(isNaN(actividad.porcentaje_actividad)){
        console.log("entro a isNaN")
        console.log(actividad.porcentaje_actividad)
        return "deben ser numeros"

      }else{

         sumatoria = sumatoria + parseFloat(actividad.porcentaje_actividad);
      }
     
    })
    console.log("sumatoria")
    console.log(sumatoria)
    console.log("antes de if");
    if(sumatoria == 100){
      console.log("entro al else")
      console.log(sumatoria)
      actividadData.updatePorcentajes($scope.actividades)
      .success(function(mensaje){
        console.log(mensaje);
        //return $q.all(results);

      }).error(function(error){
        if(error.status == 2){
        //  swal("Oops...",error.msg,"error");
          return error["mal"]
        }else{
        //  swal("Oops..."," Algo salio mal!","error");

        }
        
        console.log(error);
        return  error;
      });


      
    }else{
      console.log("entro a error");
      swal("Oops...","Debe sumar 100 el porcentaje","error");
      return "error"
      
 

    }

  }


  $scope.saveColumn = function(column) {
    console.log(column)
    var results = [];
    var sumatoria = 0;
    angular.forEach($scope.actividades, function(actividad) {
      sumatoria = sumatoria + parseFloat(actividad[column]);
      console.log("sumatoria");
      console.log(sumatoria)
      results.push({ id_actividad: actividad.id_actividad, porcentaje_actividad: parseFloat(actividad[column])});
    })
    console.log(sumatoria)

      console.log(results);
      actividadData.updatePorcentajes(results)
      .success(function(mensaje){
        console.log(mensaje);
        return $q.all(results);

      }).error(function(error){
        if(error.status == 2){
          swal("Oops...",error.msg,"error");
          return error["mal"]
        }else{
          swal("Oops..."," Algo salio mal!","error");

        }
        
        console.log(error);
        return  error;
      });

  };
    // add user
    //tipo: 0 es para saber que es un dato para insertar
    
  $scope.addActividad = function() {
    $scope.inserted = {
      //id_actividad: 100,
      id_logro: $scope.id_logro,
      porcentaje_actividad: "0",
      nombre_actividad: "Prueba",
      descripcion_actividad: null,
      tipo:0
    };
    $scope.actividades.push($scope.inserted);
  };
  $scope.saveActividad = function(data, actividad){
    console.log(data);
    console.log(actividad)
    console.log("union")
    angular.extend(actividad, data );
    console.log(actividad)
    
    if(actividad.tipo == 0){
      actividadData.createActividad(actividad)
      .success(function(mensaje){
        console.log(mensaje);
        angular.extend(actividad,mensaje.id_actividad)
        console.log($scope.actividades);
       

      }).error(function(error){
        if(error.status == 2){
          swal("Oops...",error.msg,"error");
          return error["mal"]
        }else{
          swal("Oops..."," Algo salio mal!","error");

        }
        
        console.log(error);
        return  error;
      });

    }else{
      actividadData.updateDescripcion(actividad)
      .success(function(mensaje){
        console.log(mensaje);
        return $q.all(actividad);

      }).error(function(error){
        if(error.status == 2){
          swal("Oops...",error.msg,"error");
          return error["mal"]
        }else{
          swal("Oops..."," Algo salio mal!","error");

        }
        
        console.log(error);
        return  error;
      });

    }
  
  }

    $scope.cancelform = function(actividad,index) {
      if(actividad.descripcion_actividad == null){
        $scope.actividades.splice(index, 1);

      }
      console.log(actividad)
      console.log(index)      
  };

  $scope.ok = function () {
    console.log(editableForm)
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


});

app.controller('nuevo_logroCtrl', function($scope,$uibModalInstance,logroData,id_carga_docente) {

   $scope.ok = function (descripcion) {
    console.log(id_carga_docente)
    console.log(descripcion)
    logro = {id_carga_docente:id_carga_docente,descripcion_logro:descripcion, porcentaje_logro:0}

     logroData.createLogro(logro)
      .success(function(mensaje){
        console.log(mensaje);
         swal("Ok",mensaje.msg,"success");
          angular.extend(logro,mensaje.id_logro)
          console.log(logro)
         $uibModalInstance.close(logro);
        

      }).error(function(error){
        if(error.status == 2){
          swal("Oops...",error.msg,"error");
          $uibModalInstance.dismiss('cancel');
          
        }else{
          swal("Oops..."," Algo salio mal!","error");
          $uibModalInstance.dismiss('cancel');

        }
        
        console.log(error);
        
      });

 
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


})
app.controller('updatePorcentajesCtrl', function($scope, $uibModalInstance,logroData,logros) {
  $scope.logros = logros
  //variable para guardar los logros como llegan y en caso de darle cancelar sera usada para devolver los logros como llegaron al principio
  $scope.logrosAntes = $scope.logros;


  $scope.ok = function () {
    sumatoria = 0;


    angular.forEach($scope.logros,function(logro){

      if(isNaN(logro.porcentaje_logro)){
        console.log("entro a isNaN")
        console.log(logro.porcentaje_logro)
        swal("Ups....","Debes ingresar numeros","error");

        console.log($scope.logrosAntes)
        $uibModalInstance.close($scope.logrosAntes)
        return;

      }else{

         sumatoria = sumatoria + parseFloat(logro.porcentaje_logro);
       }
     })

      console.log("sumatoria")
      console.log(sumatoria)
      console.log("antes de if");
      if(sumatoria == 100){
        console.log("entro al if == 100")
        console.log(sumatoria)
        logroData.updatePorcentajesLogros($scope.logros)
        .success(function(mensaje){
          console.log(mensaje);
          swal("Ok",mensaje.msg,"success");
         
         $uibModalInstance.close($scope.logros)
        //return $q.all(results);

        }).error(function(error){
          if(error.status == 2){
          //  swal("Oops...",error.msg,"error");
            return error["mal"]
          }else{
            //  swal("Oops..."," Algo salio mal!","error");

          }
          console.log(error);
          return  error;
        });      
      }else{
        console.log("entro a error");
        swal("Oops...","Debe sumar 100 el porcentaje","error");
        
      }
     
    

    /*console.log(id_carga_docente)
    console.log(descripcion)
    logro = {id_carga_docente:id_carga_docente,descripcion_logro:descripcion, porcentaje_logro:0}

     logroData.createLogro(logro)
      .success(function(mensaje){
        console.log(mensaje);
         swal("Ok",mensaje.msg,"success");
          angular.extend(logro,mensaje.id_logro)
          console.log(logro)
         $uibModalInstance.close(logro);
        

      }).error(function(error){
        if(error.status == 2){
          swal("Oops...",error.msg,"error");
          $uibModalInstance.dismiss('cancel');
          
        }else{
          swal("Oops..."," Algo salio mal!","error");
          $uibModalInstance.dismiss('cancel');

        }
        
        console.log(error);
        
      });*/
      console.log($scope.logros)

 
  };

  $scope.cancel = function () {
   // $uibModalInstance.dismiss('cancel');
   console.log($scope.logrosAntes)
    $uibModalInstance.close($scope.logrosAntes)
  }


})


