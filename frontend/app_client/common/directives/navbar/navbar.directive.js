(function() {
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