(function() {
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