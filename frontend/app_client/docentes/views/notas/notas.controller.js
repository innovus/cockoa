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

docentes_notasController.$inject= ['$scope','$http','$cookieStore','$cookies','CONFIG','periodoData','estudianteData','actividadData','logroData','nota_actividadData','nota_logroData','$filter'];
function docentes_notasController($scope,$http,$cookieStore,$cookies,CONFIG,periodoData,estudianteData,actividadData,logroData,nota_actividadData,nota_logroData,$filter) {

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

            //fpor para recorrer logros y agregarle actividades
            $scope.logros.forEach(function(logro,index){
              console.log("antes de entrar a la function este es el i " + index);
            //  (function(index){
                console.log("despues de entrar a la function este es el i " + index)

                getActividades(logro.id_logro,function(actividades){
                  console.log("hizo getActividades " + index)

                  prueba (logro,$scope.cabeceras,$scope.estudiantes,actividades,notas_actividades,function(estudiantesPrueba,cabecerasPrueba){
                    console.log("ya hizo prueba")
                    $scope.estudiantes = estudiantesPrueba;
                    $scope.cabeceras = cabecerasPrueba;

                    estudiantesPrueba.forEach(function(estudiante,h){

                    fillNotasLogros(estudiante, logro,notas_logros,function(newEstudiante){
                      $scope.estudiantes[h] = newEstudiante;

                    })


                  })
                  $scope.cabeceras.push({'id':logro.id_logro,'tipo':0,'mostrar':'Final'}); 
                  })
  
                /*   console.log("entro a getActividades este es el i " + index );
                  logro.actividades = actividades;
                 
                  console.log($scope.logros[index].id_logro);
                  //for para llenar las cabeceras segun el numero de actividades

                  actividades.forEach(function(actividad,j){
                    fillCabecerasActvidades($scope.cabeceras,actividad,estudiantes,notas_actividades,function(estudiantesNew,cabecerasNew){
                      $scope.cabeceras = cabecerasNew;
                      $scope.estudiantes= estudiantesNew;

                    });*/
                 /*  $scope.cabeceras.push({'id':actividad.id_actividad,'tipo':1,'mostrar':"A"+ (j+1) + (" ("+actividad.porcentaje_actividad+"%)")});

                 //   (function(j){
                  //for estudiantes para agregarle al estudiante  para ponerle las notas al cetor de estudiantes
                      estudiantes.forEach(function(estudiante,h){
                        fillNotasActividades(estudiante,actividad,notas_actividades,function(newEstudiante){
                          $scope.estudiantes[h] = newEstudiante;
                        })//cierra fillNotasActividades



                       // (function(h){
                          //$scope.estudiantes[h].cabeceras = []
                /*           selected = $filter('filter')(notas_actividades, {id_estudiante: estudiante.id_estudiante, id_actividad:actividad.id_actividad})
                            console.log(selected[0])
                            var nota_a = "";
                            if(selected[0] == undefined){
                              nota_a = "-"

                            }else{
                              nota_a = selected[0].nota_actividad;
                            }

                          //  estudiante.cabeceras[l].nota =selected[0].nota_actividad;

                         $scope.estudiantes[h].cabeceras.push({'id':actividad.id_actividad,'tipo':1,'mostrar':"A"+ (j+1) + (" ("+actividad.porcentaje_actividad+"%)"),'nota':nota_a})

                     //   })(h)
                      })*/
                    //})(j);

               //   });
               /*   estudiantes.forEach(function(estudiante,h){

                    console.log("entro al for de estudiantes despues de recorrer actividades");
                    fillNotasLogros(estudiante, logro,notas_logros,function(newEstudiante){
                      $scope.estudiantes[h] = newEstudiante;

                    })


                  })



                  $scope.cabeceras.push({'id':logro.id_logro,'tipo':0,'mostrar':'Final'}); 
             */ 
                });
           //   })(index);

            })
/*
            for (var i =0; i < logros.length ; i++) {
              console.log("antes de entrar a la function este es el i " + i);
              (function(i){
                console.log("despues de entrar a la function este es el i " + i)

                getActividades(logros[i].id_logro,function(actividades){
                   console.log("entro a getActividades este es el i " + i );
                  $scope.logros[i].actividades = actividades;
                 
                  console.log($scope.logros[i].id_logro);
                  //for para llenar las cabeceras segun el numero de actividades
                  for (var j =0; j < actividades.length; j++) {
                    $scope.cabeceras.push({'id':actividades[j].id_actividad,'tipo':1,'mostrar':"A"+ (j+1) + (" ("+actividades[j].porcentaje_actividad+"%)")});

                    (function(j){
                      for(var h = 0; h<estudiantes.length; h++){
                        (function(h){
                          //$scope.estudiantes[h].cabeceras = []
                           selected = $filter('filter')(notas_actividades, {id_estudiante: estudiantes[h].id_estudiante, id_actividad:actividades[j].id_actividad})
                            console.log(selected[0])
                            var nota_a = "";
                            if(selected[0] == undefined){
                              nota_a = "-"

                            }else{
                              nota_a = selected[0].nota_actividad;
                            }

                          //  estudiantes[h].cabeceras[l].nota =selected[0].nota_actividad;

                         $scope.estudiantes[h].cabeceras.push({'id':actividades[j].id_actividad,'tipo':1,'mostrar':"A"+ (j+1) + (" ("+actividades[j].porcentaje_actividad+"%)"),'nota':nota_a})

                        })(h)

                        //$scope.cabeceras[j] = {'id':actividades[j].id_actividad,'tipo':1,'mostrar':"A"+ (j+1) + (" ("+actividades[j].porcentaje_actividad+"%)")}
                        //console.log($scope.cabeceras.length)
                       // $scope.cabeceras.push({'id':actividades[j].id_actividad,'tipo':1,'mostrar':"A"+ (j+1) + (" ("+actividades[j].porcentaje_actividad+"%)")});

                        // $scope.cabeceras.push("{'id_actividad':'"+actividades[j].id_actividad+"','nombre_cabecera':'A"+(j+1)+"'}"+ ;
                      }// cierra for estudiantes
                    })(j);
                  }//finaliza for que recorre actividades
                  
                  for(var h = 0; h<estudiantes.length; h++){
                    console.log("entro al for de estudiantes despues de recorrer actividades");
                        (function(h){
                        //  $scope.estudiantes[h].cabeceras = []
                           selected = $filter('filter')(notas_logros, {id_estudiante: estudiantes[h].id_estudiante, id_logro:logros[i].id_logro})

                          //  estudiantes[h].cabeceras[l].nota =selected[0].nota_actividad;
                           var nota_a = "";
                            if(selected[0] == undefined){
                              nota_a = "-"


                            }else{
                              nota_a = selected[0].nota_logro;
                            }

                          $scope.estudiantes[h].cabeceras.push({'id':logros[i].id_logro,'tipo':0,'mostrar':'final','nota':nota_a})

                        })(h)

                        //$scope.cabeceras[j] = {'id':actividades[j].id_actividad,'tipo':1,'mostrar':"A"+ (j+1) + (" ("+actividades[j].porcentaje_actividad+"%)")}
                        //console.log($scope.cabeceras.length)

                        // $scope.cabeceras.push("{'id_actividad':'"+actividades[j].id_actividad+"','nombre_cabecera':'A"+(j+1)+"'}"+ ;
                      }// cierra for estudiantes

                  $scope.cabeceras.push({'id':logros[i].id_logro,'tipo':0,'mostrar':'Final'}); 
              
                });
              })(i);
            };*/ //finaliza For recorre logros
          });//vierra GEt logros
        });//CIERRA GETEstudiantes
        /* putCabeseras ($scope.estudiantes,$scope.cabeceras,notas_logros,notas_actividades,function(estudiantesC){
              $scope.estudiantes = estudiantesC;*/
      })//cierra gerNotasLogros
    })//cierra getNotasActividades
 // })
console.log("final seleccionar carga")
console.log($scope.estudiantes)
console.log($scope.cabeceras)
    
  }//CIERA FUNCION SELECIONAR CARGA
           /*  for(var i = 0; i < $scope.estudiantes.length; i++){
              var notas= [];
              (function(i){

                //si no encuentro al estudiante en las notas pongo de una vez -  a todas las notas
               if(typeof notas_actividades[$scope.estudiantes[i].id_estudiante] === 'undefined' ){
                  console.log("cuantas veces entra aqui")
                  console.log($scope.estudiantes[i].id_estudiante)
                  console.log(notas_actividades)


                 
                  
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
                //} // cierra if type of - si no encuentro al estudiante en las notas pongo de una vez -  a todas las notas
                console.log(notas)
                $scope.estudiantes[i].notas = notas;
              })(i);//cierra funcion()
            }//cierra for

          })//cierra gerNotasLogros
        })//cierra getNotasActividades
      });//vierra GEt logros

    });//CIERRA GETCURSOS
  }//CIERA FUNCION SELECIONAR CARGA
  */

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
    $scope.valorBefore = cabecera;
    val_before =  $scope.valorBefore.nota;
    console.log("entro a before");
    console.log(val_before);
    console.log(isNaN(val_before))
    /*
    if (!isNaN(val_before)) {
      console.log("entro a if isnan " + val_before);

      return "Debe Ingresar un numero";
    }
    if(parseFloat(val_before) < 0 && parseFloat(val_before) > 5){
      console.log("entro a parseFloat ");
      return "Debe Ingresar un numero entre 0 y 5";
    }
*/

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
/*


  $scope.after = function(valor){
    console.log('entro a after')
    console.log(valor)
    var results = {};

    //miro que tipo es si es logro(0) o actividad(1)
    if(valor.tipo == 0 ){
      var results = [{
        'id_logro':valor.id,
        'id_estudiante': valor.id_estudiante,
        'nota_logro': parseFloat(valor.mostrar) 

      }]
      console.log('entro al tipo = 0')

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
  */
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
    actividadData.findActividadesByLogros(ids_logro)
    .then(function(actividades){ 
      cb(actividades);                   
      //$scope.logros = logros;
    })
    .catch(function(error){
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




