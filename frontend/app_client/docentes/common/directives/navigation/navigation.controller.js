(function() {
    angular.module("docentes").controller("navigationCtrl", navigationCtrl);
    navigationCtrl.$inject = ["$location", "$window", '$cookieStore', '$log', 'CONFIG'];

    function navigationCtrl($location, $window, $cookieStore, $log, CONFIG) {
        var navvm = this;
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
    }
})();