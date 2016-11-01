    /**
    * @file archivo que contiene el controlador de  waitController showLogroController, ShowActividadController y docentesNotasController el principñ
    * @name notas.controller.js
    * @author Jorge Luis Viveros <jorge.innovus@gmail.com>
    * @licence UDENAR
    * @copyright 2016 Udenar
    *
    */


(function() {
    /** 
     * @ngdoc controller
     * @name waitController
     * requires $mdDialog, $rootScope
     * @description
     * controlador que se usa para que se active un modal con un icono de cargando
     * para que el usuario no de click en algo hasta que cargen los datos por completo
     * 
     * 
     */

    angular.module('docentes').run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    }).controller('docentesNotasController', docentesNotasController)
    .controller('showLogroController', showLogroController)
    .controller('showActividadController', showActividadController)
    .controller('waitController', waitController);


    /** 
     * @ngdoc controller
     * @name waitController
     * requires $mdDialog, $rootScope
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
     * @name showLogroController
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
     * @name showActividadController
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
     * @name docentesNotasController
     * requires $scope, CONFIG, periodoData, estudianteData, actividadData,logroData, nota_actividadData,nota_logroData, $filter, uibModal, myutils
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
            console

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
                for (var i = 0; i < data.length; i++) {

                } //cierra for
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
        $scope.showLogro = function(logro) {
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
        calcularFinal = function(estudiante) {}
        $scope.showActividad = function(cabecera) {
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
            //funcion q abre ventana modal
        $scope.open = function(size, id_logro) {
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
                        }
                    }
                });
                console.log(modalInstance)
            }).error(function(error) {
                console.log(error);
            });
            console.log(modalInstance)
        };
        //funcion que se la usa cuando le da click en un tab
        $scope.getPeriodoId = function(index) {
            $scope.periodoSeleccionado = $scope.periodos[index];
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
        $scope.selectCurso = function(carga) {
            seleccionarCarga(carga);
        }

        function seleccionarCarga(carga) {
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
        $scope.mostrar_nota = function(id_estudiante, tipo, id) {
            //si es cero es logro
            if (tipo == 0) {
                return $scope.notas_logros[id_estudiante][id]
            } else {
                return $scope.notas_actividades[id_estudiante][id]
            }
        }
        $scope.before = function(cabecera) {
                //$scope.valorBefore = valor1.mostrar;
                $scope.valorBefore = cabecera.nota;
                val_before = $scope.valorBefore;
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
            //entra cuando va a agregar una nota
        $scope.after = function(cabecera, estudiante) {
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
        $scope.showNota = function(id_estudiante, tipo, id_nota) {
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

        function getEstudiantes(id_curso, cb) {
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
        $scope.getMateriasYLogros = function(materia) {
            $scope.materia_seleccionada = materia;
            getNotasYLogros($scope.materia_seleccionada, $scope.periodoSeleccionado);
        };

        function getLogros(id_carga, cb) {
            logroData.findLogrosByCarga(id_carga).success(function(logros) {
                cb(logros);
                //$scope.logros = logros;
            }).error(function(error) {
                console.log('Error: ' + error);
                cb([]);
            });
        }

        function getActividades(id_logro, cb) {
            actividadData.findActividadesByLogro(id_logro).then(function(actividades) {
                cb(actividades);
                //$scope.logros = logros;
            }).catch(function(error) {
                console.log('Error: ' + error);
                cb([]);
            });
        }

        function getActividadesByLogros(ids_logro, cb) {
            console.log(JSON.stringify(ids_logro));
            actividadData.findActividadesByLogros(ids_logro).success(function(actividades) {
                cb(actividades);
                //$scope.logros = logros;
            }).error(function(error) {
                console.log('Error: ' + error);
                cb([]);
            });
        }

        function getNotasActividades(id_carga, cb) {
            nota_actividadData.findNotasActividadByCarga(id_carga).success(function(notas) {
                cb(notas);
                //$scope.logros = logros;
            }).error(function(error) {
                console.log('Error: ' + error);
                cb({});
            });
        }

        function getNotasLogros(id_carga, cb) {
            nota_logroData.findNotasLogrosByCarga(id_carga).success(function(notas) {
                cb(notas);
                //$scope.logros = logros;
            }).error(function(error) {
                console.log('Error: ' + error);
                cb({});
            });
        }

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

        function fillNotasActividades(estudiante, actividad, notas_actividades, j, cb) {
            selected = $filter('filter')(notas_actividades, {
                    id_estudiante: estudiante.id_estudiante,
                    id_actividad: actividad.id_actividad
                })
                //  console.log(selected[0])
            var nota_a = "";
            if (selected[0] == undefined) {
                nota_a = "-"
            } else {
                nota_a = selected[0].nota_actividad;
            }
            estudiante.cabeceras.push({
                'id': actividad.id_actividad,
                'tipo': 1,
                'mostrar': "A" + (j + 1) + (" (" + actividad.porcentaje_actividad + "%)"),
                'nota': nota_a,
                'porcentaje': actividad.porcentaje_actividad
            })
            cb(estudiante)
        }

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

        function delNull(item) {
            if (item == null) {
                return "";
            } else {
                return item;
            }
        }

        function calcularNotaFinal(estudiante) {
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
    } // body...     
})();
//---------------------------------------------------