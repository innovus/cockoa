//una function javascript q se llama asi misma
(function() {

    var app = angular.module('docentes'); //creamos el modulo pokedex y le pasamos array con las dependencias

    /** 
     * @ngdoc controller
     * @name docentes.controller:showActividadEstudianteController
     * @requires $scope,$uibModalInstance,actividad
     * @description
     * 
     * Esta es una controllador para consultar la actividad en detalle 
     * 
    */
    app.controller('showActividadEstudianteController', ['$scope', '$uibModalInstance', 'actividad', function($scope, $uibModalInstance, actividad) {
        $scope.actividad = actividad
        console.log("ya en el modal")
        console.log(actividad)
        $scope.ok = function() {
            $uibModalInstance.close();
        }
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }]);


    /** 
     * @ngdoc controller
     * @name docentes.controller:estudiantes_notasController
     * @requires $scope, $http, $filter, $cookieStore, $cookies, periodoData, materiaData, logroData, actividadData, nota_actividadData, nota_logroData, $uibModal
     * @description
     * 
     * Esta es una controllador que maneja la vista principal de notas de un estudiante
     * 
    */
    app.controller('estudiantes_notasController', ['$scope', '$http', '$filter', '$cookieStore', '$cookies', 'periodoData', 'materiaData', 'logroData', 'actividadData', 'nota_actividadData', 'nota_logroData', '$uibModal', function($scope, $http, $filter, $cookieStore, $cookies, periodoData, materiaData, logroData, actividadData, nota_actividadData, nota_logroData, $uibModal) {
        $scope.materiaSeleccionada = null;
        $scope.periodos = [];
        $scope.periodoActual = null
        $scope.periodoSeleccionado = null;
        $scope.activeTabIndex = 0;
        $scope.notaFinal = 0;
        //Trae el periodo Actual
        periodoData.findPeriodoActual().success(function(data) {
            $scope.periodoActual = data[0];
        }).error(function(error) {
            console.log(error);
        });
        periodoData.findPeriodos().success(function(data) {
            $scope.periodos = data;
            for (var i = 0; i < data.length; i++) {
                (function(i) {
                    if (data[i].id_periodo == $scope.periodoActual.id_periodo) {
                        $scope.activeTabIndex = i;
                        $scope.periodoSeleccionado = $scope.periodos[i];
                    }
                })(i);
            }
            console.log(data);
        }).error(function(error) {
            console.log(error);
            $scope.periodos = [];
        });

        materiaData.findMateriasByEstudiante().success(function(data) {
            $scope.materias = data;
            console.log($scope.materias);
        }).error(function(data) {
            console.log('Error: ' + data);
        });

        
        /** 
        * @ngdoc method
        * @name getPeriodoId
        * @methodOf docentes.controller:estudiantes_notasController 
        * @param {Int} index index es un entero que contiene la posicion dentro del vector periodos de el periodo que estoy seleccioando 
        * en las tabs
        *
        * @description
        * 
        * Este metodo se lo usa en el momento que un usuario hace click en una tab de periodos y carge las notas de ese periodo
        * 
        * 
        */ 
        
        var getPeriodoId = function(index) {
            $scope.periodoSeleccionado = $scope.periodos[index];
            getNotasYLogros($scope.materiaSeleccionada, $scope.periodoSeleccionado);
            console.log("selecciono periodo" + $scope.periodoSeleccionado);
        };

        /** 
        * @ngdoc method
        * @name getMateriasYLogros
        * @methodOf docentes.controller:estudiantes_notasController 
        * @param {Object} materia materia es un objecto donde contiene todos los datos de una materia
        * 
        *
        * @description
        * 
        * Este metodo se lo usa en el momento que un usuario hace click en una materia y carge las notas de esa materia
        * 
        * 
        */ 

        var getMateriasYLogros = function(materia) {
            $scope.materiaSeleccionada = materia;
            getNotasYLogros($scope.materiaSeleccionada, $scope.periodoSeleccionado);
        };

        /** 
        * @ngdoc method
        * @name getLogros
        * @methodOf docentes.controller:estudiantes_notasController 
        * @param {Int} id_materia id_materia es un entero unico que identifica una materia en la base de datos
        * @param {Int} id_periodo id_periodo es un entero unico que identifica un periodo en la base de datos
        * @param {Function} cb cb es el callback donde se pasaran un vector que contiene los logros que se consulten 
        *
        *
        * @description
        * 
        * Este metodo se lo usa para hacer la consulta de los logros de un periodo y de una materia
        * 
        * 
        */ 
        function getLogros(id_materia, id_periodo, cb) {
            logroData.findLogrosByMateriaAndPeriodo(id_materia, id_periodo).success(function(logros) {
                cb(logros);
                //$scope.logros = logros;
            }).error(function(error) {
                console.log('Error: ' + error);
                cb([]);
            });
        }

        /** 
        * @ngdoc method
        * @name getNotas
        * @methodOf docentes.controller:estudiantes_notasController 
        * @param {Int} id_materia id_materia es un entero unico que identifica una materia en la base de datos
        * @param {Int} id_periodo id_periodo es un entero unico que identifica un periodo en la base de datos
        * @param {Function} cb cb es el callback donde se pasaran un vector que contiene las notas que se consulten 
        *
        *
        * @description
        * 
        * Este metodo se lo usa para hacer la consulta de las notas de un periodo y de una materia
        * 
        * 
        */ 
        function getNotas(id_materia, id_periodo, cb) {
            nota_logroData.findNotasLogrosByMateriaAndPeriodo(id_materia, id_periodo).success(function(notas) {
                cb(notas);
                //$scope.logros = logros;
            }).error(function(error) {
                console.log('Error: ' + error);
                cb({});
            });
        }

        /** 
        * @ngdoc method
        * @name getActividades
        * @methodOf docentes.controller:estudiantes_notasController 
        * @param {Int} id_logro id_logro es un entero unico que identifica un logro en la base de datos
        * @param {Function} cb cb es el callback donde se pasaran un vector que contiene las actividades que se consulten 
        *
        *
        * @description
        * 
        * Este metodo se lo usa para hacer la consulta de las actividades de un logro 
        * 
        * 
        
        function getActividades(id_logro, cb) {
            actividadData.findActividadesByLogro(id_logro).success(function(actividades) {
                cb(actividades);
                //$scope.logros = logros;
            }).error(function(error) {
                console.log('Error: ' + error);
                cb([]);
            });
        }
        */ 

        /** 
        * @ngdoc method
        * @name getActividadesByLogros
        * @methodOf docentes.controller:estudiantes_notasController 
        * @param {Array} logros logros es un vector que contiene Objetos tipos logro 
        * @param {Function} cb cb es el callback donde se pasaran un vector que contiene las actividades que se consulten 
        *
        *
        * @description
        * 
        * Este metodo se lo usa para hacer la consulta de las actividades de los logros que se pasen en el vector
        * 
        * 
        */ 

        function getActividadesByLogros(logros, cb) {
            console.log(JSON.stringify(logros));
            actividadData.findActividadesByLogros(logros).success(function(actividades) {
                console.log("actividaes byr logros")
                console.log(actividades)
                cb(actividades);
                //$scope.logros = logros;
            }).error(function(error) {
                console.log('Error: ' + error);
                cb([]);
            });
        }

        /** 
        * @ngdoc method
        * @name getNotasActividades
        * @methodOf docentes.controller:estudiantes_notasController 
        * @param {Function} cb cb es el callback donde se pasaran un vector que contiene las notas de las actividades que se consulten 
        *
        *
        * @description
        * 
        * Este metodo se lo usa para hacer la consulta de las notas de las actividades de el estudiante que esta logeado
        * 
        * 
        */ 
        function getNotasActividades(cb) {
            nota_actividadData.findNotasActividadByEstudianteAndLogro().success(function(notas) {
                cb(notas);
                //$scope.logros = logros;
            }).error(function(error) {
                console.log('Error: ' + error);
                cb({});
            });
        }

        /** 
        * @ngdoc method
        * @name calcularNotaFinal
        * @methodOf docentes.controller:estudiantes_notasController 
        *
        *
        * @description
        * 
        * Este metodo se lo usa para calcular la nota final de los logros que esten en el vector logros 
        * 
        * 
        */ 
        function calcularNotaFinal() {
            var promedio = 0;
            $scope.logros.forEach(function(logro, i) {
                if (logro.nota != " - ") {
                    console.log("entro al if ")
                    console.log(logro.nota)
                    var nota = parseFloat(logro.nota);
                    var porcentaje = parseFloat(logro.porcentaje_logro);
                    var valor = (nota * porcentaje) / 100;
                    promedio = promedio + valor;
                    console.log(promedio)
                }
            })
            $scope.notaFinal = Math.round(promedio * 100) / 100;
        }

        /** 
        * @ngdoc method
        * @name showActividad
        * @methodOf docentes.controller:estudiantes_notasController 
        * @param {Object} actividad actividad es un objecto donde contiene todos los datos de una actividad
        *
        *
        * @description
        * 
        * Este metodo se lo usa para abrir la ventana modal y muestre una actividad en la ventana modal
        * 
        * 
        */ 
        $scope.showActividad = function(actividad) {
            var modalInstance = null;
            modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: '/views/notas/actividad_modal.html',
                controller: 'showActividadController',
                size: 'sm',
                resolve: {
                    actividad: function() {
                        return actividad
                    }
                }
            });
        }

        /** 
        * @ngdoc method
        * @name getNotasYLogros
        * @methodOf docentes.controller:estudiantes_notasController 
        * @param {Object} materia materia es un objecto donde contiene todos los datos de una materia
        * @param {Object} periodo periodo es un objecto donde contiene todos los datos de una periodo
        *
        *
        * @description
        * 
        * Este metodo se lo usa para consultar los logros, actividades, notas de un respectiva materia en un periodo
        * 
        * 
        */
        function getNotasYLogros(materia, periodo) {
            $scope.materiaSeleccionada = materia;
            $scope.logros = [];
            $scope.notas = {};
            $scope.notasactividades = {};
            getLogros(materia.id_materia, periodo.id_periodo, function(logros) {
                getNotas(materia.id_materia, periodo.id_periodo, function(notas) {
                    $scope.notas = notas;
                    $scope.logros = logros;
                    console.log('notas')
                    console.log($scope.notas);
                    getActividadesByLogros(logros, function(actividades) {
                        getNotasActividades(function(notasactividades) {
                            $scope.notasactividades = notasactividades;
                            $scope.logros.forEach(function(logro, index) {
                                    console.log("recorrer logros")
                                    selected = $filter('filter')(actividades, {
                                        id_logro: logro.id_logro
                                    });
                                    $scope.logros[index].actividades = selected;
                                    $scope.logros[index].actividades.forEach(function(actividad, j) {
                                        console.log("recorrer atividades")
                                        console.log($scope.notasactividades)
                                        console.log(actividad)
                                        selectedna = $filter('filter')($scope.notasactividades, {
                                            id_actividad: actividad.id_actividad
                                        });
                                        console.log(selectedna)
                                        if (typeof selectedna === 'undefined' || selectedna.length == 0) {
                                            $scope.logros[index].actividades[j].nota = '-'
                                        } else {
                                            console.log(selectedna)
                                            $scope.logros[index].actividades[j].nota = selectedna[0].nota_actividad
                                        }
                                    }); //cierra foreach actividades
                                    if (typeof $scope.notas[$scope.logros[index].id_logro] === 'undefined') {
                                        $scope.logros[index].nota = ' - ';
                                    } else {
                                        $scope.logros[index].nota = $scope.notas[$scope.logros[index].id_logro];
                                    }
                                }) //cierra foreach logros
                            calcularNotaFinal();
                        }); //cierrra getnotasActividades
                    }); //cierra getActividadesByLogros
                    console.log("cierra for y scope logros")
                    console.log($scope.logros)
                }); //cierra getNotas
            }); //Cierra getLogros
        } //cierra getNotasYLogros

        $scope.getPeriodoId  = getPeriodoId;
        $scope.getMateriasYLogros = getMateriasYLogros;
    }]);
})();

function delNull(item) {
    if (item == null) {
        return "";
    } else {
        return item;
    }
}

