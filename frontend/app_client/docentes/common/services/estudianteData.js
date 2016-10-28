(function() {
    angular.module("docentes").service("estudianteData", estudianteData);
    estudianteData.$inject = ['$http', 'CONFIG'];

    function estudianteData($http, CONFIG) {
        var findEstudiantesByCurso = function(id_curso) {
            return $http.get(CONFIG.http_address + '/api/cursos/' + id_curso + '/estudiantes')
        };
        return {
            findEstudiantesByCurso: findEstudiantesByCurso,
        };
    }
})();