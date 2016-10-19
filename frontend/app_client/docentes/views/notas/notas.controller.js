//una function javascript q se llama asi misma
(function (){

angular
.module('docentes')
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
})
.controller('docentes_notasController',docentes_notasController)
.controller('showLogroController',showLogroController)
.controller('showActividadController',showActividadController)
.controller('waitCtrl', waitCtrl);

/*
run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
})
.controller('docentes_notasController',docentes_notasController);
*/
 waitCtrl.$inject = ['$mdDialog', '$rootScope'];
function waitCtrl($mdDialog, $rootScope) {
  var vm = this;
  $rootScope.$on("hide_wait", function (event, args) {
    $mdDialog.cancel();
  }); 
}

showLogroController.$inject= ['$scope','$uibModalInstance','logro'];
function showLogroController($scope,$uibModalInstance,logro) {
  $scope.logro = logro
  $scope.ok = function(){
    $uibModalInstance.close();
  }
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}


showActividadController.$inject= ['$scope','$uibModalInstance','actividad'];
function showActividadController($scope,$uibModalInstance,actividad) {
  $scope.actividad = actividad
  console.log("ya en el modal")
  console.log(actividad)
  $scope.ok = function(){
    $uibModalInstance.close();
  }
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}



docentes_notasController.$inject= ['$scope','$http','$cookieStore','$cookies','CONFIG','periodoData','estudianteData','actividadData','logroData','nota_actividadData','nota_logroData','$filter','$uibModal','myutils'];
function docentes_notasController($scope,$http,$cookieStore,$cookies,CONFIG,periodoData,estudianteData,actividadData,logroData,nota_actividadData,nota_logroData,$filter,$uibModal,myutils) {

  $scope.primer_nombre = "Jorge";
  $scope.primer_apellido = "Viveros";
  $scope.numero_documento = "1085292941"

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
  $scope.valorBefore = {};
  var val_before;

  $scope.notas_logros = null;
  $scope.notas_actividades = null;
  $scope.materias = []


  //Trae el periodo Actual
  periodoData.findPeriodoActual()
  .success(function(data){
    console.log("succes periodo actual")
    $scope.periodo_actual = data[0];

    console.log(data);
        //Trae todos los periodos y pone el actual
  periodoData.findPeriodos()
  .success(function(data){
    $scope.periodos = data; 
    console.log("findPEriodos")
    console.log(data)

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
   /////////////////////
  //////// fin trae cargas
  }).error(function(error){
    console.log("error periodo actual")
    console.log(error);
  });

//funcion que se utiliza al dar click en la cabecera de un logro y muestra el logro en la ventana modal
  $scope.showLogro = function(logro){
    var modalInstance = null;
      modalInstance = $uibModal.open({
        animation: true,
        backdrop: "static",
        templateUrl: '/views/notas/logro_modal.html',
        controller: 'showLogroController',
        size: 'sm',
        resolve: {
          logro: function () {
            return logro
          }
        }
      });
  }
  calcularFinal = function(estudiante){

  }

  $scope.showActividad = function(cabecera){
    if(cabecera.tipo==1){
      actividadData.findActividadById(cabecera.id)
      .success(function(data){
        console.log(data);
        var modalInstance = null;
        modalInstance = $uibModal.open({
          animation: true,
          backdrop: "static",
          templateUrl: '/views/notas/actividad_modal.html',
          controller: 'showActividadController',
          size: 'sm',
          resolve: {
            actividad: function () {
              return data[0]
            }
          }
        });


      }).error(function(error){
        console.log(error)

      })



    }

  }
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
    $scope.data_received = false;
    myutils.showWait();
    $scope.status = true;


              
    $scope.cabeceras = [];
    $scope.carga_seleccionada = carga;
    $scope.estudiantes = [];
    $scope.cantidad = {};
    $scope.selected.ids_estudiantes = [];
    ///////////////////////////////////////////
    getNotasActividades(carga.id_carga_docente,function(notas_actividades){
      $scope.notas_actividades = notas_actividades;
      console.log("entro a notas actividades")

      getNotasLogros(carga.id_carga_docente,function(notas_logros){
        $scope.notas_logros = notas_logros;
        console.log("no entra todavia a put")
        console.log($scope.cabeceras)
        getEstudiantes(carga.id_curso,function(estudiantes){
          console.log("entro a estudiantes")
          console.log(estudiantes);
          $scope.estudiantes=estudiantes;
          for(var h = 0; h<estudiantes.length; h++){
            $scope.estudiantes[h].cabeceras = []
          }
          getLogros(carga.id_carga_docente, function(logros){
            console.log("entra y imprime los logros sin procesarlos");
            $scope.logros = logros;
            console.log($scope.logros)

            //////////

            console.log("va a entrar a logros")
            console.log(logros)
            getActividadesByLogros(logros,function(actividades){
              $scope.logros.forEach(function(logro,index){

                selected = $filter('filter')(actividades, {id_logro: logro.id_logro});
                console.log("este es el selected de "+ logro.id_logro);
                console.log(selected);
                //console.log("entroa  prueba")
                //logro.actividades = selected;

                prueba (logro,$scope.cabeceras,$scope.estudiantes,selected,notas_actividades,function(estudiantesPrueba,cabecerasPrueba){
                    console.log("ya hizo prueba")
                    $scope.estudiantes = estudiantesPrueba;
                    $scope.cabeceras = cabecerasPrueba;

                    estudiantesPrueba.forEach(function(estudiante,h){

                    fillNotasLogros(estudiante, logro,notas_logros,function(newEstudiante){
                      $scope.estudiantes[h] = newEstudiante;




                    })
                  })// cierra forEach estudianrs prueba
                  $scope.cabeceras.push({'id':logro.id_logro,'tipo':0,'mostrar':'Final'}); 
                  })//cierra prueba
              });//cierra for each logros


              //progress
              
             myutils.hideWait();

            });// cierra getActividadesByLogros
          })//Cierra getLogros
        })//Cierra getEstudiantes
      })//cierra gerNotasLogros
    })//cierra getNotasActividades
  }//CIERA FUNCION SELECIONAR CARGA


  $scope.mostrar_nota = function(id_estudiante,tipo, id){
    //si es cero es logro
    if (tipo == 0){
     return $scope.notas_logros[id_estudiante][id]
    }else{
      return $scope.notas_actividades[id_estudiante][id]
    }
  }

  $scope.before = function(cabecera){
    //$scope.valorBefore = valor1.mostrar;
    $scope.valorBefore = cabecera.nota;
    val_before =  $scope.valorBefore;
    console.log("entro a before");
    console.log(val_before);
    console.log(isNaN(val_before))
    console.log(cabecera.nota)
    /*
    if(cabecera.nota == ""){
      return "Debe Ingresar un numero"
    }

  if (isNaN(cabecera.nota)) {
      console.log("entro a if isnan " + val_before);

      return "Debe Ingresar un numero";
    }
    if(parseFloat(cabecera.nota) < 0 || parseFloat(cabecera.nota) > 5){
      console.log("entro a parseFloat ");
      return "Debe Ingresar un numero entre 0 y 5";
    }*/


  }
  $scope.after = function(cabecera,id_estudiante){
    var valorantes = $scope.valorBefore;
    console.log("valor antes")
    console.log(val_before)
    console.log("entro a after");
    console.log(cabecera)
    var results = {};
    if (isNaN(cabecera.nota)) {
      console.log("entro a if isnan " + val_before);

      return "Debe Ingresar un numero";
    }
    if(parseFloat(cabecera.nota) < 0 || parseFloat(cabecera.nota) > 5){
      console.log("entro a parseFloat ");
      return "Debe Ingresar un numero entre 0 y 5";
    }

    if(cabecera.tipo == 0 ){
      var results = [{
        'id_logro':cabecera.id,
        'id_estudiante': id_estudiante,
        'nota_logro': parseFloat(cabecera.nota) 

      }]
      console.log('entro al tipo = 0')

       //si es 0 miro si esta '-' es para insertar la nota, si no es para actualizarla
       console.log($scope.valorBefore.nota)
      if(val_before == '-'){
        console.log("es un logro y es para insertar");
        console.log("va a insertar")
        console.log(results)

        $http({
          method: 'POST',
          url: CONFIG.http_address+'/api/docentes/logros/notas',
          headers:{
            'Content-Type':'application/json'
          },
          data: results

        })
        .success(function(mensaje){
          console.log("succes")
          console.log(mensaje);
        

        }).error(function(error){
          console.log("error")
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
          data: results[0]

        })
        .success(function(mensaje){
       //   alert(mensaje.msg);
          swal("Good job!", mensaje.msg, "success")
          console.log(mensaje);
        

        }).error(function(error){
          console.log(error);
          alert("Oops... Something went wrong!");

          return  error;
        });

      }
    }else {
      var results = [{
        'id_actividad':cabecera.id,
        'id_estudiante': id_estudiante,
        'nota_actividad': parseFloat(cabecera.nota) 

      }]
      if(val_before == '-'){
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
          data: results[0]

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
  $scope.showNota =function (id_estudiante,tipo,id_nota){
   
    var selected = [];
    if(tipo == 0){
       selected = $filter('filter')($scope.notas_logros, {id_estudiante: id_estudiante,id_logro: id_nota});
     
      return selected.length ? selected[0].nota_logro: '-';

    }else{
      selected = $filter('filter')($scope.notas_actividades, {id_estudiante: id_estudiante, id_actividad:id_nota})
      return selected.length ? selected[0].nota_actividad: '-';
     
    //  return $filter('filter')($scope.notas_actividades, {id_estudiante: id_estudiante, id_actividad:id_nota})[0].nota_actividad 

    }

  }
  function putCabeseras (estudiantes,cabeceras,notas_logros,notas_actividades,cb){
    console.log("apenas entra")
    console.log(cabeceras)
    for(var h = 0; h<estudiantes.length; h++){
        (function(h){
        
          estudiantes[h].cabeceras = cabeceras;
        
          for(var l = 0; l < estudiantes[h].cabeceras.length; l++){
            (function(l){
              var selected = []
             
              if(cabeceras[l].tipo == 0){
                selected = $filter('filter')(notas_logros, {id_estudiante: estudiantes[h].id_estudiante,id_logro: estudiantes[h].cabeceras[l].id});  
                console.log("seleeeecteeeed 0")
                console.log(cabeceras)
                console.log(estudiantes[h].id_estudiante)
                console.log(selected[0])
                estudiantes[h].cabeceras[l].nota =  selected[0].nota_logro;
              }
              else{
                selected = $filter('filter')(notas_actividades, {id_estudiante: estudiantes[h].id_estudiante, id_actividad:estudiantes[h].cabeceras[l].id})
                console.log("seleeeecteeeed 1")
                console.log(selected[0])
                estudiantes[h].cabeceras[l].nota =selected[0].nota_actividad;
              }//cierra else
            })(l);
          }//cierra for  cabeceras

        })(h);

      }//cierra for estuduantes
      cb(estudiantes)
  }

  function getEstudiantes(id_curso,cb){
    estudianteData.findEstudiantesByCurso(id_curso)
    .success(function(est){
      for (var i = est.length - 1; i >= 0; i--) {
        est[i].nombre1 = delNull(est[i].nombre1);
        est[i].nombre2 = delNull(est[i].nombre2);
        est[i].apellido1 = delNull(est[i].apellido1);
        est[i].apellido2 = delNull(est[i].apellido2);
        est[i].nombrecompleto =  est[i].apellido1 + " "+  est[i].apellido2 +" "+ est[i].nombre1 + " "+ est[i].nombre2 ;                
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
    .then(function(actividades){ 
      cb(actividades);                   
      //$scope.logros = logros;
    })
    .catch(function(error){
      console.log('Error: '+ error);
      cb([]);
    });

  }

  function getActividadesByLogros (ids_logro,cb){
    console.log(JSON.stringify(ids_logro));
    actividadData.findActividadesByLogros(ids_logro)
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
  
  function fillCabecerasActvidades(cabeceras,actividad,estudiantes,notas_actividades,j,cb){
    cabeceras.push({'id':actividad.id_actividad,'tipo':1,'mostrar':"A"+ (j+1) + (" ("+actividad.porcentaje_actividad+"%)")});
    estudiantes.forEach(function(estudiante,h){
      fillNotasActividades(estudiante,actividad,notas_actividades,j,function(newEstudiante){
        estudiantes[h] = newEstudiante;
      })//cierra fillNotasActividades 
    })
    cb(estudiantes,cabeceras);
  }
  function fillCabecerasLogros(estudiantes,logro,notas_logros,cabeceras,cb){
    estudiantes.forEach(function(estudiante,h){
    //  console.log("entro al for de estudiantes despues de recorrer actividades");
      fillNotasLogros(estudiante, logro,notas_logros,function(newEstudiante){
        estudiantes[h] = newEstudiante;
      })
    })
    cabeceras.push({'id':logro.id_logro,'tipo':0,'mostrar':'Final'}); 
    cb(estudiantes,cabeceras)


  }

  function prueba2 (logro,cabeceras,estudiantes,actividades,notas_actividades,cb){
  // console.log("entro a getActividades este es el i " + index );
  console.log("entroa  prueba")
  //console.log(logro)
    logro.actividades = actividades;
  //  console.log($scope.logros[index].id_logro);
    //for para llenar las cabeceras segun el numero de actividades
    console.log(logro.id_logro)
    actividades.forEach(function(actividad,j){
      console.log("entro a actividades " + j )
      
      fillCabecerasActvidades(cabeceras,actividad,estudiantes,notas_actividades,j,function(estudiantesNew,cabecerasNew){
        console.log("ya lleno cabecera actividades")
        cabeceras = cabecerasNew;
        estudiantes= estudiantesNew;

      });

    });
    cb(estudiantes,cabeceras);
              
  }

  function prueba (logro,cabeceras,estudiantes,actividades,notas_actividades,cb){

  // console.log("entro a getActividades este es el i " + index );
  console.log("entroa  prueba")
  //console.log(logro)
    logro.actividades = actividades;
  //  console.log($scope.logros[index].id_logro);
    //for para llenar las cabeceras segun el numero de actividades
    console.log(logro.id_logro)
    actividades.forEach(function(actividad,j){
      console.log("entro a actividades " + j )
      
      fillCabecerasActvidades(cabeceras,actividad,estudiantes,notas_actividades,j,function(estudiantesNew,cabecerasNew){
        console.log("ya lleno cabecera actividades")
        cabeceras = cabecerasNew;
        estudiantes= estudiantesNew;

      });

    });
    cb(estudiantes,cabeceras);
              
  }
  function fillNotasActividades(estudiante,actividad,notas_actividades,j,cb){
    selected = $filter('filter')(notas_actividades, {id_estudiante: estudiante.id_estudiante, id_actividad:actividad.id_actividad})
  //  console.log(selected[0])
    var nota_a = "";
    if(selected[0] == undefined){
      nota_a = "-"

    }else{
      nota_a = selected[0].nota_actividad;
    }
    estudiante.cabeceras.push({'id':actividad.id_actividad,'tipo':1,'mostrar':"A"+ (j+1) + (" ("+actividad.porcentaje_actividad+"%)"),'nota':nota_a})
    cb(estudiante)
  }
  function fillNotasLogros(estudiante, logro,notas_logros,cb){
    // console.log("entro al for de estudiantes despues de recorrer actividades");

  //  $scope.estudiantes[h].cabeceras = []
      selected = $filter('filter')(notas_logros, {id_estudiante: estudiante.id_estudiante, id_logro:logro.id_logro})

    //  estudiantes[h].cabeceras[l].nota =selected[0].nota_actividad;
      var nota_a = "";
      if(selected[0] == undefined){
        nota_a = "-"
      }else{
        nota_a = selected[0].nota_logro;
      }
      estudiante.cabeceras.push({'id':logro.id_logro,'tipo':0,'mostrar':'final','nota':nota_a});
      cb(estudiante);
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

var incrementarSecuencia= function(nombre){

  var deferred= Q.defer();
  return sequelize.transaction({autocommit:false}).then(function(t){
    
    Models.Secuencia.find({
          where:{
              nombre_secuencia:nombre
          }
      },
      {transaction:t})
    .then(function(secuencia){
        secuencia.updateAttributes({
          consecutivo:secuencia.consecutivo+1
        },{transaction:t})
        .then(function(nuevasecuencia){
          deferred.resolve({transaccion:t,secuencia:nuevasecuencia});
        }).catch(function(error){
          t.rollback();
          deferred.reject("error");
        });
      }).catch(function(error){
        t.rollback();
        deferred.reject("error");
      });
      return deferred.promise;
  });
};

//---------------------------------------------------
/*
var crearCompraTransaccion= function (compraVariable, detallesCompra, idUsuario, callback){
        sequelize.transaction({autocommit:false})
        .then(function(t){
              models.Compra.create({
                  fecha_compra:compraVariable.fecha_compra,
                  observacion:compraVariable.observacion,
                  id_usuario:idUsuario
              }, {transaction: t})
              .then(function (compra){//si sale bn el create entoncess ... usaremos el compra para agregarle a los detalles de compra
                  var detalles= detallesCompra;
                  detalles.forEach(function(detalle){
                      detalle.id_compra=compra.id_compra;
                  });
                  models.DetalleCompra.bulkCreate(detalles, {returning:true,transaction: t})//insertamos los detallescomra
                  .then(function(detalles){//si sale bn entonces hacemos esto con detalles
                        var registroDetalle={};
                        var registrosDetalle=[];
                        console.log(detalles);
                        detalles.forEach(function(itemDetalle){
                          registroDetalle={};
                          registroDetalle.id_detalle_compra=itemDetalle.id_detalle_compra;
                          registroDetalle.observacion="nueva observacion"+itemDetalle.id_detalle_compra;
                          registrosDetalle.push(registroDetalle);
                        });
                        models.RegistroCompra.bulkCreate(registrosDetalle,{returning:true,transaction:t})
                        .then(function(registrodetalles){

                          t.commit();//si salen bn todas hago el commit 
                          callback(registrodetalles,null);
                        }).
                        catch(function(error){
                          t.rollback();//si sale error hago el roolback
                          callback(null,error);     
                        });
                  }).catch(function(error){
                        t.rollback();
                        callback(null,error);
                  });

              }).catch(function(error){//si sale mal crear compra valla aqui y hagame el rollback
                  t.rollback();
                  callback(null,error);
              });
        });//finaliza transsaccion
}

{
  "delete":[{"id_actividad":125},{id_actividad:123}],
  "update":[{"id_logro":50042,"id_actividad":125,"descripcion_actividad":"prueba postman 12","porcentaje_actividad":17},{"id_logro":50042,"id_actividad":126,"descripcion_actividad":"prueba postman 22","porcentaje_actividad":18}],
  "create":[{"id_logro":50042,"id_actividad":125,"descripcion_actividad":"prueba postman 12","porcentaje_actividad":17},{"id_logro":50042,"id_actividad":126,"descripcion_actividad":"prueba postman 22","porcentaje_actividad":18}]
}

[{"id_logro":50042,"id_actividad":125,"descripcion_actividad":"prueba postman 12","porcentaje_actividad":17},{"id_logro":50042,"id_actividad":126,"descripcion_actividad":"prueba postman 22","porcentaje_actividad":18}]

*/
