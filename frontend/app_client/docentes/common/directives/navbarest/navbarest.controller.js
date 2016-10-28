(function() {
    angular.module("docentes").controller("navbarestCtrl", navbarestCtrl);
    navbarestCtrl.$inject = ["$scope", "$location", "notificacionData", "$filter"];

    function navbarestCtrl($scope, $location, notificacionData, $filter) {
        console.log("hizo algo")
        $scope.notificaciones = [];
        $scope.cantidadNotificaciones = 0;
        $scope.notificaciones_pendientes = [];
        cargarNotificaciones();

        function cargarNotificaciones() {
            notificacionData.findNotificationByEstudiante(30011).success(function(data) {
                console.log("entro al succes")
                $scope.notificaciones = data;
                $scope.notificaciones_pendientes = $filter('filter')($scope.notificaciones, {
                    estado_notificacion: "0"
                });
                $scope.cantidadNotificaciones = $scope.notificaciones_pendientes.length
                console.log(data)
            }).error(function(error) {
                console.log(error);
            });
        }
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
                console.log(notificacion);
                console.log("entro al if")
                $location.path('/estudiantes/notas');
            } else {
                console.log(notificacion);
                console.log("entro al else")
                $location.path('/estudiantes/inasistencias');
            }
        }
        var navvm = this;
        navvm.currentPath = $location.path();
        navvm.notas = function() {
            $location.path('/notas');
        };
        navvm.inasistencias = function() {
            $location.path('/inasistencias');
        };
        navvm.logros = function() {
            $location.path('/logros');
        };
        navvm.notificaciones = function() {
            $location.path('/notificaciones');
        };
    }
})();