(function() {
    /**
     * @ngdoc service
     * @name docentes.service: notificacionData
     * @requires $http
     * @requires CONFIG
     * @requires autentificacion
     * 
     * @description 
     * 
     * servicio que permite hacer consultas de la tabla notificacion de la base de datos
     */
    angular.module("docentes").service("notificacionData", notificacionData);
    notificacionData.$inject = ['$http', 'CONFIG', 'autenticacion'];

    function notificacionData($http, CONFIG, autenticacion) {
        var findNotificationByEstudiante = function() {
            return $http({
                method: 'GET',
                url: CONFIG.http_address + '/estudiantes/notificaciones',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + autenticacion.getToken(),
                }
            })
        };
        var findNotificacionesPendientesByEstudiante = function(id_estudiante) {
            return $http({
                method: 'GET',
                url: CONFIG.http_address + '/estudiantes/notificaciones/pendientes',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + autenticacion.getToken(),
                }
            })
        };
        var findTiposNotificaciones = function() {
            return $http({
                method: 'GET',
                url: CONFIG.http_address + '/estudiantes/tipos_notificaciones',
            })
        };
        var updateEstadoNotificacion = function(id_notificacion) {
            return $http({
                method: 'PUT',
                url: CONFIG.http_address + '/estudiantes/notificaciones/estado',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + autenticacion.getToken(),
                },
                data: {
                    'id_notificacion': id_notificacion
                }
            })
        };
        return {
            findNotificationByEstudiante: findNotificationByEstudiante,
            findTiposNotificaciones: findTiposNotificaciones,
            findNotificacionesPendientesByEstudiante: findNotificacionesPendientesByEstudiante,
            updateEstadoNotificacion: updateEstadoNotificacion
        };
    }
})();
//1052