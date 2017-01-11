(function() {
    angular.module("docentes").service("nota_logroData", nota_logroData);
    nota_logroData.$inject = ['$http', 'CONFIG','autenticacion'];

    function nota_logroData($http, CONFIG, autenticacion) {
        var findNotasLogrosByCarga = function(id_carga) {
            return $http.get(CONFIG.http_address + '/api/docentes/cargas/' + id_carga + '/logros/notas',{ headers:{Authorization : 'Bearer '+CONFIG.token} })
        };
        var findNotasLogrosByMateriaAndPeriodo = function(id_materia, id_periodo) {
            return $http.get(CONFIG.http_address + '/estudiantes/materias/' + id_materia + '/notas/periodos/' + id_periodo,{ headers:{Authorization : 'Bearer '+CONFIG.token} })
        }
        var createNotasLogrosByEstudiante=function(notas){
            return $http({
                            method: 'POST',
                            url: CONFIG.http_address + '/api/docentes/logros/notas',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization' : 'Bearer '+CONFIG.token 
                            },
                            data: notas
                        })

        }

        var updateNotasLogrosByEstudiante=function(notas){
            return $http({
                            method: 'PUT',
                            url: CONFIG.http_address + '/api/docentes/logros/notas',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization' : 'Bearer '+CONFIG.token,
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