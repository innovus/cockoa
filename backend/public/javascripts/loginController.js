(function () {
    'use strict';

     var app = angular.module('login', ['ui.bootstrap']);//creamos el modulo pokedex y le pasamos array con las dependencias
     app.controller('AsistenciaController',function($scope,$http ,$window){

            // Cuando se añade un nuevo TODO, manda el texto a la API
    $scope.createTodo = function(){
        $http.post('/auth/loginn', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                $http.post('../', data).success(function(data){
                    $window.location.href = '../'
                    
                }).error(function(data){
                    console.log(data);

                })
                
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
    $scope.ShowForm = function(){
        $scope.formVisibility=true;
        console.log($scope.formVisibility)
    }


     }) 


 
})();