(function() {
    /** 
     * @ngdoc controller
     * @name docentes.controller:navbarestCtrl  
     * @requires $scope, $location, notificacionData,$filter, $window, autenticacion,$cookieStore,$log, CONFIG
     * @description
     * 
     * Esta es una controllador para manejar la barra superior del ESTUDIANTE
     * 
     */
    angular.module("docentes").controller("navbarestCtrl", navbarestCtrl);
    navbarestCtrl.$inject = ["$rootScope", "$scope", "$location", "notificacionData", "$filter", "$window", "autenticacion", "$cookieStore", "$log", "CONFIG"];

    function navbarestCtrl($rootScope, $scope, $location, notificacionData, $filter, $window, autenticacion, $cookieStore, $log, CONFIG) {
        console.log("hizo algo")
        $rootScope.ruta = null;
        $scope.notificaciones = [];
        $scope.cantidadNotificaciones = 0;
        $scope.notificacionesPendientes = [];
        $scope.currentPath = $location.path();
        $scope.isLoggedIn = false;
        $scope.currentUser = null;
        $scope.perfil = null;
        $scope.rutaInicio = CONFIG.http_seguridad;
        $rootScope.opciones = null;
        $scope.opciones = null;
        cargarNotificaciones();
        var init = function() {
            autenticacion.isLoggedIn(function(data, error) {
                if (error) {
                    $log.log(error);
                } else if (data) {
                    $scope.currentUser = data;
                    console.log("q pasa")
                    autenticacion.obtenerRutas().success(function(data) {
                        $log.debug(data);
                        $rootScope.opciones = data;
                        $scope.opciones = data;

                    }).error(function(error) {
                        console.log(error);
                        $log.debug(error);
                    });
                    autenticacion.getPerfil().success(function(perfil) {
                        $scope.perfil = perfil;
                        $rootScope.perfil = perfil;
                        $rootScope.perfil.primer_nombre = $scope.currentUser.primer_nombre;
                        $rootScope.perfil.primer_apellido = $scope.currentUser.primer_apellido;
                        $rootScope.perfil.numero_documento = $scope.currentUser.numero_documento;
                        console.log("este es perfil")
                        console.log(perfil)
                        $scope.isLoggedIn = true;
                        console.log("no entreo nunca")
                    }).error(function(err) {
                        console.log("este es error del perfil")
                        console.log(err)
                        $log.log(error);
                    })
                }
            });
        };
        $scope.logout = function() {
            autenticacion.logout().success(function(data) {
                if ($cookieStore.get("udenar")) {
                    $cookieStore.remove("udenar");
                } else {
                    console.log("no existe la cookie");
                }
                $window.location = "http://localhost:4000";
            }).error(function(data) {
                alert("hubo un error en la cerrada  de la sesion");
            });
        };
        /** 
         * @ngdoc method
         * @name cargarNotificaciones
         * @methodOf docentes.controller:navbarestCtrl  
         * @description
         * 
         * Este metodo consulta  las notificaciones que tiene el estudiante
         * y la cantidad de notificaciones pendientes
         * 
         */
        function cargarNotificaciones() {
            notificacionData.findNotificationByEstudiante().success(function(data) {
                console.log("entro al succes")
                $scope.notificaciones = data;
                $scope.notificacionesPendientes = $filter('filter')($scope.notificaciones, {
                    estado_notificacion: "0"
                });
                $scope.cantidadNotificaciones = $scope.notificacionesPendientes.length
                console.log(data)
            }).error(function(error) {
                console.log(error);
            });
        }
        /** 
         * @ngdoc method
         * @name clickNotificacion
         * @methodOf docentes.controller:navbarestCtrl  
         * @param {Object} notificacion notificacion es un objeto donde tiene todos los datos de una notificacion
         *
         * @description
         * 
         * Este metodo se lo usa para que cuando un estudiante de click en una notificacion pendiente
         * se cambie el estado y la proxima vez salga 
         * 
         */
        $scope.clickNotificacion = function(notificacion) {
            if (notificacion.estado_notificacion == "0") {
                notificacionData.updateEstadoNotificacion(notificacion.id_notificacion).success(function(data) {
                    console.log("success")
                    console.log(data)
                }).error(function(error) {
                    console.log(error);
                });
                cargarNotificaciones();
            }
            if (notificacion.id_tipo_notificacion == 2) {
               
                $rootScope.notificacion = notificacion;
                $rootScope.ruta = "notas";
                $location.path('/estudiantes/notas');
            } else {
                console.log(notificacion);
                console.log("entro al else")
                $rootScope.notificacion = notificacion;
                $rootScope.ruta = "inasistencias";
                $location.path('/estudiantes/inasistencias');
            }
        }
        init();
    }
})();