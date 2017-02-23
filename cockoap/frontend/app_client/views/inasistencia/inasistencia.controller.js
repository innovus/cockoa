//una function javascript q se llama asi misma
//(function (){
var app = angular.module('docentes'); //creamos date modulo pokedex y le pasamos array con las dependencias
/** 
 * @ngdoc controller
 * @name docentes.controller:inasistenciaController
 * @requires $scope, $http, $uibModal, $log, $filter, CONFIG, periodoData, inasistenciaData, estudianteData,myutils
 * @description
 * 
 * Esta es una controllador que maneja la vista de inasistencia de un docente 
 * 
 */
app.controller('inasistenciaController', ['$rootScope','$scope', '$http', '$uibModal', '$log', '$filter', 'CONFIG', 'periodoData', 'inasistenciaData', 'estudianteData', 'myutils', function($rootScope,$scope, $http, $uibModal, $log, $filter, CONFIG, periodoData, inasistenciaData, estudianteData, myutils) {
    $scope.inasistenciasEstudiante = [];
    $scope.estudiantes = [];
    $scope.fechaInasistencia = new Date();
    $scope.cargaSeleccionada = null;
    $scope.selected = {
        ids_estudiantes: []
    };
    $scope.periodos = [];
    $scope.periodoSeleccionado = null;
    $scope.activeTabIndex = 0;
    $scope.periodoActual = null;
    $scope.materias = [];
    //option de faltas justificada o no
    $scope.estado_inasistencia = [{
        value: 0,
        text: 'Justificada'
    }, {
        value: 1,
        text: 'No justificada'
    }];
    //Trae el periodo Actual
    periodoData.findPeriodoActual().success(function(data) {
        $scope.periodoActual = data[0];
        console.log("entro a perdiodo actual");
        console.log($scope.periodoActual)
        //Trae todos los periodos y pone el actual
        periodoData.findPeriodos().success(function(data) {
            $scope.periodos = data;
            console.log("periodo actual")
            console.log($scope.periodoActual);
            //recorre el vector de todos los periodos 
            for (var i = 0; i < data.length; i++) {
                //entra cuando el periodo actual es encontrado en el vector
                if (data[i].id_periodo == $scope.periodoActual.id_periodo) {
                    //selecciona el periodo actual en las tabs
                    $scope.activeTabIndex = i;
                    //
                    $scope.periodoSeleccionado = $scope.periodos[i];
                    // Trae todas las cargas de un periodo seleccionado
                    periodoData.findCargasByPeriodo($scope.periodoSeleccionado.id_periodo).success(function(data) {
                        $scope.cargas = data;
                        console.log("cargas")
                        console.log($scope.cargas)

                        $rootScope.$watch("opciones",function(newValue,oldValue) {
                            if (newValue===oldValue) {
                                $rootScope.opciones.forEach(function(opcion, i) {
                
                                    if(opcion.id_opcion == 31){
                                        opcion.seleccionado ="seleccionado";
                                    }else{
                                        opcion.seleccionado ="no";
                                    }
                                });
                                return ;
                            }
                            $rootScope.opciones.forEach(function(opcion, i) {
                
                                if(opcion.id_opcion == 31){
                                    opcion.seleccionado ="seleccionado";
                                }else{
                                    opcion.seleccionado ="no";
                                }           
                            });  
                        });

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
                        console.log("materias")
                        console.log($scope.materias)
                    }).error(function(data) {
                        console.log('Error: ' + data);
                    });
                } //cierra el if
            } //cierra for
            
        }).error(function(error) {
            console.log(error);
            $scope.periodos = []
        });
    }).error(function(error) {
        console.log(error);
    });
    /////////////////////
    //funcion que se la usa cuando le da click en un tab
    /** 
     * @ngdoc method
     * @name getPeriodoId
     * @methodOf docentes.controller:inasistenciaController
     * @param {Int} index index es un entero que contiene la posicion dentro del vector periodos de el periodo que estoy seleccioando 
     * en las tabs
     *
     * @description
     * 
     * Este metodo se lo usa en el momento que un usuario hace click en una tab de periodos y carge las inasistencias de ese periodo
     * 
     * 
     */
    $scope.getPeriodoId = function(index) {
        if ($scope.cargaSeleccionada != null || $scope.cargaSeleccionada != undefined) {
            myutils.showWait();
        }
        $scope.periodoSeleccionado = $scope.periodos[index];
        periodoData.findCargasByPeriodo($scope.periodoSeleccionado.id_periodo).success(function(data) {
            $scope.cargas = data;
            var encontrado = false;
            //hace la busqueda si existe la misma carga en las nuevas cargas de este periodo
            //para dejarla seleccionada con las nuevas
            for (var i = 0; i < data.length; i++) {
                (function(i) {
                    if ($scope.cargaSeleccionada != null || $scope.cargaSeleccionada != undefined) {
                        if (data[i].nombre_materia == $scope.cargaSeleccionada.nombre_materia && data[i].id_curso == $scope.cargaSeleccionada.id_curso) {
                            $scope.cargaSeleccionada = data[i];
                            console.log("if ycarga seleccionada");
                            console.log($scope.cargaSeleccionada)
                            encontrado = true;
                        }
                    }
                })(i);
            }
            if (encontrado == false) {
                $scope.cargaSeleccionada = null;
                console.log($scope.cargaSeleccionada)
            } else {
                console.log($scope.cargaSeleccionada);
                seleccionarCarga($scope.cargaSeleccionada);
            }
        }).error(function(data) {
            console.log('Error: ' + data);
        });
    };
    //funcion q abre ventana modal
    /** 
     * @ngdoc method
     * @name open
     * @methodOf docentes.controller:inasistenciaController
     * @param {String} size size es el tamaño de la ventana modal puede ser "lg" o "sm" 
     * @param {Int} id_carga id_carga es el id de la carga que vamos a consultar
     * @param {Int} id_estudiante es el es el id de el estudiante que vamos a consultar
     * 
     *
     * @description
     * 
     * Este metodo se lo usa en el momento que un usuario hace click en la cantidad de faltas y mira las faltas de un estudiante espevcifico en una ventama modal
     * 
     * 
     */
    var open = function(size, id_carga, id_estudiante) {
        //$http.get(CONFIG.http_address+'/inasistencias/cargas/'+id_carga+'/estudiantes/'+id_estudiante)
        inasistenciaData.findInasistenciasByCargaAndEstudiante(id_carga, id_estudiante).success(function(data) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/views/inasistencia/inasistencia_detalle.html',
                controller: 'ModalInasistenciaCtrl',
                size: size,
                resolve: {
                    inasistenciasEstudiante: function() {
                        return data
                    },
                    permisoEdicion: function() {
                        if ($scope.periodoSeleccionado.id_periodo == $scope.periodoActual.id_periodo) return true;
                        else return false;
                    }
                }
            });
        }).error(function(error) {
            console.log(error);
        });
    };
    /** 
     * @ngdoc method
     * @name selectCurso
     * @methodOf docentes.controller:inasistenciaController
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
        myutils.showWait();
        seleccionarCarga(carga);
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
    }
    /** 
     * @ngdoc method
     * @name seleccionarCarga
     * @methodOf docentes.controller:inasistenciaController
     * @param {Object} carga carga mandamos un objeto tipo Carga 
     * 
     *
     * @description
     * 
     * Este metodo que reutilizamos siempre que vamos a consultar las inasistencias y el listado de estudiantes de una carga
     * 
     * 
     */
    function seleccionarCarga(carga) {
        $scope.cargaSeleccionada = carga;
        $scope.estudiantes = [];
        $scope.cantidad = {};
        $scope.selected.ids_estudiantes = [];
        getCursos(carga.id_curso, function(estudiantes) {
            getInasistencias(carga.id_carga_docente, function(cantidad) {
                $scope.cantidad = cantidad;
                console.log("antes del for");
                console.log(cantidad);
                console.log($scope.cantidad);
                $scope.estudiantes = estudiantes;
                for (var i = $scope.estudiantes.length - 1; i >= 0; i--) {
                    if (typeof $scope.cantidad[$scope.estudiantes[i].id_estudiante] === 'undefined') {
                        $scope.estudiantes[i].inasistencias = 0;
                    } //CIERRA IF
                    else {
                        $scope.estudiantes[i].inasistencias = $scope.cantidad[$scope.estudiantes[i].id_estudiante];
                    } //CIERRA ELSE
                } //cierra for 
                myutils.hideWait();
            }); //CIERRA GERINASISTENCIAS
        }); //CIERRA GETCURSOS
    } //CIERA FUNCION SELECIONAR CARGA
    /** 
     * @ngdoc method
     * @name addInasistencia
     * @methodOf docentes.controller:inasistenciaController
     * @param {Date} fecha fecha se lo utiliza para mandar la fecha de las inasistencias que se agregaran
     * 
     *
     * @description
     * 
     * Este metodo se lo utiliza para agregar inasistencias
     * 
     * 
     */
    var addInasistencia = function(fecha) {
        console.log(fecha)
        console.log("date")
        var jsonenviar = [];
        for (var i = $scope.selected.ids_estudiantes.length - 1; i >= 0; i--) {
            var jsonsolo = {
                "id_periodo": 1,
                "id_estudiante": $scope.selected.ids_estudiantes[i],
                "estado_inasistencia": 1,
                "fecha_inasistencia": fecha,
                "id_carga": $scope.cargaSeleccionada.id_carga_docente
            }
            jsonenviar.push(jsonsolo);
        } //cierra for
        console.log("json que vamos a enviar")
        console.log(jsonenviar);
        inasistenciaData.createInasistenciasEstudiantes(jsonenviar).success(function(response) {
            console.log($scope.cargaSeleccionada.id_carga_docente)
            console.log(response);
            swal("Buen Trabajo!", response.mensaje, "success")
            seleccionarCarga($scope.cargaSeleccionada);
        }).error(function(error) {
            console.log('Error: ' + error);
            swal("Oops...", " Algo salio mal!", "error");
        });
    }
    /** 
     * @ngdoc method
     * @name getCursos
     * @methodOf docentes.controller:inasistenciaController
     * @param {Int} id_curso id_curso aqui pasamos el id de curso
     * @param {Function} cb cb a este callback  se pasa el vector de los estudiantes consultados
     *
     * 
     *
     * @description
     * 
     * Este metodo se lo utiliza para consultar los estudiantes de un curso en las base de  datos
     * 
     * 
     */
    function getCursos(id_curso, cb) {
        estudianteData.findEstudiantesByCurso(id_curso).success(function(est) {
            console.log("hizo la consulta y sige estudiantes");
            for (var i = est.length - 1; i >= 0; i--) {
                est[i].nombre1 = delNull(est[i].nombre1);
                est[i].nombre2 = delNull(est[i].nombre2);
                est[i].apellido1 = delNull(est[i].apellido1);
                est[i].apellido2 = delNull(est[i].apellido2);
                est[i].nombrecompleto = est[i].apellido1 + " " + est[i].apellido2 + " " + est[i].nombre1 + " " + est[i].nombre2;
            } //cierra dor
            cb(est);
        }).error(function(error) {
            cb([]);
            console.log('Error: ' + error);
        }); //cierra get
    } //cierra funcion
    /** 
     * @ngdoc method
     * @name getInasistencias
     * @methodOf docentes.controller:inasistenciaController
     * @param {Int} id_carga id_carga aqui pasamos el id de la carga
     * @param {Function} cb cb a este callback  se pasa las inasistencias consultadas
     *
     * 
     *
     * @description
     * 
     * Este metodo se lo utiliza para consultar las inasistencias de un curso en un periodo
     * 
     * 
     */
    function getInasistencias(id_carga, cb) {
        inasistenciaData.findInasistenciasByCarga(id_carga).success(function(cantidad) {
            cb(cantidad);
        }).error(function(error) {
            cb([]);
            console.log('Error: ' + error);
        });
    }
    $scope.open = open;
    $scope.selectCurso = selectCurso;
    $scope.addInasistencia = addInasistencia;
}]);

function delNull(item) {
    if (item == null) {
        return "";
    } else {
        return item;
    }
}
/** 
 * @ngdoc controller
 * @name docentes.controller:ModalInasistenciaCtrl
 * @requires $scope, $uibModalInstance, inasistenciasEstudiante,permisoEdicion, $filter, inasistenciaData
 * @description
 * 
 * Esta es un controlador que se lo utiliza para visualizar en una ventana modal las inasistencias de un estudiante
 * 
 */
app.controller('ModalInasistenciaCtrl', function($scope, $uibModalInstance, inasistenciasEstudiante, permisoEdicion, $filter, inasistenciaData) {
    $scope.permisoEdicion = permisoEdicion;
    $scope.inasistenciasEstudiante = inasistenciasEstudiante;
    $scope.justificadas = [{
        value: 0,
        text: 'Si'
    }, {
        value: 1,
        text: 'No'
    }];
    /** 
     * @ngdoc method
     * @name showEstadoInasistencia
     * @methodOf docentes.controller:ModalInasistenciaCtrl
     * @param {Object} inasistencia inasistencia es un objeto que contiene todos los datos de una inasistencia
     *
     * 
     *
     * @description
     * 
     * Este metodo se lo utiliza para mostrar el estado en el select de una inasistencia
     * 
     * 
     */
    var showEstadoInasistencia = function(inasistencia) {
        var selected = [];
        //if(inasistencia.estado_inasistencia) {
        selected = $filter('filter')($scope.justificadas, {
            value: inasistencia.estado_inasistencia
        });
        //}
        return selected[0].text;
    };
    /** 
     * @ngdoc method
     * @name updateEstado
     * @methodOf docentes.controller:ModalInasistenciaCtrl
     * @param {Object} inasistencia inasistencia es un objeto que contiene todos los datos de una inasistencia
     *
     * 
     *
     * @description
     * 
     * Este metodo se lo utiliza para actualizar el estado de una inasistencia
     * 
     * 
     */
    var updateEstado = function(inasistencia) {
        console.log("entro a updateEstado")
        inasistenciaData.updateEstadoInasistencia(inasistencia).success(function(mensaje) {
            //   alert(mensaje.msg);
            swal("Buen Trabajo!", mensaje.msg, "success")
            console.log(mensaje);
        }).error(function(error) {
            console.log(error);
            swal("Oops...", " Algo salio mal!", "error");
        });
    }
    console.log("en el modulo modal")
    console.log($scope.inasistenciasEstudiante);
    // $scope.inasistenciasEstudiante = inasistenciasEstudiante;
    /*$scope.selected = {
      inasistencia: $scope.inasistenciasEstudiante[0]
    };*/
    /** 
     * @ngdoc method
     * @name ok
     * @methodOf docentes.controller:ModalInasistenciaCtrl
     * @description
     * 
     * Este metodo cierra el modal cuando le de en ok
     * 
     * 
     */
    var ok = function() {
        $uibModalInstance.close();
    };
    /** 
     * @ngdoc method
     * @name cancel
     * @methodOf docentes.controller:ModalInasistenciaCtrl
     * @description
     * 
     * Este metodo cierra el modal cuando le de en boton cancelar
     * 
     * 
     */
    var cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.cancel = cancel;
    $scope.ok = ok;
    $scope.updateEstado = updateEstado;
    $scope.showEstadoInasistencia = showEstadoInasistencia;
});