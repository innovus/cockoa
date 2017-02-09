(function() {

    /**
     * @ngdoc service
     * @name docentes.service: nota_actividadData
     * @requires $http
     * @requires CONFIG
     * @requires autentificacion
     * 
     * @description 
     * 
     * servicio que permite hacer consultas de la tabla nota_actividad de la base de datos
     */
    angular.module("docentes").service("nota_actividadData", nota_actividadData);
    nota_actividadData.$inject = ['$http', 'CONFIG', 'autenticacion'];

    function nota_actividadData($http, CONFIG, autenticacion) {
        var findNotasActividadByCarga = function(id_carga) {
            return $http.get(CONFIG.http_address + '/api/docentes/cargas/' + id_carga + '/logros/actividades/notas', {
                headers: {
                    Authorization: 'Bearer ' + autenticacion.getToken()
                }
            })
        };
        var findNotasActividadByEstudianteAndLogro = function(id_materia) {
            return $http.get(CONFIG.http_address + '/estudiantes/materias/' + id_materia + '/actividades/notas', {
                headers: {
                    Authorization: 'Bearer ' + autenticacion.getToken()
                }
            })
        }
        var createNotasActividadesByEstudiante = function(notas) {
            return $http({
                method: 'POST',
                url: CONFIG.http_address + '/api/docentes/actividades/notas',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + autenticacion.getToken(),
                },
                data: notas
            })
        }
        var updateNotasActividadesByEstudiante = function(notas) {
            return $http({
                method: 'PUT',
                url: CONFIG.http_address + '/api/docentes/actividades/notas',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + autenticacion.getToken(),
                },
                data: notas
            })
        }
        return {
            findNotasActividadByCarga: findNotasActividadByCarga,
            findNotasActividadByEstudianteAndLogro: findNotasActividadByEstudianteAndLogro,
            createNotasActividadesByEstudiante: createNotasActividadesByEstudiante,
            updateNotasActividadesByEstudiante: updateNotasActividadesByEstudiante,
        };
    }
})();