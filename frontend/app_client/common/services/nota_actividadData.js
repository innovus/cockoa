(function() {
    angular.module("docentes").service("nota_actividadData", nota_actividadData);
    nota_actividadData.$inject = ['$http', 'CONFIG'];

    function nota_actividadData($http, CONFIG) {
        var findNotasActividadByCarga = function(id_carga) {
            return $http.get(CONFIG.http_address + '/api/docentes/cargas/' + id_carga + '/logros/actividades/notas')
        };
        var findNotasActividadByEstudianteAndLogro = function() {
            return $http.get(CONFIG.http_address + '/estudiantes/actividades/notas')
        }

        var createNotasActividadesByEstudiante=function(notas){
            return $http({
                            method: 'POST',
                            url: CONFIG.http_address + '/api/docentes/actividades/notas',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: notas
                        })

        }

        var updateNotasActividadesByEstudiante=function(notas){
            return $http({
                            method: 'PUT',
                            url: CONFIG.http_address + '/api/docentes/actividades/notas',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: notas
                        })

        }
        return {
            findNotasActividadByCarga: findNotasActividadByCarga,
            findNotasActividadByEstudianteAndLogro: findNotasActividadByEstudianteAndLogro,
            createNotasActividadesByEstudiante: createNotasActividadesByEstudiante,
            updateNotasActividadesByEstudiante:updateNotasActividadesByEstudiante,
        };
    }
})();