(function() {
    angular.module("docentes").service("inasistenciaData", inasistenciaData);
    inasistenciaData.$inject = ['$http', 'CONFIG','autenticacion'];

    function inasistenciaData($http, CONFIG, autenticacion) {
        var findInasistenciasByCargaAndEstudiante = function(id_carga, id_estudiante) {
            return $http.get(CONFIG.http_address + '/inasistencias/cargas/' + id_carga + '/estudiantes/' + id_estudiante,{ headers:{Authorization : 'Bearer '+autenticacion.getToken()} })
        };
        var findInasistenciasByCarga = function(id_carga) {
            return $http.get(CONFIG.http_address + '/inasistencias/cargas/' + id_carga,{ headers:{Authorization : 'Bearer '+autenticacion.getToken()} })
        };
        var createInasistenciasEstudiantes = function(jsonenviar) {
            return $http.post(CONFIG.http_address + "/inasistencias/inasistencia", jsonenviar,{ headers:{Authorization : 'Bearer '+autenticacion.getToken()} })
        };
        var findInasistenciasByMateria = function(id_materia) {
            return $http.get(CONFIG.http_address + '/inasistencias/materias/' + id_materia,{ headers:{Authorization : 'Bearer '+autenticacion.getToken()} })
        }

        var findInasistenciasEstudianteByCarga = function(id_carga){
            return $http.get(CONFIG.http_address + '/inasistencias/estudiante/carga/' + id_carga,{ headers:{Authorization : 'Bearer '+autenticacion.getToken()} })

        } 
        var updateEstadoInasistencia = function(inasistencia) {
            return $http({
                method: 'PUT',
                url: CONFIG.http_address + '/inasistencias/estado',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+autenticacion.getToken(),
                },
                data: inasistencia
            })
        }
        return {
            findInasistenciasByCargaAndEstudiante: findInasistenciasByCargaAndEstudiante,
            createInasistenciasEstudiantes: createInasistenciasEstudiantes,
            findInasistenciasByCarga: findInasistenciasByCarga,
            findInasistenciasByMateria: findInasistenciasByMateria,
            updateEstadoInasistencia: updateEstadoInasistencia,
            findInasistenciasEstudianteByCarga: findInasistenciasEstudianteByCarga,
        };
    }
})();