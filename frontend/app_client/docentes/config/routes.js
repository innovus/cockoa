(function(){
    angular
    .module('docentes')
    .config(config);
    
    config.$inject=['$routeProvider','$locationProvider'];
    function config($routeProvider, $locationProvider){
        $routeProvider
        
        .when("/docentes/notas",{
            templateUrl: "/views/notas/notas.html",
            controller: "docentes_notasController"
        })
        .when("/docentes/logros",{
            templateUrl: "/views/logros/crud_logros.html",
            controller: "crudLogrosController"
        })
        .when("/docentes/inasistencias",{
            templateUrl: "/views/inasistencia/inasistencia.html",
            controller: "inasistenciaController"
        })
        .when("/estudiantes/notas",{
            templateUrl: "/views/estudiantes/notas/notas.html",
            controller: "estudiantes_notasController"
        })
        .when("/estudiantes/inasistencias",{
            templateUrl: "/views/estudiantes/inasistencia/inasistencia.html",
            controller: "inasistenciaEstudianteController"
        }).when("/estudiantes/ejemplo",{
            templateUrl: "/views/ejemplo/ejemplo.template.html",
            controller: "ejemploCtrl"

        })

        

        
        .otherwise({redirectTo:"/docentes/notas"});

        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
    }
})();