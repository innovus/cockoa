(function() {
    angular.module("docentes").service("logroData", logroData);
    logroData.$inject = ['$http', 'CONFIG','autenticacion'];

    function logroData($http, CONFIG, autenticacion) {
        var findLogrosByCarga = function(id_carga) {
            return $http.get(CONFIG.http_address + '/api/docentes/cargas/' + id_carga + '/logros',{ headers:{Authorization : 'Bearer '+CONFIG.token} })
        };
        var findLogrosByMateriaAndPeriodo = function(id_materia, id_periodo) {
            return $http.get(CONFIG.http_address + '/estudiantes/materias/' + id_materia + '/logros/periodos/' + id_periodo,{ headers:{Authorization : 'Bearer '+CONFIG.token} })
        }
        var updateDescripcionLogro = function(logro) {
            return $http({
                method: 'PUT',
                url: CONFIG.http_address + '/api/docentes/logros/descripcion',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+CONFIG.token,
                },
                data: logro
            })
        }
        var updatePorcentajesLogros = function(logros) {
            return $http({
                method: 'PUT',
                url: CONFIG.http_address + '/api/docentes/logros/porcentajes',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+CONFIG.token,
                },
                data: logros
            })
        }
        var deleteLogro = function(id_logro) {
            return $http({
                method: 'DELETE',
                url: CONFIG.http_address + '/api/docentes/logros/' + id_logro,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+CONFIG.token,
                }
            })
        }
        var createLogro = function(logro) {
            return $http({
                method: 'POST',
                url: CONFIG.http_address + '/api/docentes/logros',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+CONFIG.token,
                },
                data: logro
            })
        }
        var saveLogros = function(logrosEliminados, logros) {
            return $http({
                method: 'POST',
                url: CONFIG.http_address + '/api/docentes/logros/guardar',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+CONFIG.token,
                },
                data: {
                    logrosEliminados: logrosEliminados,
                    logros: logros
                }
            })
        }
        return {
            findLogrosByCarga: findLogrosByCarga,
            findLogrosByMateriaAndPeriodo: findLogrosByMateriaAndPeriodo,
            updateDescripcionLogro: updateDescripcionLogro,
            deleteLogro: deleteLogro,
            createLogro: createLogro,
            updatePorcentajesLogros: updatePorcentajesLogros,
            saveLogros: saveLogros,
        };
    }
})();