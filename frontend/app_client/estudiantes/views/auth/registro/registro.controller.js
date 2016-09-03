(function(){
   angular
   .module("compras")
   .controller("registroCtrl",registroCtrl);

   registroCtrl.$inject=['$location','autenticacion','$scope'];
   function registroCtrl($location,autenticacion,$scope){
        $scope.pageHeader="Registrar usuario";

        $scope.credenciales={
            nombre:"",
            apellido:"",
            usuario:"",
            num_documento:"",
            password:""
        };

        $scope.returnPage=$location.search().page || "/home";

        $scope.onSubmit= function(){
            $scope.formError = "";
            if(!$scope.credenciales.nombre || !$scope.credenciales.apellido || !$scope.credenciales.usuario || !$scope.credenciales.num_documento || !$scope.credenciales.password){
                $scope.formError= "Todos los campos son requeridos :(";
                return false;
            }
            else{
                $scope.doRegister();
            }

        }

        $scope.doRegister= function(){
            $scope.formError="";
            autenticacion.register($scope.credenciales)
            .error(function(error){
                formError=error;
            })
            .then(function(){
                $location.search('page',null);
                $location.path($scope.returnPage);
            })
        }
   } 
})();