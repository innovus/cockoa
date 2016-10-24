(function(){

    angular
      .module("docentes")
      .service("notificacionData", notificacionData);
    notificacionData.$inject=['$http','CONFIG'];
    function notificacionData($http,CONFIG){

        var findNotificationByEstudiante= function(id_estudiante){
            return $http({
                method: 'POST',
                url: CONFIG.http_address+'/estudiantes/notificaciones',
                headers:{
                    'Content-Type':'application/json'
                },
                data: {"id_estudiante": id_estudiante}
            })
           
        };
        var findNotificacionesPendientesByEstudiante= function(id_estudiante){
            return $http({
                method: 'POST',
                url: CONFIG.http_address+'/estudiantes/notificaciones/pendientes',
                headers:{
                    'Content-Type':'application/json'
                },
                data: {'id_estudiante': id_estudiante}
            })
           
        };

         var findTiposNotificaciones= function(){
            return $http({
                method: 'GET',
                url: CONFIG.http_address+'/estudiantes/tipos_notificaciones',
            })
           
        }; 
          var updateEstadoNotificacion= function(id_notificacion){
            return $http({
                method: 'PUT',
                url: CONFIG.http_address+'/estudiantes/notificaciones/estado',
                headers:{
                    'Content-Type':'application/json'
                },
                data: {'id_notificacion': id_notificacion}
            })
           
        };     
        return {
            findNotificationByEstudiante:findNotificationByEstudiante,
            findTiposNotificaciones:findTiposNotificaciones,
            findNotificacionesPendientesByEstudiante:findNotificacionesPendientesByEstudiante,
            updateEstadoNotificacion: updateEstadoNotificacion
        };
    }
})();
//1052