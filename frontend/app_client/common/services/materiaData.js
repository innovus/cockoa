(function() {
    angular.module("docentes").service("materiaData", materiaData);
    materiaData.$inject = ['$http', 'CONFIG'];

    function materiaData($http, CONFIG) {
        var findMateriasByEstudiante = function() {
            return $http.get(CONFIG.http_address + '/estudiantes/materias')
        };
        var findMateriasWithInasistenciaByEstudiante = function() {
            return $http.get(CONFIG.http_address + '/inasistencias/materias/')
        };
        return {
            findMateriasByEstudiante: findMateriasByEstudiante,
            findMateriasWithInasistenciaByEstudiante: findMateriasWithInasistenciaByEstudiante,
        };
    }
})();