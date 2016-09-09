(function(){
    angular
    .module('docentes')
    .config(config);
    
    config.$inject=['$routeProvider','$locationProvider'];
    function config($routeProvider, $locationProvider){
        $routeProvider
        
        .when("/notas",{
            templateUrl: "/views/notas/notas.html",
            controller: "docentes_notasController"
        })
        .when("/logros",{
            templateUrl: "/views/logros/crud_logros.html",
            controller: "crudLogrosController"
        })
        .when("/inasistencias",{
            templateUrl: "/views/inasistencia/inasistencia.html",
            controller: "inasistenciaController"
        })
        

        
        .otherwise({redirectTo:"/notas"});

        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
    }
})();