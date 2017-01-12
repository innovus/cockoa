(function() {
    

    angular.module('docentes').run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    }).controller('docentesNotasController', docentesNotasController)
    .controller('showLogroController', showLogroController)
    .controller('showActividadController', showActividadController)
    .controller('waitController', waitController);


    /** 
     * @ngdoc controller
     * @name docentes.controller:waitController
     * requires $mdDialog, $rootScope
     *
     * @description
     * controlador que se usa para que se active un modal con un icono de cargando
     * para que el usuario no de click en algo hasta que cargen los datos por completo
     * 
     * 
     */    
    waitController.$inject = ['$mdDialog', '$rootScope'];
    function waitController($mdDialog, $rootScope) {
        var vm = this;
        $rootScope.$on("hide_wait", function(event, args) {
            $mdDialog.cancel();
        });
    }

    /** 
     * @ngdoc controller
     * @name docentes.controller:showLogroController
     * @requires $scope, $uibModalInstance, logro
     * @description
     * Este recibe un logro como parametro que es el que me va a mostrar en la ventana modal
     * 
     * 
     */
    showLogroController.$inject = ['$scope', '$uibModalInstance', 'logro'];
    function showLogroController($scope, $uibModalInstance, logro) {
        $scope.logro = logro
        $scope.ok = function() {
            $uibModalInstance.close();
        }
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }

    /** 
     * @ngdoc controller
     * @name  docentes.controller:showActividadController
     * @requires $scope, $uibModalInstance, actividad
     * @description
     * Este recibe una actividad como parametro que es el que me va a mostrar en la ventana modal
     * 
     * 
     */
    showActividadController.$inject = ['$scope', '$uibModalInstance', 'actividad'];
    function showActividadController($scope, $uibModalInstance, actividad) {
        $scope.actividad = actividad
        console.log("ya en el modal")
        console.log(actividad)
        $scope.ok = function() {
            $uibModalInstance.close();
        }
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }


    /** 
     * @ngdoc controller
     * @name docentes.controller:docentesNotasController
     * requires $scope, CONFIG, periodoData, estudianteData, actividadData,logroData, nota_actividadData,nota_logroData, $filter, uibModal, myutils
     *
     * @description
     * Este controlador maneja toda la parte principal de la pagina de notas por parte del docente 
     * 
     * 
     */
    docentesNotasController.$inject = ['$scope', 'CONFIG', 'periodoData', 'estudianteData', 'actividadData', 'logroData', 'nota_actividadData', 'nota_logroData', '$filter', '$uibModal', 'myutils'];
    function docentesNotasController($scope, CONFIG, periodoData, estudianteData, actividadData, logroData, nota_actividadData, nota_logroData, $filter, $uibModal, myutils) {
        $scope.primerNombre = "Jorge";
        $scope.primerApellido = "Viveros";
        $scope.numero= "1085292941"
        $scope.estudiantes = [];
        $scope.cargaSeleccionada = null;
        $scope.periodos = [];
        $scope.periodoSeleccionado = null;
        $scope.activeTabIndex = 0;
        $scope.periodoActual = null;
        $scope.logros = [];
        $scope.cabeceras = [];
        $scope.valorBefore = {};        
        $scope.notas_logros = null;
        $scope.notas_actividades = null;
        $scope.materias = []
        $scope.selected = {
            ids_estudiantes: []
        };
        var val_before;


        //Trae el periodo Actual
        periodoData.findPeriodoActual().success(function(data) {
            $scope.periodoActual = data[0];
            console.log("periodo actual")
            console.log($scope.periodoActual)

            //Trae todos los periodos y pone el actual
            periodoData.findPeriodos().success(function(periodos) {
                $scope.periodos = periodos;

                //recorre el vector de todos los periodos 

                periodos.forEach(function(periodo, i) {
                    //entra cuando el periodo actual es encontrado en el vector
                    if (periodo.id_periodo == $scope.periodoActual.id_periodo) {
                        //selecciona el periodo actual en las tabs
                        $scope.activeTabIndex = i;
                        //
                        $scope.periodoSeleccionado = $scope.periodos[i];
                        // Trae todas las cargas de un periodo seleccionado

                        console.log("periodo seleccionado")
                        console.log($scope.periodoSeleccionado)

                        periodoData.findCargasByPeriodo($scope.periodoSeleccionado.id_periodo).success(function(cargas) {
                            $scope.cargas = cargas;
                            //recorremos las cargas para organizarlas para el acordeon del sliderbar por materias
                            cargas.forEach(function(carga,j) {
                                var selected = [];
                                //primero validamos si el id de la materia ya esta en materias
                                filtro = $filter('filter')($scope.materias, {
                                    id_materia: carga.id_materia
                                });
                                    //me hace un busqueda por id_materia
                                if (filtro[0] == undefined) {
                                    selected = $filter('filter')(cargas, {
                                        id_materia: carga.id_materia
                                    });
                                    $scope.materias.push({
                                        'id_materia': carga.id_materia,
                                        'nombre_materia': carga.nombre_materia,
                                        'cargas': selected
                                    });
                                }//cierra if filtro
                            }) //cierra forEach
                        }).error(function(data) {
                            console.log('Error: ' + data);
                        });
                    } //cierra el if

                });//cierra forEach
            }).error(function(error) {
                console.log(error);
                $scope.periodos = []
            });
            /////////////////////
            //////// fin trae cargas
        }).error(function(error) {
            console.log("error periodo actual")
            console.log(error);
        });


        //funcion que se utiliza al dar click en la cabecera de un logro y muestra el logro en la ventana modal

        /**
         * @ngdoc method
         * @name showLogro
         * @methodOf  docentes.controller:docentesNotasController
         *
         * @param {Object} logro logro es de tipo objject 
         *
         * @description
         * Este metodo es el que abre el modal y muestra el logro
         *
         * 
        */
        var showLogro = function(logro) {
            var modalInstance = null;
            modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: '/views/notas/logro_modal.html',
                controller: 'showLogroController',
                size: 'sm',
                resolve: {
                    logro: function() {
                        return logro
                    }
                }
            });
        }
        
        /**
         * @ngdoc method
         * @name showActividad
         * @methodOf docentes.docentesNotasController
         * @description
         * Este metodo es el que abre el modal y muestra una 
         * actividad en dettalle
         *
         * @param {json} Va en formato JSON un objeto cabecera 
         * 
        */
        var showActividad = function(cabecera) {
                if (cabecera.tipo == 1) {
                    actividadData.findActividadById(cabecera.id).success(function(data) {
                        console.log(data);
                        var modalInstance = null;
                        modalInstance = $uibModal.open({
                            animation: true,
                            backdrop: "static",
                            templateUrl: '/views/notas/actividad_modal.html',
                            controller: 'showActividadController',
                            size: 'sm',
                            resolve: {
                                actividad: function() {
                                    return data[0]
                                }
                            }
                        });
                    }).error(function(error) {
                        console.log(error)
                    })
                } //cierra if
        }

        //funcion que se la usa cuando le da click en un tab
        /**
         * @ngdoc method
         * @name getPeriodoId
         * @methodOf docentes.docentesNotasController
         * @description
         * Este lo usamos cuando damos click en una tab (periodo), recibe el index de la posicion periodo en el array
         * $scope.periodos para poder seleccionar el periodo, y que coloque en cargas, las cargas de ese periodo
         *
         * @param {int} es el index de la tab donde damos click
         * 
        */
        var getPeriodoId = function(index) {
            $scope.periodoSeleccionado = $scope.periodos[index];
            console.log("periodo seleccionado")
                        console.log($scope.periodoSeleccionado)
            periodoData.findCargasByPeriodo($scope.periodoSeleccionado.id_periodo).success(function(data) {
               
                $scope.cargas = data;
                var encontrado = false;
                //hace la busqueda si existe la misma carga en las nuevas cargas de este periodo
                //para dejarla seleccionada con las nuevas
                data.forEach(function(materia, index) {
                    if (materia.nombre_materia == $scope.cargaSeleccionada.nombre_materia && materia.id_curso == $scope.cargaSeleccionada.id_curso) {
                        $scope.cargaSeleccionada = materia;
                        encontrado = true;
                    }

                })
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
         * @name seleccionarCarga
         * @methodOf docentes.docentesNotasController
         * @description
         * Este metodo lo usamos para traer las notas, los logros, las actividades y los estudiantes 
         * segun la carga que le mandemos
         * 
         *
         * @param {json} Va en formato JSON un objeto cabecera 
         * 
        */

        var seleccionarCarga = function(carga) {
            $scope.data_received = false;
            myutils.showWait();
            $scope.status = true;
            $scope.cabeceras = [];
            $scope.cargaSeleccionada = carga;
            $scope.estudiantes = [];
            $scope.cantidad = {};
            $scope.selected.ids_estudiantes = [];
            ///////////////////////////////////////////
            getNotasActividades(carga.id_carga_docente, function(notas_actividades) {
                    $scope.notas_actividades = notas_actividades;
                    console.log("entro a notas actividades")
                    getNotasLogros(carga.id_carga_docente, function(notas_logros) {
                            $scope.notas_logros = notas_logros;
                            console.log("no entra todavia a put")
                            console.log($scope.cabeceras)
                            getEstudiantes(carga.id_curso, function(estudiantes) {
                                    console.log("entro a estudiantes")
                                    console.log(estudiantes);
                                    $scope.estudiantes = estudiantes;
                                    for (var h = 0; h < estudiantes.length; h++) {
                                        $scope.estudiantes[h].cabeceras = []
                                    }
                                    getLogros(carga.id_carga_docente, function(logros) {
                                            console.log("entra y imprime los logros sin procesarlos");
                                            $scope.logros = logros;
                                            console.log($scope.logros)
                                                //////////
                                            console.log("va a entrar a logros")
                                            console.log(logros)
                                            getActividadesByLogros(logros, function(actividades) {
                                                $scope.logros.forEach(function(logro, index) {
                                                    selected = $filter('filter')(actividades, {
                                                        id_logro: logro.id_logro
                                                    });
                                                    console.log("este es el selected de " + logro.id_logro);
                                                    console.log(selected);
                                                    //console.log("entroa  prueba")
                                                    //logro.actividades = selected;
                                                    prueba(logro, $scope.cabeceras, $scope.estudiantes, selected, notas_actividades, function(estudiantesPrueba, cabecerasPrueba) {
                                                            console.log("ya hizo prueba")
                                                            $scope.estudiantes = estudiantesPrueba;
                                                            $scope.cabeceras = cabecerasPrueba;
                                                            estudiantesPrueba.forEach(function(estudiante, h) {
                                                                    fillNotasLogros(estudiante, logro, notas_logros, function(newEstudiante) {
                                                                        $scope.estudiantes[h] = newEstudiante;
                                                                    })
                                                                }) // cierra forEach estudianrs prueba
                                                            $scope.cabeceras.push({
                                                                'id': logro.id_logro,
                                                                'tipo': 0,
                                                                'mostrar': 'Final',
                                                                'porcentaje': logro.porcentaje_logro
                                                            });
                                                        }) //cierra prueba
                                                }); //cierra for each logros
                                                //progress
                                                myutils.hideWait();
                                            }); // cierra getActividadesByLogros
                                        }) //Cierra getLogros
                                }) //Cierra getEstudiantes
                        }) //cierra gerNotasLogros
                }) //cierra getNotasActividades
        } //CIERA FUNCION SELECIONAR CARGA

        /*
        $scope.mostrar_nota = function(id_estudiante, tipo, id) {
            //si es cero es logro
            if (tipo == 0) {
                return $scope.notas_logros[id_estudiante][id]
            } else {
                return $scope.notas_actividades[id_estudiante][id]
            }
        }*/

        /**
         * @ngdoc method
         * @name before
         * @methodOf docentes.docentesNotasController
         * @description
         * Metodo usado para obtener el valor de la nota antes de cambiarla
         * 
         *
         * @param {json} Va en formato JSON un objeto cabecera 
         * 
        */
        var before = function(cabecera) {
            //$scope.valorBefore = valor1.mostrar;
            $scope.valorBefore = cabecera.nota;
            val_before = $scope.valorBefore;

        }

        //entra cuando va a agregar una nota
        /**
         * @ngdoc method
         * @name after
         * @methodOf docentes.docentesNotasController
         * @description
         * Metodo usado para validar y mandar la nueva nota agregada por el docente
         * 
         *
         * @param {Json} Va en formato JSON un objeto Cabecera 
         * @param {Json} Va en formato JSON un objeto Estudiante
        */
        var after = function(cabecera, estudiante) {
                var valorantes = $scope.valorBefore;
                console.log("valor antes")
                console.log(val_before)
                console.log("entro a after");
                console.log(cabecera)
                var results = {};
                cabecera.nota = cabecera.nota.toString().replace(/\,/g,'.'); 
                if (isNaN(cabecera.nota)) {
                    console.log("entro a if isnan " + val_before);
                    return "Debe Ingresar un numero";
                }
                if (parseFloat(cabecera.nota) < 0 || parseFloat(cabecera.nota) > 5) {
                    console.log("entro a parseFloat ");
                    return "Debe Ingresar un numero entre 0 y 5";
                }
                if (cabecera.tipo == 0) {
                    var results = [{
                        'id_logro': cabecera.id,
                        'id_estudiante': estudiante.id_estudiante,
                        'nota_logro': parseFloat(cabecera.nota)
                    }]
                    console.log('entro al tipo = 0')
                        //si es 0 miro si esta '-' es para insertar la nota, si no es para actualizarla
                    console.log($scope.valorBefore.nota)
                    if (val_before == '-') {
                        console.log("es un logro y es para insertar");
                        console.log("va a insertar")
                        console.log(results)
                        nota_logroData.createNotasLogrosByEstudiante(results).success(function(mensaje) {
                            console.log("succes")
                            console.log(mensaje);
                            calcularNotaFinal(estudiante);
                        }).error(function(error) {
                            console.log("error")
                            console.log(error);
                            return error;
                        });
                    } else {
                        console.log("es un logro y es para actualizar");
                         nota_logroData.updateNotasLogrosByEstudiante(results[0]).success(function(mensaje) {
                            console.log(estudiante)
                            calcularNotaFinal(estudiante)
                            console.log(estudiante)
                            swal("Good job!", mensaje.msg, "success")
                            console.log(mensaje);
                        }).error(function(error) {
                            console.log(error);
                            alert("Oops... Something went wrong!");
                            return error;
                        });
                    }
                } else {
                    var results = [{
                        'id_actividad': cabecera.id,
                        'id_estudiante': estudiante.id_estudiante,
                        'nota_actividad': parseFloat(cabecera.nota)
                    }]
                    if (val_before == '-') {
                        nota_actividadData.createNotasActividadesByEstudiante(results)
                        .success(function(mensaje) {
                            console.log(mensaje);
                        }).error(function(error) {
                            console.log(error);
                            return error;
                        });
                    } else {
                        nota_actividadData.updateNotasActividadesByEstudiante(results[0])
                        .success(function(mensaje) {
                            console.log(mensaje);
                        }).error(function(error) {
                            console.log(error);
                            return error;
                        });
                    }
                }
            }
            //

/*
        var showNota = function(id_estudiante, tipo, id_nota) {
            var selected = [];
            if (tipo == 0) {
                selected = $filter('filter')($scope.notas_logros, {
                    id_estudiante: id_estudiante,
                    id_logro: id_nota
                });
                return selected.length ? selected[0].nota_logro : '-';
            } else {
                selected = $filter('filter')($scope.notas_actividades, {
                    id_estudiante: id_estudiante,
                    id_actividad: id_nota
                })
                return selected.length ? selected[0].nota_actividad : '-';
                //  return $filter('filter')($scope.notas_actividades, {id_estudiante: id_estudiante, id_actividad:id_nota})[0].nota_actividad 
            }
        }
        

        function putCabeseras(estudiantes, cabeceras, notas_logros, notas_actividades, cb) {
            console.log("apenas entra")
            console.log(cabeceras)
            for (var h = 0; h < estudiantes.length; h++) {
                (function(h) {
                    estudiantes[h].cabeceras = cabeceras;
                    for (var l = 0; l < estudiantes[h].cabeceras.length; l++) {
                        (function(l) {
                            var selected = []
                            if (cabeceras[l].tipo == 0) {
                                selected = $filter('filter')(notas_logros, {
                                    id_estudiante: estudiantes[h].id_estudiante,
                                    id_logro: estudiantes[h].cabeceras[l].id
                                });
                                console.log("seleeeecteeeed 0")
                                console.log(cabeceras)
                                console.log(estudiantes[h].id_estudiante)
                                console.log(selected[0])
                                estudiantes[h].cabeceras[l].nota = selected[0].nota_logro;
                            } else {
                                selected = $filter('filter')(notas_actividades, {
                                    id_estudiante: estudiantes[h].id_estudiante,
                                    id_actividad: estudiantes[h].cabeceras[l].id
                                })
                                console.log("seleeeecteeeed 1")
                                console.log(selected[0])
                                estudiantes[h].cabeceras[l].nota = selected[0].nota_actividad;
                            } //cierra else
                        })(l);
                    } //cierra for  cabeceras
                })(h);
            } //cierra for estuduantes
            cb(estudiantes)
        }

        
        function prueba2(logro, cabeceras, estudiantes, actividades, notas_actividades, cb) {
            // console.log("entro a getActividades este es el i " + index );
            console.log("entroa  prueba")
                //console.log(logro)
            logro.actividades = actividades;
            //  console.log($scope.logros[index].id_logro);
            //for para llenar las cabeceras segun el numero de actividades
            console.log(logro.id_logro)
            actividades.forEach(function(actividad, j) {
                console.log("entro a actividades " + j)
                fillCabecerasActvidades(cabeceras, actividad, estudiantes, notas_actividades, j, function(estudiantesNew, cabecerasNew) {
                    console.log("ya lleno cabecera actividades")
                    cabeceras = cabecerasNew;
                    estudiantes = estudiantesNew;
                });
            });
            cb(estudiantes, cabeceras);
        }

        
        $scope.getMateriasYLogros = function(materia) {
            $scope.materia_seleccionada = materia;
            getNotasYLogros($scope.materia_seleccionada, $scope.periodoSeleccionado);
        };*/
           /**
         * @ngdoc method
         * @name getActividades
         * @methodOf docentes.docentesNotasController
         * @description
         * Con el id de el logro se consulta las actividades que pertenecen a esa logro 
         * 
         * 
         *
         * @param {int} id d el logro
         * @param {Callback} Pasamos al Callback un Array de las actividades
        */
        var getActividades= function(id_logro, cb) {
            actividadData.findActividadesByLogro(id_logro).then(function(actividades) {
                cb(actividades);
                //$scope.logros = logros;
            }).catch(function(error) {
                console.log('Error: ' + error);
                cb([]);
            });
        }


        /**
         * @ngdoc method
         * @name getEstudiantes
         * @methodOf docentes.docentesNotasController
         * @description
         * Con el id del curso obtiene todos los estudiantes de ese curso
         * y entra a un callback pasando el array de estudiantes
         * 
         *
         * @param {int} id del curso 
         * @param {Callback} Pasamos al Callback un Array de estudiantes
        */
        var  getEstudiantes = function(id_curso, cb) {
            estudianteData.findEstudiantesByCurso(id_curso).success(function(est) {
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
         * @name getLogros
         * @methodOf docentes.docentesNotasController
         * @description
         * Con el id de la carga se consulta los logros que pertenecen a esa carga 
         * 
         * 
         *
         * @param {int} id de la carga 
         * @param {Callback} Pasamos al Callback un Array de los logros 
        */
        var getLogros = function (id_carga, cb) {
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
         * @name getActividadesByLogros
         * @methodOf docentes.docentesNotasController
         * @description
         * Con el id de el logro se consulta las actividades que pertenecen a esa logro 
         * 
         * 
         *
         * @param {Array} Pasamos un array de logros
         * @param {Callback} Pasamos al Callback un Array de las actividades
        */
        var getActividadesByLogros = function (logros, cb) {
            console.log(JSON.stringify(logros));
            actividadData.findActividadesByLogros(logros).success(function(actividades) {
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
         * @methodOf docentes.docentesNotasController
         * @description
         * Con el id de la carga se consulta las notas de las actividades 
         * 
         * 
         *
         * @param {int} Pasamos el id de la carga
         * @param {Callback} Pasamos al Callback un Array de las notas de las  actividades
        */
        function getNotasActividades(id_carga, cb) {
            nota_actividadData.findNotasActividadByCarga(id_carga).success(function(notas) {
                cb(notas);
                //$scope.logros = logros;
            }).error(function(error) {
                console.log('Error: ' + error);
                cb({});
            });
        }

        /**
         * @ngdoc method
         * @name getNotasLogros
         * @methodOf docentes.docentesNotasController
         * @description
         * Con el id de la carga se consulta las notas de los logros
         * 
         * 
         *
         * @param {int} Pasamos el id de el logro
         * @param {Callback} Pasamos al Callback un Array de las notas de los logros
        */
        function getNotasLogros(id_carga, cb) {
            nota_logroData.findNotasLogrosByCarga(id_carga).success(function(notas) {
                cb(notas);
                //$scope.logros = logros;
            }).error(function(error) {
                console.log('Error: ' + error);
                cb({});
            });
        }

        /**
         * @ngdoc method
         * @name fillCabecerasActividades
         * @methodOf docentes.docentesNotasController
         * @description
         * este metodo llena en todos los estudiantes las cabeceras con sus notas
         *
         * @param {Array} es el array que contiene las cabeceras
         * @param {Actividad} Pasamos en formato Json una actividad para agregrarlo a la cabecera
         * @param {Array} es el array que contiene los estudiantes para agregarle las cabeceras a cada uno
         * @param {Array} es el array que contiene notas de las actividades
         * @param {int} este entero es la posicion de la actividad en el vector
         * @param {Callback} Pasamos al Callback el array de estudiantes todos con las notas y las cabeceras
        */
        function fillCabecerasActvidades(cabeceras, actividad, estudiantes, notas_actividades, j, cb) {
            cabeceras.push({
                'id': actividad.id_actividad,
                'tipo': 1,
                'mostrar': "A" + (j + 1) + (" (" + actividad.porcentaje_actividad + "%)"),
                'porcentaje': actividad.porcentaje_actividad
            });
            estudiantes.forEach(function(estudiante, h) {
                fillNotasActividades(estudiante, actividad, notas_actividades, j, function(newEstudiante) {
                        estudiantes[h] = newEstudiante;
                    }) //cierra fillNotasActividades 
            })
            cb(estudiantes, cabeceras);
        }

        /**
         * @ngdoc method
         * @name fillCabecerasLogros
         * @methodOf docentes.docentesNotasController
         * @description
         * este metodo llena en todos los estudiantes las cabeceras con los logros
         *
         * @param {Array} es el array que contiene los estudiantes para agregarle las cabeceras a cada uno
         * @param {Logro} pasamos el Logro en formato Json que vamos a agregar a la cabecera
         * @param {Array} es el array que contiene notas de los logros
         * @param {Array} es el array que contiene las cabeceras
         * @param {Callback} Pasamos al Callback el array de estudiantes todos con las notas y las cabeceras
        */
        function fillCabecerasLogros(estudiantes, logro, notas_logros, cabeceras, cb) {
            estudiantes.forEach(function(estudiante, h) {
                //  console.log("entro al for de estudiantes despues de recorrer actividades");
                fillNotasLogros(estudiante, logro, notas_logros, function(newEstudiante) {
                    estudiantes[h] = newEstudiante;
                })
            })
            cabeceras.push({
                'id': logro.id_logro,
                'tipo': 0,
                'mostrar': 'Final',
                'porcentaje': logro.porcentaje_logro
            });
            cb(estudiantes, cabeceras)
        }



        function prueba(logro, cabeceras, estudiantes, actividades, notas_actividades, cb) {
            // console.log("entro a getActividades este es el i " + index );
            console.log("entroa  prueba")
                //console.log(logro)
            logro.actividades = actividades;
            //  console.log($scope.logros[index].id_logro);
            //for para llenar las cabeceras segun el numero de actividades
            console.log(logro.id_logro)
            actividades.forEach(function(actividad, j) {
                console.log("entro a actividades " + j)
                fillCabecerasActvidades(cabeceras, actividad, estudiantes, notas_actividades, j, function(estudiantesNew, cabecerasNew) {
                    console.log("ya lleno cabecera actividades")
                    cabeceras = cabecerasNew;
                    estudiantes = estudiantesNew;
                });
            });
            cb(estudiantes, cabeceras);
        }

        /**
         * @ngdoc method
         * @name fillNotasActividades
         * @methodOf docentes.docentesNotasController
         * @description
         * este metodo hace una busqueda en el array notas_actividades
         * buscando la nota de un estudiante especifico y una actividad especivica
         * para asignarle la nota a cada estudiante
         * 
         * @param {Estudiante} Pasamos en formato Json un estudiante para hacer la busqueda y asignarle la nota
         * @param {Actividad} Pasamos en formato Json una actividad para hacer la bsuqueda
         * @param {Array} es el array que contiene notas de las actividades
         * @param {Callback} Pasamos al Callback el nuevo estudiante con su respectiva nota
        */
        var fillNotasActividades = function(estudiante, actividad, notas_actividades, j, cb) {
            var notaEstudiante= "";
            selected = $filter('filter')(notas_actividades, {
                    id_estudiante: estudiante.id_estudiante,
                    id_actividad: actividad.id_actividad
                })
                //  console.log(selected[0])
            
            if (selected[0] == undefined) {
                notaEstudiante= "-"
            } else {
                notaEstudiante= selected[0].nota_actividad;
            }
            estudiante.cabeceras.push({
                'id': actividad.id_actividad,
                'tipo': 1,
                'mostrar': "A" + (j + 1) + (" (" + actividad.porcentaje_actividad + "%)"),
                'nota': notaEstudiante,
                'porcentaje': actividad.porcentaje_actividad
            })
            cb(estudiante)
        }
        /**
         * @ngdoc method
         * @name fillNotasLogros
         * @methodOf docentes.docentesNotasController
         * @description
         * este metodo hace una busqueda en el array notas_logros
         * buscando la nota de un estudiante especifico y un logro especifico
         * para asignarle la nota a cada estudiante
         * 
         * @param {Estudiante} Pasamos en formato Json un estudiante para hacer la busqueda y asignarle la nota
         * @param {Logro} Pasamos en formato Json un Logro para hacer la busqueda
         * @param {Array} es el array que contiene notas de los logros
         * @param {Callback} Pasamos al Callback el nuevo estudiante con su respectiva nota
        */

        function fillNotasLogros(estudiante, logro, notas_logros, cb) {
            // console.log("entro al for de estudiantes despues de recorrer actividades");
            //  $scope.estudiantes[h].cabeceras = []
            selected = $filter('filter')(notas_logros, {
                    id_estudiante: estudiante.id_estudiante,
                    id_logro: logro.id_logro
                })
                //  estudiantes[h].cabeceras[l].nota =selected[0].nota_actividad;
            var nota_a = "";
            if (selected[0] == undefined) {
                nota_a = "-"
            } else {
                nota_a = selected[0].nota_logro;
            }
            estudiante.cabeceras.push({
                'id': logro.id_logro,
                'tipo': 0,
                'mostrar': 'final',
                'nota': nota_a,
                'porcentaje': logro.porcentaje_logro
            });
            calcularNotaFinal(estudiante);
            cb(estudiante);
        }
        /**
         * @ngdoc method
         * @name delNull
         * @methodOf docentes.docentesNotasController
         *
         * @param {string} item item es un string al que queremos quitarle cuando sea un campo null
         * @description
         * este metodo mandamos un item y cuando sea null nos pone unas cadenas en vacio
         * 
         
         * @return {string} item item retorna el mismo item pero cuando es null pone ""
        */

        var delNull = function(item) {
            if (item == null) {
                return "";
            } else {
                return item;
            }
        }

        /**
         * @ngdoc method
         * @name calcularNotaFinal
         * @methodOf docentes.docentesNotasController
         * @description
         * este metodo calcula la nota final de cada estudiante en esa respectiva carga
         * 
         * @param {Estudiante} Pasamos en formato Json un estudiante para asignarle la nota final
        */
        var  calcularNotaFinal =  function(estudiante) {
            console.log(estudiante);
            selected = $filter('filter')(estudiante.cabeceras, {
                tipo: 0
            })
            console.log(selected)
            var promedio = 0;
            selected.forEach(function(logro, index) {
                if (logro.nota != "-") {
                    console.log("entro al if ")
                    console.log(logro.nota)
                    var nota = parseFloat(logro.nota);
                    var porcentaje = parseFloat(logro.porcentaje);
                    var valor = (nota * porcentaje) / 100;
                    promedio = promedio + valor;
                    console.log(promedio)
                }
            })
            estudiante.notafinal = Math.round(promedio * 100) / 100;
        }
        $scope.before=before;
        $scope.after=after;
        $scope.showLogro=showLogro;
        //$scope.showNota=showNota;
        $scope.seleccionarCarga = seleccionarCarga;
        $scope.getPeriodoId = getPeriodoId;
        $scope.open = open;
        $scope.showActividad = showActividad;

    } // body...     
})();
//---------------------------------------------------