//una function javascript q se llama asi misma
//(function (){
    var app = angular.module('profesores', ['ui.bootstrap']);//creamos el modulo pokedex y le pasamos array con las dependencias


//creamos un controlador
//definimos el primer controlador, le pasamos el nombre
    //del controlador y le pasamos una function javascript

//Agregamos el objecto pokemon asociado al controlador
app.controller('cargaController',['$scope','$http',function($scope,$http){

  //  $scope.formData = {};
  $scope.estudiantes=[];
// Cuando se cargue la página, pide del API todos los TODOs
  $http.get('/api/docentes/carga')
    .success(function(data) {
    //JSON.stringify(data).replace(/null/i, "\"\""); 
        $scope.cargas = data;
        console.log(data);


           // console.log($cookies.accessToken);     
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });

    $scope.selectCurso = function (id_curso){
        $http.get('/api/cursos/'+id_curso+'/estudiantes')
        .success(function(est){
            $scope.estudiantes = est;
             for (var i = $scope.estudiantes.length - 1; i >= 0; i--) {
                $scope.estudiantes[i].nombre1 = delNull($scope.estudiantes[i].nombre1);
                $scope.estudiantes[i].nombre2 = delNull($scope.estudiantes[i].nombre2);
                $scope.estudiantes[i].apellido1 = delNull($scope.estudiantes[i].apellido1);
                $scope.estudiantes[i].apellido2 = delNull($scope.estudiantes[i].apellido2);
                $scope.estudiantes[i].nombrecompleto = $scope.estudiantes[i].nombre1 + " "+ $scope.estudiantes[i].nombre2 + " " + $scope.estudiantes[i].apellido1 + " "+  $scope.estudiantes[i].apellido2; 

               
            };
            console.log($scope.estudiantes);
        }).error(function(error){
            $scope.estudiantes = [];
            console.log('Error: ' + error);
        })
    }
}]);
//})();
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

