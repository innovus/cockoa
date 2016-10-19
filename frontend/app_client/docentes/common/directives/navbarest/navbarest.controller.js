(function(){
    angular.module("docentes").controller("navbarestCtrl",navbarestCtrl);

    navbarestCtrl.$inject=["$scope","$location","notificacionData","$filter"];


    function navbarestCtrl($scope,$location,notificacionData,$filter){
        console.log("hizo algo")

        $scope.notificaciones = [];
        $scope.cantidadNotificaciones = 0;
        $scope.notificaciones_pendientes = [];

        notificacionData.findNotificationByEstudiante(30011)
            .success(function(data){
                console.log("entro al succes")
                $scope.notificaciones = data;
                $scope.notificaciones_pendientes = $filter('filter')($scope.notificaciones, {estado_notificacion: "0"});
                $scope.cantidadNotificaciones = $scope.notificaciones_pendientes.length
                
                console.log(data)
            }).error(function(error){
                console.log(error);
            });

        var navvm=this;
        navvm.currentPath= $location.path();
      
        navvm.notas=function(){
            
            $location.path('/notas');
        };
        navvm.inasistencias=function(){
            
            $location.path('/inasistencias');
        };
        navvm.logros=function(){
            
            $location.path('/logros');
        };
        


    }

})();