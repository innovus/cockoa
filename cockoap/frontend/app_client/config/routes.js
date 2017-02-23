(function(){
    angular
    .module('docentes')
    .config(config);
    
    config.$inject=['$routeProvider','$locationProvider'];
    function config($routeProvider, $locationProvider){
        $routeProvider
        .when("/docentes/notas",{
            templateUrl: "/views/notas/notas.html",
            controller: "docentesNotasController"
        })
        .when("/docentes/notasactividades",{
            templateUrl: "/views/notasactividades/notasactividades.html",
            controller: "docentes_notasActividadesController"
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

        }).when("/estudiantes/notificaciones",{
            templateUrl: "/views/estudiantes/notificaciones/notificaciones.html",
            controller: "notificacionesController"

        });

        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
    }
})();