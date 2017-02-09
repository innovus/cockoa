(function() {

     /** 
     * @ngdoc directive
     * @name docentes.directive:navbar
     * @restrict EA
     * @description
     * 
     * Esta es una directiva para ubicar la barra superior de los docentes
     * 
    */
    angular.module('docentes').directive('navbar', navbar);

    function navbar() {
        return {
            restrict: 'EA',
            scope: {
                content: '=content'
            },
            templateUrl: '/common/directives/navbar/navbar.template.html',
            controller: 'navbarCtrl'
        };
    }
})();