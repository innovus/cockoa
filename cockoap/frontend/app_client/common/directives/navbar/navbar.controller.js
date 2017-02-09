(function() {
    /** 
     * @ngdoc controller
     * @name docentes.controller:navbarCtrl  
     * @requires $scope, $location, $window, autenticacion,$cookieStore,$log
     * @description
     * 
     * Esta es una controllador para manejar la barra superior del docente
     * 
     */
    angular.module("docentes").controller("navbarCtrl", navbarestCtrl);
    navbarestCtrl.$inject = ["$scope", "$location", "$window", "autenticacion", "$cookieStore", "$log"];

    function navbarestCtrl($scope, $location, $window, autenticacion, $cookieStore, $log) {
        console.log("hizo algo")
        $scope.currentPath = $location.path();
        $scope.isLoggedIn = false;
        $scope.currentUser = null;
        $scope.rutaInicio = CONFIG.http_seguridad;
        $scope.opciones = null;
        var init = function() {
            autenticacion.isLoggedIn(function(data, error) {
                if (error) {
                    $log.log(error);
                } else if (data) {
                    $scope.currentUser = data;
                    $scope.isLoggedIn = true;
                    autenticacion.obtenerRutas().success(function(data) {
                        $log.debug(data);
                        $scope.opciones = data;
                    }).error(function(error) {
                        console.log(error);
                        $log.debug(error);
                    });
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
        init();
    }
})();