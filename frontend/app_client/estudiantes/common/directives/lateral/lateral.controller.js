(function(){
    angular.module("compras").controller("navigationCtrl",navigationCtrl);

    navigationCtrl.$inject=["$location", 'autenticacion'];

    function navigationCtrl($location,autenticacion){
        
        var navvm=this;
        navvm.currentPath= $location.path();
        navvm.isLoggedIn= autenticacion.isLoggedIn();
        navvm.currentUser=autenticacion.currentUser();

        navvm.logout=function(){
            autenticacion.logout();
            $location.path('/');
        };
    }

})();