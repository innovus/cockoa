(function () {
    'use strict';

     var app = angular.module('login', ['ui.bootstrap','ngCookies']);//creamos el modulo pokedex y le pasamos array con las dependencias
     app.controller('loginController',['$scope','$cookieStore','$http','$window','$cookies',function($scope, $cookieStore,$http ,$window,$cookies){

            // Cuando se añade un nuevo TODO, manda el texto a la API
    $scope.createTodo = function(){
        $http.post('/auth/loginn', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                $cookies.accessToken = $scope.todos.token.accessToken
                //setCookieData($cookieStore,$scope.todos.token.accessToken);
                console.log(getCookieData($cookies));
                //console.log( $scope.todos.token.accessToken);

          
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


     }]);
/*
.factory("userPersistenceService", ["$cookies", function($cookies) {
    //your service code goes here
    var accessToken = "";

        return {
            setCookieData: function(accesstoken) {
                accessToken = accesstoken;
                $cookies.put("accessToken", accesstoken);
            },
            getCookieData: function() {
                accessToken = $cookies.get("accessToken");
                return accessToken;
            },
            clearCookieData: function() {
                accessToken = "";
                $cookies.remove("accessToken");
            }
        }
    }
    
]);*/
     function setCookieData(cookies, accesstoken){
         var accessToken = accesstoken;
         cookies.put("accessToken", accesstoken);
     }
     function getCookieData(cookies){
        var accessToken = cookies.get("accessToken");
        return cookies.accessToken;
     }
     function clearCookieData(cookies){
        var accessToken = "";
        cookies.remove("accessToken");
     }


 
})();