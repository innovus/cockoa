(function(){
    angular.module("docentes").controller("navbarCtrl",navbarCtrl);

    navigationCtrl.$inject=["$location"];

    function navbarCtrl($location){
        
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