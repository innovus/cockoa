(function() {
    angular.module("docentes").service("materiaData", materiaData);
    materiaData.$inject = ['$http', 'CONFIG','autenticacion'];

    function materiaData($http, CONFIG, autenticacion) {
        var findMateriasByEstudiante = function() {
            return $http.get(CONFIG.http_address + '/estudiantes/materias',{ headers:{Authorization : 'Bearer '+autenticacion.getToken()} })
        };
        var findMateriasWithInasistenciaByEstudiante = function() {
            return $http.get(CONFIG.http_address + '/inasistencias/materias/',{ headers:{Authorization : 'Bearer '+autenticacion.getToken()} })
        };
        return {
            findMateriasByEstudiante: findMateriasByEstudiante,
            findMateriasWithInasistenciaByEstudiante: findMateriasWithInasistenciaByEstudiante,
        };
    }
})();