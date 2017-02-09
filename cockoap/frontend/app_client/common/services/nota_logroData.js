(function() {

    /**
     * @ngdoc service
     * @name docentes.service: nota_logroData
     * @requires $http
     * @requires CONFIG
     * @requires autentificacion
     * 
     * @description 
     * 
     * servicio que permite hacer consultas de la tabla nota_logro de la base de datos
     */
    angular.module("docentes").service("nota_logroData", nota_logroData);
    nota_logroData.$inject = ['$http', 'CONFIG', 'autenticacion'];

    function nota_logroData($http, CONFIG, autenticacion) {
        var findNotasLogrosByCarga = function(id_carga) {
            return $http.get(CONFIG.http_address + '/api/docentes/cargas/' + id_carga + '/logros/notas', {
                headers: {
                    Authorization: 'Bearer ' + autenticacion.getToken()
                }
            })
        };
        var findNotasLogrosByMateriaAndPeriodo = function(id_materia, id_periodo) {
            return $http.get(CONFIG.http_address + '/estudiantes/materias/' + id_materia + '/notas/periodos/' + id_periodo, {
                headers: {
                    Authorization: 'Bearer ' + autenticacion.getToken()
                }
            })
        }
        var createNotasLogrosByEstudiante = function(notas) {
            return $http({
                method: 'POST',
                url: CONFIG.http_address + '/api/docentes/logros/notas',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + autenticacion.getToken()
                },
                data: notas
            })
        }
        var updateNotasLogrosByEstudiante = function(notas) {
            return $http({
                method: 'PUT',
                url: CONFIG.http_address + '/api/docentes/logros/notas',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + autenticacion.getToken(),
                },
                data: notas
            })
        }
        return {
            findNotasLogrosByCarga: findNotasLogrosByCarga,
            findNotasLogrosByMateriaAndPeriodo: findNotasLogrosByMateriaAndPeriodo,
            createNotasLogrosByEstudiante: createNotasLogrosByEstudiante,
            updateNotasLogrosByEstudiante: updateNotasLogrosByEstudiante
        };
    }
})();