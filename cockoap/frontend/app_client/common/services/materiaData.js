(function() {
    /**
     * @ngdoc service
     * @name docentes.service: materiaData
     * @requires $http
     * @requires CONFIG
     * @requires autentificacion
     * 
     * @description 
     * 
     * servicio que permite hacer consultas de la tabla materia de la base de datos
     */
    angular.module("docentes").service("materiaData", materiaData);
    materiaData.$inject = ['$http', 'CONFIG', 'autenticacion'];

    function materiaData($http, CONFIG, autenticacion) {
        var findMateriasByEstudiante = function() {
            return $http.get(CONFIG.http_address + '/estudiantes/materias', {
                headers: {
                    Authorization: 'Bearer ' + autenticacion.getToken()
                }
            })
        };
        var findMateriasWithInasistenciaByEstudiante = function() {
            return $http.get(CONFIG.http_address + '/inasistencias/materias/', {
                headers: {
                    Authorization: 'Bearer ' + autenticacion.getToken()
                }
            })
        };
        var findMateriasByActividad = function(id_actividad) {
            return $http.get(CONFIG.http_address + '/estudiantes/actividad/nota/' + id_actividad, {
                headers: {
                    Authorization: 'Bearer ' + autenticacion.getToken()
                }
            })
        }
        return {
            findMateriasByEstudiante: findMateriasByEstudiante,
            findMateriasWithInasistenciaByEstudiante: findMateriasWithInasistenciaByEstudiante,
            findMateriasByActividad: findMateriasByActividad,
        };
    }
})();