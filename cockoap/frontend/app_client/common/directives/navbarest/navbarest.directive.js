(function() {

     /** 
     * @ngdoc directive
     * @name docentes.directive:navbarest
     * @restrict EA
     * @description
     * 
     * Esta es una directiva para ubicar la barra superior de los estudiantes
     * 
    */
    angular.module('docentes').directive('navbarest', navbarest);

    function navbarest() {
        return {
            restrict: 'EA',
            scope: {
                content: '=content'
            },
            templateUrl: '/common/directives/navbarest/navbarest.template.html',
            controller: 'navbarestCtrl'
        };
    }
})();