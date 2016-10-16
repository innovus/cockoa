var app = angular.module('docentes');//creamos el modulo pokedex y le pasamos array con las dependencias

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
app.controller('crudLogrosController',['$scope','$http','$uibModal','$cookieStore', '$cookies','CONFIG','periodoData','actividadData','logroData','$mdBottomSheet','$mdToast','$timeout','$filter',function($scope,$http,$uibModal,$cookieStore,$cookies,CONFIG,periodoData,actividadData,logroData, $mdBottomSheet,$mdToast,$timeout,$filter){

  $scope.periodos = [];
  $scope.periodo_sel = null;
  $scope.activeTabIndex = 0;
  $scope.periodo_actual = null;
  $scope.logros = [];
  $scope.estudiantes=[];
  $scope.date_asistencia = new Date();
  $scope.carga_seleccionada = null;
  $scope.materias=[];
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
          //recorremos las cargas para organizarlas para el acordeon del sliderbar por materias
          angular.forEach(data,function(carga){
            var selected = [];
            //primero validamos si el id de la materia ya esta en materias
            filtro = $filter('filter')($scope.materias, {id_materia: carga.id_materia});

            //me hace un busqueda por id_materia

            if(filtro[0] == undefined){
              selected = $filter('filter')(data, {id_materia: carga.id_materia});
              $scope.materias.push({'id_materia':carga.id_materia, 'nombre_materia':carga.nombre_materia,'cargas':selected})
            }
          })//cierra forEach

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
  $scope.create_nuevo_logro = function () {
    console.log("entreo a create")
      $scope.inserted = {
        //id_actividad: 100,
        id_carga_docente: $scope.carga_seleccionada.id_carga_docente,
        
        porcentaje_logro: "0",
        nombre_logro: "Prueba",
        descripcion_logro: null,
        tipo:0,
        vigente_logro:"S",
      };
      $scope.logros.push($scope.inserted);
    };

/*

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

  };*/

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
  $scope.deleteLogro = function (logro,index){
    //el logro debe tener porcentaje 0 para eliminarse
    if(logro.porcentaje_logro != 0){
      swal("Oops...","Debe tener el porcentaje en 0","error");
    }else{
      logroData.deleteLogro(logro.id_logro)
      .success(function(data){
        $scope.logros.splice(index, 1);

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
      });
    }
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
  $scope.actividadesPorEliminar = [];
  console.log(actividades)
  console.log("en el modulo modal")
  console.log($scope.actividades);

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



  $scope.updateActividad = function(data, actividad) {
    console.log(data);
    console.log(actividad)
    console.log("union")
    angular.extend(actividad, data );
    console.log(actividad)
    console.log("tipo al actualizar ");
    console.log(actividad.tipo)
    if (actividad.tipo==undefined){
      actividad.tipo =1;
    }
    console.log("actividad con tipo")
    console.log(actividad)
  };

  $scope.deleteActividad = function (actividad,index){
    console.log(actividad) 
    $scope.actividadesPorEliminar.push(actividad);
    $scope.actividades.splice(index, 1); 
}


  $scope.validarPorcentaje = function(data){
    console.log(data);
   // console.log(actividad)
    console.log("union")
    //angular.extend(actividad, data );
    //console.log(actividad)
    if(isNaN(data)){
      return "Debe ingresar un numero";
      console.log("entro")
    }else if(parseFloat(data) > 100 || parseFloat(data) < 0){
      return "El Porcentaje debe estar entre 0 y 100 ";
      console.log("no entro")
    }

  }

  //esta funcion la usamos cuando le damos ok en una actividad

  $scope.guardarActividadTemporal = function(data, actividad){  
    console.log(data);
    console.log(actividad)
    console.log("union")
    angular.extend(actividad, data );
    console.log(actividad)
  }


  $scope.cancelform = function(actividad,index) {
    if(actividad.descripcion_actividad == null){
      $scope.actividades.splice(index, 1);

    }
    console.log(actividad)
    console.log(index)      
  };

  $scope.ok = function () {

    console.log("actividades por eliminar");
    console.log($scope.actividadesPorEliminar)
    console.log("actividades");
    console.log($scope.actividades)

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
      console.log(sumatoria);
    if(sumatoria != 100){
      console.log("sumatoria")
      console.log(sumatoria);

    }else{
      console.log("eliminados")
      console.log($scope.actividadesPorEliminar)
      console.log("actividaes")
      console.log($scope.actividades)
      actividadData.saveActividades($scope.actividadesPorEliminar,$scope.actividades)
      .success(function(mensaje){
        console.log(mensaje);
        swal("Ok...","Actividades Guardadas!","success");
        $uibModalInstance.close();


      }).error(function(error){

      swal("Oops..."," Algo salio mal!","error");        
        console.log(error);

      });
      
    }


  //  console.log(editableForm)
   // $uibModalInstance.close();
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
 
  var logrosAntes = []

  angular.forEach($scope.logros,function(logro){
    logro_copia = {
      id_logro:logro.id_logro,
      id_carga_docente:logro.id_carga_docente,
      descripcion_logro:logro.descripcion_logro,
      porcentaje_logro:logro.porcentaje_logro,
      vigente_logro: logro.vigente_logro
    }
    logrosAntes.push(logro_copia);
  })

  var validacion = 0; //Variables 

  $scope.ok = function () {
    sumatoria = 0;

    angular.forEach($scope.logros,function(logro){

      if(isNaN(logro.porcentaje_logro)){
        console.log("entro a isNaN")
        console.log(logro.porcentaje_logro)

        validacion = 1;
        

      }else{

         sumatoria = sumatoria + parseFloat(logro.porcentaje_logro);
       }
     })
    if(validacion == 1){

        swal("Ups....","Debes ingresar numeros","error");

        console.log("logros antes")
        console.log(logrosAntes)
        $uibModalInstance.close(logrosAntes)

    }else{
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
    } 
 
  };

  $scope.cancel = function () {
   // $uibModalInstance.dismiss('cancel');
   console.log(logrosAntes)
    $uibModalInstance.close(logrosAntes)
  }

})