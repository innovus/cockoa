(function() {
    angular.module("docentes").controller("navbarestCtrl", navbarestCtrl);
    navbarestCtrl.$inject = ["$scope", "$location", "notificacionData", "$filter","$window", "autenticacion","$cookieStore","$log","CONFIG"];

    function navbarestCtrl($scope, $location, notificacionData, $filter,$window, autenticacion,$cookieStore,$log, CONFIG) {
        console.log("hizo algo")
        $scope.notificaciones = [];
        $scope.cantidadNotificaciones = 0;
        $scope.notificaciones_pendientes = [];
        cargarNotificaciones();



        $scope.currentPath= $location.path();
        $scope.isLoggedIn= false;
        $scope.currentUser=null;
        $scope.rutaInicio=CONFIG.http_seguridad;
        $scope.opciones=null;


        var init= function(){
            
            autenticacion.isLoggedIn(function(data,error){
                if(error){
                    $log.log(error);
                }
                else if(data){
                    $scope.currentUser=data;
                    $scope.isLoggedIn=true;
                    autenticacion.obtenerRutas().success(function(data){
                         $log.debug(data);
                         $scope.opciones=data;
                    }).error(function(error){
                         console.log(error);
                         $log.debug(error);   
                    });
                }    
            });
        };

        $scope.logout=function(){
            autenticacion.logout().success(function(data){
                if($cookieStore.get("udenar")){
                  $cookieStore.remove("udenar");
                }
                else{
                    console.log("no existe la cookie");
                }
                $window.location="http://localhost:4000";
            }).error(function(data){
                alert("hubo un error en la cerrada  de la sesion");    
            });     
        };


        function cargarNotificaciones() {
            notificacionData.findNotificationByEstudiante(30011).success(function(data) {
                console.log("entro al succes")
                $scope.notificaciones = data;
                $scope.notificaciones_pendientes = $filter('filter')($scope.notificaciones, {
                    estado_notificacion: "0"
                });
                $scope.cantidadNotificaciones = $scope.notificaciones_pendientes.length
                console.log(data)
            }).error(function(error) {
                console.log(error);
            });
        }
        $scope.clickNotificacion = function(notificacion) {
            if (notificacion.estado_notificacion == "0") {
                notificacionData.updateEstadoNotificacion(notificacion.id_notificacion).success(function(data) {
                    console.log("success")
                    console.log(data)
                }).error(function(error) {
                    console.log(error);
                });
                cargarNotificaciones();
            }
            if (notificacion.id_tipo_notificacion == 2) {
                console.log(notificacion);
                console.log("entro al if")
                $location.path('/estudiantes/notas');
            } else {
                console.log(notificacion);
                console.log("entro al else")
                $location.path('/estudiantes/inasistencias');
            }
        }
        init();
    }
})();