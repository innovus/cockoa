var app = angular.module('docentes'); //creamos el modulo pokedex y le pasamos array con las dependencias
app.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

    /** 
     * @ngdoc controller
     * @name docentes.controller:crudLogrosController
     * @requires $scope, $http, $uibModal, $cookieStore, $cookies, CONFIG, periodoData, actividadData, logroData, $mdBottomSheet, $mdToast, $timeout, $filter
     * @description
     * 
     * Esta es una controllador que maneja la vista principal de el crud de logros de un docente
     * 
    */
app.controller('crudLogrosController', ['$scope', '$http', '$uibModal', '$cookieStore', '$cookies', 'CONFIG', 'periodoData', 'actividadData', 'logroData', '$mdBottomSheet', '$mdToast', '$timeout', '$filter', function($scope, $http, $uibModal, $cookieStore, $cookies, CONFIG, periodoData, actividadData, logroData, $mdBottomSheet, $mdToast, $timeout, $filter) {
    $scope.periodos = [];
    $scope.periodoSeleccionado = null;
    $scope.activeTabIndex = 0;
    $scope.periodoActual = null;
    $scope.logros = [];
    $scope.estudiantes = [];
    $scope.cargaSeleccionada = null;
    $scope.materias = [];
    $scope.selected = {
        ids_estudiantes: []
    };
    $scope.logrosPorEliminar = [];
    $scope.isPorcentajeCien = true;
    //Trae el periodo Actual
    //periodoData.findPeriodoActual()
    //$http.get(CONFIG.http_address+'/api/todos/periodos/actual')
    periodoData.findPeriodoActual().success(function(periodo) {
        console.log("entro al succes del controller")
        $scope.periodoActual = periodo[0];
        console.log(periodo);
        periodoData.findPeriodos().success(function(data) {
            $scope.periodos = data;
            console.log("succes findPeriodos")
            console.log($scope.periodos)
                //recorre el vector de todos los periodos 
            for (var i = 0; i < data.length; i++) {
                //entra cuando el periodo actual es encontrado en el vector
                // console.log(data[i].id_periodo)
                console.log($scope.periodoActual)
                if (data[i].id_periodo == $scope.periodoActual.id_periodo) {
                    //selecciona el periodo actual en las tabs
                    $scope.activeTabIndex = i;
                    //
                    $scope.periodoSeleccionado = $scope.periodos[i];
                    // Trae todas las cargas de un periodo seleccionado
                    //$http.get(CONFIG.http_address+'/api/docentes/cargas/periodos/'+ $scope.periodoSeleccionado.id_periodo)
                    periodoData.findCargasByPeriodo($scope.periodoSeleccionado.id_periodo).success(function(data) {
                        $scope.cargas = data;
                        //recorremos las cargas para organizarlas para el acordeon del sliderbar por materias
                        angular.forEach(data, function(carga) {
                                var selected = [];
                                //primero validamos si el id de la materia ya esta en materias
                                filtro = $filter('filter')($scope.materias, {
                                    id_materia: carga.id_materia
                                });
                                //me hace un busqueda por id_materia
                                if (filtro[0] == undefined) {
                                    selected = $filter('filter')(data, {
                                        id_materia: carga.id_materia
                                    });
                                    $scope.materias.push({
                                        'id_materia': carga.id_materia,
                                        'nombre_materia': carga.nombre_materia,
                                        'cargas': selected
                                    })
                                }
                            }) //cierra forEach
                    }).error(function(data) {
                        console.log('Error: ' + data);
                    });
                } //cierra el if
            } //cierra for
        }).error(function(error) {
            console.log(error);
            $scope.periodos = []
        }); //cierra error findPeriodos
    }).error(function(error) {
        console.log("entro al error del controller")
        console.log(error);
    });
    /** 
        * @ngdoc method
        * @name open
        * @methodOf docentes.controller:crudLogrosController
        * @param {String} size size es el tamaño de la ventana modal puede ser "lg" o "sm" 
        * @param {Int} id_logro id_logro es el id de el logro que vamos a consultar
        * 
        *
        * @description
        * 
        * Este metodo se lo usa en el momento que un usuario hace click en actividades para abrir un modal y consulte las actividades de el logro el cual se le pasa
        * 
    */

    var open = function(size, id_logro) {
        //$http.get(CONFIG.http_address+'/api/docentes/logros/'+id_logro+'/actividades/')
        var modalInstance = null;
        actividadData.findActividadesByLogro(id_logro).success(function(data) {
            modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: '/views/logros/actividades.html',
                controller: 'actividadesModalController',
                size: size,
                resolve: {
                    actividades: function() {
                        return data
                    },
                    id_logro: function() {
                        return id_logro
                    },
                    permisoEdicion: function(){
                        if ($scope.periodoSeleccionado.id_periodo == $scope.periodoActual.id_periodo) return true;
                        else return false;
                    }
                }
            });
            console.log(modalInstance)
        }).error(function(error) {
            console.log(error);
        });
        console.log(modalInstance)
    };

    /** 
        * @ngdoc method
        * @name crearLogro
        * @methodOf docentes.controller:crudLogrosController
        *
        *
        * @description
        * 
        * Cuando el usuario click en el boton agregar se agrega un nuevo logro en la tabla
        * 
    */
    var crearLogro = function() {
        console.log("entreo a create")
        $scope.inserted = {
            id_carga_docente: $scope.cargaSeleccionada.id_carga_docente,
            porcentaje_logro: "0",
            nombre_logro: "Prueba",
            descripcion_logro: null,
            tipo: 0,
            vigente_logro: "S",
        };
        $scope.logros.push($scope.inserted);
        $scope.isPorcentajeCien = checkPorcentaje();
    };
    /////////////////////
    //////// fin trae cargas
    ///////form editable 

     /** 
        * @ngdoc method
        * @name updateLogro
        * @methodOf docentes.controller:crudLogrosController
        *
        * @param {Object} data data es el logro con los datos que se van a actualizar
        * @param {Object} logro logro es el logro que se va a actualizar
        *
        * @description
        * 
        * Este es el metodo para guardar los datos de el logro modificado temporalmente
        * 
    */
    var updateLogro = function(data, logro) {
        console.log(data);
        console.log(logro)
        angular.extend(logro, data);
        console.log(logro)
        console.log("tipo al actualizar ");
        console.log(logro.tipo)
        if (logro.tipo == undefined) {
            logro.tipo = 1;
        }
        console.log("logro con tipo")
        console.log(logro)
    };


    /** 
        * @ngdoc method
        * @name validarPorcentaje
        * @methodOf docentes.controller:crudLogrosController
        *
        * @param {Int} data data el el porcentaje que vamos a validar 
        *
        * @description
        * 
        * Este es el metodo para validar si un porcentaje esta entre el 100% y si se ingresan numeros 
        * 
    */

    var validarPorcentaje = function(data) {
        console.log("entro enbefore")
        console.log(data);
        // console.log(actividad)
        console.log("union")
            //angular.extend(actividad, data );
            //console.log(actividad)
        if (isNaN(data)) {
            return "Debe ingresar un numero";
            console.log("entro")
        } else if (parseFloat(data) > 100 || parseFloat(data) < 0) {
            return "El Porcentaje debe estar entre 0 y 100 ";
            console.log("no entro")
        }
    }


    /** 
        * @ngdoc method
        * @name deleteLogro
        * @methodOf docentes.controller:crudLogrosController
        *
        * @param {Object} logro logro es un objeto que tiene los datos de un logro 
        * @param {Int} index index es la posicion en el vector logros de el logro que vamos a eliminar
        *
        *
        * @description
        * 
        * Este es el metodo se lo utiliza para eliminar un logro de el vector $scope.logros 
        * 
    */

    var deleteLogro = function(logro, index) {
        if (logro.id_logro != undefined) {
            $scope.logrosPorEliminar.push(logro);
        }
        console.log(logro)
        $scope.logros.splice(index, 1);
        $scope.isPorcentajeCien = checkPorcentaje();
    }

    /** 
        * @ngdoc method
        * @name cancelform
        * @methodOf docentes.controller:crudLogrosController
        *
        * @param {Object} logro logro es un objeto que tiene los datos de un logro 
        * @param {Int} index index es la posicion en el vector logros 
        *
        *
        * @description
        * 
        * Este metodo se lo utiliza para que despues de dar en el boton agregar logro si deseamos que no se guarde el logro le damos en cancelar
        * y se eliminara del vector de logros
        * 
    */
    var cancelform = function(logro, index) {
        if (logro.descripcion_logro == null) {
            $scope.logros.splice(index, 1);
        }
        console.log(logro)
        console.log(index)
    };
    ////////
    //funcion que se la usa cuando le da click en un tab

    /** 
        * @ngdoc method
        * @name getPeriodoId
        * @methodOf docentes.controller:crudLogrosController
        *
        * @param {Int} index index es un entero que contiene la posicion dentro del vector periodos de el periodo que estoy seleccioando 
        * en las tabs
        *
        * @description
        * 
        * Este metodo se lo usa en el momento que un usuario hace click en una tab de periodos y carge las inasistencias de ese periodo
        * 
        * 
    */
    var getPeriodoId = function(index) {
        $scope.periodoSeleccionado = $scope.periodos[index];
        //$http.get(CONFIG.http_address+'/api/docentes/cargas/periodos/'+ $scope.periodoSeleccionado.id_periodo)
        periodoData.findCargasByPeriodo($scope.periodoSeleccionado.id_periodo).success(function(data) {
            $scope.cargas = data;
            var encontrado = false;
            //hace la busqueda si existe la misma carga en las nuevas cargas de este periodo
            //para dejarla seleccionada con las nuevas
            for (var i = 0; i < data.length; i++) {
                (function(i) {
                    if (data[i].nombre_materia == $scope.cargaSeleccionada.nombre_materia && data[i].id_curso == $scope.cargaSeleccionada.id_curso) {
                        $scope.cargaSeleccionada = data[i];
                        encontrado = true;
                    }
                })(i);
            }
            if (encontrado == false) {
                $scope.cargaSeleccionada = null;
            }
            seleccionarCarga($scope.cargaSeleccionada);
        }).error(function(data) {
            console.log('Error: ' + data);
        });
    };

    
    /** 
        * @ngdoc method
        * @name selectCurso
        * @methodOf docentes.controller:crudLogrosController
        * @param {Object} carga carga mandamos un objeto tipo Carga 
        * 
        *
        * @description
        * 
        * Este metodo se lo usa en el momento que un usuario hace click en una materia para que 
        * cargen el listado de estudiantes de el curso que el selecciona con las inasistencias de los estudiantes
        * 
        * 
        */
    var selectCurso = function(carga) {
            for (var i = 0; i < $scope.periodos.length; i++) {
                //entra cuando el periodo actual es encontrado en el vector
                // console.log(data[i].id_periodo)
                console.log($scope.periodoActual)
                if ($scope.periodos[i].id_periodo == $scope.periodoActual.id_periodo) {
                    //selecciona el periodo actual en las tabs
                    $scope.activeTabIndex = i;
                    //
                    $scope.periodoSeleccionado = $scope.periodos[i];
                }
            }
        seleccionarCarga(carga);

    }


    /** 
        * @ngdoc method
        * @name seleccionarCarga
        * @methodOf docentes.controller:crudLogrosController
        * @param {Object} carga carga mandamos un objeto tipo Carga 
        * 
        *
        * @description
        * 
        * Este metodo que reutilizamos siempre que vamos a consultar los logros y el listado de estudiantes de una carga
        * 
        * 
        */
    function seleccionarCarga(carga) {

        $scope.cargaSeleccionada = carga;
        getLogros(carga.id_carga_docente, function(logros) {
            $scope.logros = logros;
            console.log($scope.logros);
            $scope.isPorcentajeCien = checkPorcentaje();



        }); //CIERRA GET LOGROS
    } //CIERA FUNCION SELECIONAR CARGA


    /** 
        * @ngdoc method
        * @name getLogros 
        * @methodOf docentes.controller:crudLogrosController
        *
        *
        * @param {Int} id_carga id_carga pasamos el identificador de una carga
        * @param {Function} cb cb a esta funcion le pasamos un vector de logros consultados
        * 
        *
        * @description
        * 
        * Este metodo lo utilizamos para obtener los logros de una carga especifica
        * 
        * 
        */
    function getLogros(id_carga, cb) {
        // $http.get(CONFIG.http_address+'/api/docentes/cargas/'+id_carga+'/logros')
        logroData.findLogrosByCarga(id_carga).success(function(logros) {
            cb(logros);
            //$scope.logros = logros;
        }).error(function(error) {
            console.log('Error: ' + error);
            cb([]);
        });
    }

    
    /** 
        * @ngdoc method
        * @name btnGuardar
        * @methodOf docentes.controller:crudLogrosController
        *
        *
        * 
        *
        * @description
        * 
        * Este metodo se lo  utiliza cuando hacemos click en el boton guardar y verifica que la suma de porcentajes sea = 100
        * 
        * 
        * 
        */
    var btnGuardar = function() {
        console.log("logros por eliminar");
        console.log($scope.logrosPorEliminar)
        console.log("logros");
        console.log($scope.logros)
        var sumatoria = 0;
        angular.forEach($scope.logros, function(logro) {
            if (isNaN(logro.porcentaje_logro)) {
                console.log("entro a isNaN")
                console.log(logro.porcentaje_logro)
                return "deben ser numeros"
            } else {
                sumatoria = sumatoria + parseFloat(logro.porcentaje_logro);
            }
        })
        $scope.isPorcentajeCien = checkPorcentaje();
        console.log("sumatoria")
        console.log(sumatoria);
        if (sumatoria != 100) {
            console.log("sumatoria")
            console.log(sumatoria);
        } else {
            console.log("eliminados")
            console.log($scope.logrosPorEliminar)
            console.log("actividaes")
            console.log($scope.logros)
            logroData.saveLogros($scope.logrosPorEliminar, $scope.logros).success(function(mensaje) {
                console.log(mensaje);
                seleccionarCarga($scope.cargaSeleccionada);
                swal("Ok...", "logros Guardados!", "success");
            }).error(function(error) {
                if (error == "todos vacios"){
                    console.log("entro al if")
                    swal("Oops...", "No tienes ningun Cambio", "error");

                }else{
                      if (error.name == "SequelizeForeignKeyConstraintError" && error.parent.table == "nota_logro") {
                    swal("Oops...", "Debe eliminar primero las notas de los estudiantes", "error");
                } else if (error.name == "SequelizeForeignKeyConstraintError" && error.parent.table == "actividad") {
                    swal("Oops...", "Debe eliminar primero las actividades", "error");
                } else {
                    swal("Oops...", "Algo Salio mal", "error");
                }

                }
               
              

                seleccionarCarga($scope.cargaSeleccionada);
                $scope.logrosPorEliminar = [];

            });
        }
        //  console.log(editableForm)
        // $uibModalInstance.close();
    };
    //returna true si el porcentaje es = 100 si es diferente retorna false
    /** 
        * @ngdoc method
        * @name checkPorcentaje
        * @methodOf docentes.controller:crudLogrosController
        *
        * @description
        * 
        * Este metodo retorna true si el porcentaje es = 100
        * 
        * @return {Boolean} true si el porcentaje es 100
        * 
        */
    function checkPorcentaje() {
        var sumatoria = 0;
        angular.forEach($scope.logros, function(logro) {
            sumatoria = sumatoria + parseFloat(logro.porcentaje_logro);
        });
        if (sumatoria == 100) {
            console.log("return true")
            console.log(sumatoria);
            return true
        } else {
            console.log("return false")
            console.log(sumatoria);
            return false
        }
    }

    /** 
        * @ngdoc method
        * @name validarPorcentajeTotal
        * @methodOf docentes.controller:crudLogrosController
        *
        * @description
        * 
        * Este metodo lo reutilizamos para validar el porcentaje total
        * 
        */
    var validarPorcentajeTotal = function() {
        console.log("nunca entro")
        $scope.isPorcentajeCien = checkPorcentaje();
    }

    $scope.open = open;
    $scope.crearLogro = crearLogro;
    $scope.updateLogro = updateLogro;
    $scope.validarPorcentaje = validarPorcentaje;
    $scope.deleteLogro = $scope.deleteLogro;
    $scope.cancelform = cancelform;
    $scope.getPeriodoId = getPeriodoId;
    $scope.selectCurso = selectCurso;
    $scope.btnGuardar =btnGuardar;
    $scope.validarPorcentajeTotal= validarPorcentajeTotal;

}]);

 /** 
     * @ngdoc controller
     * @name docentes.controller:actividadesModalController
     * @requires $http, $scope, $q, $uibModalInstance, actividades, id_logro,permisoEdicion, actividadData
     * @description
     * 
     * Esta es una controllador que maneja la vista en detalle de las actividades, se la utiliza cuando se le da click en 
     * ver actividades y carga una ventana modal con las actividades de un logro 
     * 
    */
app.controller('actividadesModalController', function($http, $scope, $q, $uibModalInstance, actividades, id_logro,permisoEdicion, actividadData) {
    $scope.actividades = actividades;
    $scope.id_logro = id_logro;
    $scope.permisoEdicion = permisoEdicion;
    $scope.actividadesPorEliminar = [];
    $scope.isPorcentajeCien = true;
    console.log(actividades)
    console.log("en el modulo modal")
    console.log($scope.actividades);
    //returna true si el porcentaje es = 100 si es diferente retorna false

     /** 
        * @ngdoc method
        * @name checkPorcentaje
        * @methodOf docentes.controller:actividadesModalController
        *
        * @description
        * 
        * Este metodo retorna true si el porcentaje es = 100
        * 
        * @return {Boolean} true si el porcentaje es 100
        * 
        */
    function checkPorcentaje() {
        var sumatoria = 0;
        angular.forEach($scope.actividades, function(actividad) {
            sumatoria = sumatoria + parseFloat(actividad.porcentaje_actividad);
        });
        if (sumatoria == 100) {
            return true
        } else {
            return false
        }
    }

    /** 
        * @ngdoc method
        * @name saveColumn
        * @methodOf docentes.controller:actividadesModalController
        *
        * @param {Object} column column pasamos el identificador de una carga
        *        
        * @description
        * 
        * 
        */

    
    var saveColumn = function(column) {
        console.log(column)
        var results = [];
        var sumatoria = 0;
        angular.forEach($scope.actividades, function(actividad) {
            sumatoria = sumatoria + parseFloat(actividad[column]);
            console.log("sumatoria");
            console.log(sumatoria)
            results.push({
                id_actividad: actividad.id_actividad,
                porcentaje_actividad: parseFloat(actividad[column])
            });
        })
        console.log(sumatoria)
        console.log(results);
        actividadData.updatePorcentajes(results).success(function(mensaje) {
            console.log(mensaje);
            return $q.all(results);
        }).error(function(error) {
            if (error.status == 2) {
                swal("Oops...", error.msg, "error");
                return error["mal"]
            } else {
                swal("Oops...", " Algo salio mal!", "error");
            }
            console.log(error);
            return error;
        });
    };
    // add user
    //tipo: 0 es para saber que es un dato para insertar


    /** 
        * @ngdoc method
        * @name addActividad
        * @methodOf docentes.controller:actividadesModalController
        *       
        * @description
        * 
        * Este metodo aggrega una actividad vacia para que este lista para agregar datos y agregarla en la db
        * 
        * 
        */
    var addActividad = function() {
        $scope.inserted = {
            //id_actividad: 100,
            id_logro: $scope.id_logro,
            porcentaje_actividad: "0",
            nombre_actividad: "Prueba",
            descripcion_actividad: null,
            tipo: 0
        };
        $scope.actividades.push($scope.inserted);
        $scope.isPorcentajeCien = checkPorcentaje();
    };


    /** 
        * @ngdoc method
        * @name updateActividad
        * @methodOf docentes.controller:actividadesModalController
        *
        * @param {Object} data data es la actividad con los datos que se van a actualizar
        * @param {Object} actividad actividad es la actividad que se va a actualizar
        * @description
        * 
        * Este es el metodo para guardar los datos de la actividad modificado temporalmente 
        * 
        */

    var updateActividad = function(data, actividad) {
        console.log(data);
        console.log(actividad)
        console.log("union")
        angular.extend(actividad, data);
        console.log(actividad)
        console.log("tipo al actualizar ");
        console.log(actividad.tipo)
        if (actividad.tipo == undefined) {
            actividad.tipo = 1;
        }
        console.log("actividad con tipo")
        console.log(actividad)
    };

    /** 
        * @ngdoc method
        * @name deleteActividad
        * @methodOf docentes.controller:actividadesModalController
        *
        * @param {Object} actividad actividad es un objeto que tiene los datos de un actividad 
        * @param {Int} index index es la posicion en el vector actividades de el actividad que se va a eliminar
        *
        *
        * @description
        * 
        * Este es el metodo se lo utiliza para eliminar un actividad de el vector $scope.actividades 
        * 
    */
    var deleteActividad = function(actividad, index) {
        if (actividad.id_actividad != undefined) {
            $scope.actividadesPorEliminar.push(actividad);
        }
        console.log(actividad)
        $scope.actividades.splice(index, 1);
        $scope.isPorcentajeCien = checkPorcentaje();
    }


    /** 
        * @ngdoc method
        * @name validarPorcentaje
        * @methodOf docentes.controller:actividadesModalController
        *
        * @param {Int} data data el el porcentaje que vamos a validar 
        *
        * @description
        * 
        * Este es el metodo para validar si un porcentaje esta entre el 100% y si se ingresan numeros 
        * 
    */
    
    var validarPorcentaje = function(data) {
        console.log(data);
        // console.log(actividad)
        console.log("union")
            //angular.extend(actividad, data );
            //console.log(actividad)
        if (isNaN(data)) {
            return "Debe ingresar un numero";
            console.log("entro")
        } else if (parseFloat(data) > 100 || parseFloat(data) < 0) {
            return "El Porcentaje debe estar entre 0 y 100 ";
            console.log("no entro")
        }
    }
    /** 
        * @ngdoc method
        * @name validarPorcentajeTotal
        * @methodOf docentes.controller:actividadesModalController
        *
        * @description
        * 
        * Este metodo lo reutilizamos para validar el porcentaje total
        * 
        */
    var validarPorcentajeTotal = function() {
            console.log("nunca entro")
            $scope.isPorcentajeCien = checkPorcentaje();
        }
        //esta funcion la usamos cuando le damos ok en una actividad
    var guardarActividadTemporal = function(data, actividad) {
        console.log(data);
        console.log(actividad)
        console.log("union")
        angular.extend(actividad, data);
        console.log(actividad)
    }
    /** 
        * @ngdoc method
        * @name cancelform
        * @methodOf docentes.controller:actividadesModalController
        *
        * @param {Object} actividad actividad es un objeto que tiene los datos de una actividad 
        * @param {Int} index index es la posicion en el vector actividades 
        *
        *
        * @description
        * 
        * Este metodo se lo utiliza para que despues de dar en el boton agregar actividad si deseamos que no se guarde la actividad le damos en cancelar
        * y se eliminara del vector de actividades
        * 
    */
    var cancelform = function(actividad, index) {
        if (actividad.descripcion_actividad == null) {
            $scope.actividades.splice(index, 1);
        }
        console.log(actividad)
        console.log(index)
    };

     /** 
        * @ngdoc method
        * @name ok
        * @methodOf docentes.controller:actividadesModalController
        * @description
        * 
        * Este metodo cierra el modal cuando le de en ok y valida que todo este bien antes de hacer la transaccion
        * 
        * 
        */
    
    var ok = function() {
        console.log($scope.isPorcentajeCien)
        console.log("actividades por eliminar");
        console.log($scope.actividadesPorEliminar)
        console.log("actividades");
        console.log($scope.actividades)
        var sumatoria = 0;
        angular.forEach($scope.actividades, function(actividad) {
            if (isNaN(actividad.porcentaje_actividad)) {
                console.log("entro a isNaN")
                console.log(actividad.porcentaje_actividad)
                return "deben ser numeros"
            } else {
                sumatoria = sumatoria + parseFloat(actividad.porcentaje_actividad);
            }
        })
        console.log("sumatoria")
        console.log(sumatoria);
        $scope.isPorcentajeCien = checkPorcentaje();
        console.log($scope.isPorcentajeCien)
        if (sumatoria != 100) {
            console.log("sumatoria")
            console.log(sumatoria);
        } else {
            console.log("eliminados")
            console.log($scope.actividadesPorEliminar)
            console.log("actividaes")
            console.log($scope.actividades)
            actividadData.saveActividades($scope.actividadesPorEliminar, $scope.actividades).success(function(mensaje) {
                console.log(mensaje);
                swal("Ok...", "Actividades Guardadas!", "success");
                $uibModalInstance.close();
            }).error(function(error) {
                swal("Oops...", " Algo salio mal!", "error");
                console.log(error);
            });
        }
        //  console.log(editableForm)
        // $uibModalInstance.close();
    };

    /** 
        * @ngdoc method
        * @name cancel
        * @methodOf docentes.controller:actividadesModalController
        * @description
        * 
        * Este metodo cierra el modal cuando le de en boton cancelar
        * 
        * 
        */

    var cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.saveColumn = saveColumn;
    $scope.addActividad = addActividad;
    $scope.updateActividad = updateActividad;
    $scope.deleteActividad  = deleteActividad ;
    $scope.validarPorcentaje  = validarPorcentaje ;
    $scope.validarPorcentajeTotal = validarPorcentajeTotal;
    $scope.guardarActividadTemporal = guardarActividadTemporal;
    $scope.cancelform  = cancelform ;
    $scope.ok = ok
    $scope.cancel = cancel
});