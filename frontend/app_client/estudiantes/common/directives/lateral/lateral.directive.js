(function () {
  angular
    .module('estudiantes')
    .directive('lateral', lateral);
    function lateral(){
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/navigation/lateral.template.html',
            controller: 'materiasController'
        };
    }
})();
