(function() {
    angular.module("docentes").service("nota_actividadData", nota_actividadData);
    nota_actividadData.$inject = ['$http', 'CONFIG','autenticacion'];

    function nota_actividadData($http, CONFIG, autenticacion) {
        var findNotasActividadByCarga = function(id_carga) {
            return $http.get(CONFIG.http_address + '/api/docentes/cargas/' + id_carga + '/logros/actividades/notas',{ headers:{Authorization : 'Bearer '+CONFIG.token} })
        };
        var findNotasActividadByEstudianteAndLogro = function() {
            return $http.get(CONFIG.http_address + '/estudiantes/actividades/notas',{ headers:{Authorization : 'Bearer '+CONFIG.token} })
        }

        var createNotasActividadesByEstudiante=function(notas){
            return $http({
                            method: 'POST',
                            url: CONFIG.http_address + '/api/docentes/actividades/notas',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization' : 'Bearer '+CONFIG.token,
                            },
                            data: notas
                        })

        }

        var updateNotasActividadesByEstudiante=function(notas){
            return $http({
                            method: 'PUT',
                            url: CONFIG.http_address + '/api/docentes/actividades/notas',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization' : 'Bearer '+CONFIG.token,
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