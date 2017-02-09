(function() {
    /**
     * @ngdoc service
     * @name docentes.service: estudianteData
     * @requires $http
     * @requires CONFIG
     * @requires autentificacion
     * 
     * @description 
     * 
     * servicio que permite hacer consultas de la tabla estudiante de la base de datos
     */
    angular.module("docentes").service("estudianteData", estudianteData);
    estudianteData.$inject = ['$http', 'CONFIG', 'autenticacion'];

    function estudianteData($http, CONFIG, autenticacion) {
        var findEstudiantesByCurso = function(id_curso) {
            //  return $http.get(CONFIG.http_address + '/api/cursos/' + id_curso + '/estudiantes')
            return $http.get(CONFIG.http_address + '/api/docentes/cursos/' + id_curso + '/estudiantes', {
                headers: {
                    Authorization: 'Bearer ' + autenticacion.getToken()
                }
            })
        };
        return {
            findEstudiantesByCurso: findEstudiantesByCurso,
        };
    }
})();