(function() {
    angular.module("docentes").service("actividadData", actividadData);
    actividadData.$inject = ['$http', '$q', 'CONFIG','autenticacion'];

    function actividadData($http, $q, CONFIG, autenticacion) {
        var findActividadesByLogro = function(id_logro) {
            return $http.get(CONFIG.http_address + '/api/docentes/logros/' + id_logro + '/actividades/',{ headers:{Authorization : 'Bearer '+CONFIG.token} })
        };
        var findActividadById = function(id_actividad) {
            return $http.get(CONFIG.http_address + '/api/docentes/actividades/' + id_actividad,{ headers:{Authorization : 'Bearer '+CONFIG.token} })
        };
        var findActividadesByLogros = function(ids_logro) {
            console.log("entro al service")
            console.log(ids_logro)
            var envio = $http({
                method: 'POST',
                url: CONFIG.http_address + '/api/docentes/logros/actividades/',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+CONFIG.token,
                },
                data: ids_logro
            })
            console.log(envio);
            return envio
        };
        var updatePorcentajes = function(porcentajes) {
            return $http({
                method: 'PUT',
                url: CONFIG.http_address + '/api/docentes/actividades/porcentajes',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+CONFIG.token,
                },
                data: porcentajes
            })
        }
        var updateDescripcion = function(actividad) {
            return $http({
                method: 'PUT',
                url: CONFIG.http_address + '/api/docentes/actividades/descripcion',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+CONFIG.token,
                },
                data: actividad
            })
        }
        var createActividad = function(actividad) {
            return $http({
                method: 'POST',
                url: CONFIG.http_address + '/api/docentes/actividades',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+CONFIG.token,
                },
                data: actividad
            })
        }
        var deleteActividad = function(id_actividad) {
            return $http({
                method: 'DELETE',
                url: CONFIG.http_address + '/api/docentes/actividades/' + id_actividad,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+CONFIG.token,
                }
            })
        }
        var saveActividades = function(actividadesEliminadas, actividades) {
            return $http({
                method: 'POST',
                url: CONFIG.http_address + '/api/docentes/actividades/guardar',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+CONFIG.token,
                },
                data: {
                    actividadesEliminadas: actividadesEliminadas,
                    actividades: actividades
                }
            })
        }
        return {
            findActividadesByLogro: findActividadesByLogro,
            updatePorcentajes: updatePorcentajes,
            updateDescripcion: updateDescripcion,
            createActividad: createActividad,
            findActividadesByLogros: findActividadesByLogros,
            deleteActividad: deleteActividad,
            findActividadById: findActividadById,
            saveActividades: saveActividades,
        };
    }
})();