'use strict'
// Creación del módulo
var angularRoutingApp = angular.module('RoutingApp', ['ngResource']);

// Configuración de las rutas
angularRoutingApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl : '/partials/asistencia_estudiante',
            controller  : 'asistenciaController'
        })
        .when('/inasistencia', {
            templateUrl : 'estudiantes/asistencias',
            controller  : 'asistenciaController'
        })
        .when('/login', {
            templateUrl : '../views/login.ejs',
            controller  : 'loginController'
        })
        .otherwise({
            redirectTo: '/'
        });
});
/*
angularRoutingApp.controller('mainController', function($scope) {
    $scope.message = 'Hola, Mundo!';
});

angularRoutingApp.controller('aboutController', function($scope) {
    $scope.message = 'Esta es la página "Acerca de"';
});

angularRoutingApp.controller('contactController', function($scope) {
    $scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
});
*/