(function() {
    /**
     * @ngdoc service
     * @name docentes.service: periodoData
     * @requires $http
     * @requires CONFIG
     * @requires autentificacion
     * 
     * @description 
     * 
     * servicio que permite hacer consultas de la tabla periodo de la base de datos
     */
    angular.module("docentes").service("periodoData", periodoData);
    periodoData.$inject = ['$http', 'CONFIG', 'autenticacion'];

    function periodoData($http, CONFIG, autenticacion) {
        var findPeriodoActual = function() {
            return $http.get(CONFIG.http_address + '/api/todos/periodos/actual', {
                headers: {
                    Authorization: 'Bearer ' + autenticacion.getToken()
                }
            })
        };
        var findPeriodos = function() {
            return $http.get(CONFIG.http_address + '/api/todos/periodos', {
                headers: {
                    Authorization: 'Bearer ' + autenticacion.getToken()
                }
            })
        }
        var findCargasByPeriodo = function(id_periodo) {
            return $http.get(CONFIG.http_address + '/api/docentes/cargas/periodos/' + id_periodo, {
                headers: {
                    Authorization: 'Bearer ' + autenticacion.getToken()
                }
            })
        }
        return {
            findPeriodoActual: findPeriodoActual,
            findPeriodos: findPeriodos,
            findCargasByPeriodo: findCargasByPeriodo,
        };
    }
})();