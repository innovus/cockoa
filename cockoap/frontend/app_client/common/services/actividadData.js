(function() {
    /**
     * @ngdoc service
     * @name docentes.service: actividadData
     * @requires $http
     * @requires $q
     * @requires CONFIG
     * @requires autentificacion
     * 
     * @description 
     * 
     * servicio que permite hacer consultas de la tabla actividad de la base de datos
     */
    angular.module("docentes").service("actividadData", actividadData);
    actividadData.$inject = ['$http', '$q', 'CONFIG', 'autenticacion'];

    function actividadData($http, $q, CONFIG, autenticacion) {
        var findActividadesByLogro = function(id_logro) {
            return $http.get(CONFIG.http_address + '/api/docentes/logros/' + id_logro + '/actividades/', {
                headers: {
                    Authorization: 'Bearer ' + autenticacion.getToken()
                }
            })
        };
        var findActividadById = function(id_actividad) {
            return $http.get(CONFIG.http_address + '/api/docentes/actividades/' + id_actividad, {
                headers: {
                    Authorization: 'Bearer ' + autenticacion.getToken()
                }
            })
        };
        var findActividadesByLogros = function(ids_logro) {
            console.log("entro al service")
            console.log(ids_logro)
            var envio = $http({
                method: 'POST',
                url: CONFIG.http_address + '/api/docentes/logros/actividades/',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + autenticacion.getToken(),
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
                    'Authorization': 'Bearer ' + autenticacion.getToken(),
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
                    'Authorization': 'Bearer ' + autenticacion.getToken(),
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
                    'Authorization': 'Bearer ' + autenticacion.getToken(),
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
                    'Authorization': 'Bearer ' + autenticacion.getToken(),
                }
            })
        }
        var saveActividades = function(actividadesEliminadas, actividades) {
            return $http({
                method: 'POST',
                url: CONFIG.http_address + '/api/docentes/actividades/guardar',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + autenticacion.getToken(),
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