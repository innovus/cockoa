(function() {
    angular.module("docentes").controller("navigationCtrl", navigationCtrl);
    navigationCtrl.$inject = ["$scope","$location", "$window", "autenticacion",'$cookieStore', '$log', 'CONFIG'];

    function navigationCtrl($scope,$location, $window, autenticacion,$cookieStore, $log, CONFIG) {
       /* var navvm = this;
        navvm.currentPath = $location.path();
        navvm.isLoggedIn = false;
        navvm.currentUser = null;
        navvm.rutaInicio = CONFIG.http_seguridad;
        navvm.opciones = null;
        navvm.primer_nombre = "Jorge";
        navvm.primer_apellido = "Viveros"
        navvm.numero_documento = "1085292951"
            /*navvm.tienehijos= function(opcion){
               var bandera= false; 
               if(opcion.hijos){
                   if(opcion.hijos.length>0){
                       bandera=true;
                   }
               }
               return bandera;
            };*/

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


        init();
    }
})();