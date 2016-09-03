(function(){
    angular
    .module("compras")
    .controller("loginCtrl",loginCtrl);

    loginCtrl.$inject= ["$scope", "autenticacion","$location"];
    function loginCtrl($scope,autenticacion,$location){
        
        $scope.formError="";

        $scope.pageHeader={
            title:"Login compras"
        };
        
        $scope.credenciales={
            usuario:"",
            password:""
        };

        $scope.returnPage=$location.search().page || '/home'; 

        $scope.onSubmit= function(){

            
            if(!$scope.credenciales.usuario || !$scope.credenciales.password){
                $scope.formError="Los datos no estan completos";
                return false;
            }    
            else{
                $scope.doLogin();
            }
        }
        
        $scope.doLogin= function(){
            $scope.formError="";
            autenticacion.login($scope.credenciales).error(function(error){
                $scope.formError = error;      
            }).then(function(){
                $location.search("page", null);
                $location.path( $scope.returnPage);
            });
        }
    } 

})();