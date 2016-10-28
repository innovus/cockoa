(function() {
    angular.module("docentes").controller("navbarCtrl", navbarCtrl);
    navigationCtrl.$inject = ["$location"];

    function navbarCtrl($location) {
        var navvm = this;
        navvm.currentPath = $location.path();
        navvm.notas = function() {
            $location.path('/docentes/notas');
        };
        navvm.inasistencias = function() {
            $location.path('/docentes/inasistencias');
        };
        navvm.logros = function() {
            $location.path('/docentes/logros');
        };
    }
})();