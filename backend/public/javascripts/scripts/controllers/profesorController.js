//una function javascript q se llama asi misma
(function (){
    var app = angular.module('profesores', ['ui.bootstrap','ngCookies']);//creamos el modulo pokedex y le pasamos array con las dependencias


//creamos un controlador
//definimos el primer controlador, le pasamos el nombre
    //del controlador y le pasamos una function javascript

//Agregamos el objecto pokemon asociado al controlador
app.controller('cargaController',['$scope','$http','$cookieStore', '$cookies',function($scope,$http,$cookieStore,$cookies){

  //  $scope.formData = {};

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/docentes/carga')
        .success(function(data) {
            //JSON.stringify(data).replace(/null/i, "\"\""); 
            $scope.cargas = data;
            console.log(data)
           // console.log($cookies.accessToken);     
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });   

         $scope.gridOptions = {
            data: 'inasistencias'
        };  
    }]);
})();
function delNull(item){
  if(item == null){
    return "";
  }else{
    return item;
  }
}

function setCookieData(cookies, accesstoken){
         var accessToken = accesstoken;
         cookies.put("accessToken", accesstoken);
     }
     function getCookieData(cookies){
        var accessToken = cookies.get("accessToken");
        return accessToken;
     }
     function clearCookieData(cookies){
        var accessToken = "";
        cookies.remove("accessToken");
     }

