//una function javascript q se llama asi misma
(function (){
    var app = angular.module('estudiantes', ['ui.bootstrap','ngCookies']);//creamos el modulo pokedex y le pasamos array con las dependencias


//creamos un controlador
//definimos el primer controlador, le pasamos el nombre
    //del controlador y le pasamos una function javascript

//Agregamos el objecto pokemon asociado al controlador
app.controller('materiasController',['$scope','$http','$cookieStore', '$cookies',function($scope,$http,$cookieStore,$cookies){

  //  $scope.formData = {};

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/estudiantes/materias')
        .success(function(data) {
            //JSON.stringify(data).replace(/null/i, "\"\""); 
            $scope.materias = data;
            //console.log(data)
            //console.log($cookies.accessToken);
            
            for (var i = $scope.materias.length - 1; i >= 0; i--) {
                $scope.materias[i].nombre1 = delNull($scope.materias[i].nombre1);
                $scope.materias[i].nombre2 = delNull($scope.materias[i].nombre2);
                $scope.materias[i].apellido1 = delNull($scope.materias[i].apellido1);
                $scope.materias[i].apellido2 = delNull($scope.materias[i].apellido2);
                $scope.materias[i].nombrecompleto = $scope.materias[i].nombre1 + " "+ $scope.materias[i].nombre2 + " " + $scope.materias[i].apellido1 + " "+  $scope.materias[i].apellido2; 
               // console.log($scope.materias[i]);
               /*(function(i){
                $http.get('/estudiantes/materias/'+$scope.materias[i].id_materia +'/logros')
                  .success(function(logros){
                    
                    $scope.materias[i].logros = logros;

                   // $scope.logros = logros;
                   // console.log($scope.logros);
                    
                   // $scope.materias[i].logros = logros; 
                    

                  }).error(function(error){console.log('Error: '+ error)})

               })(i);*/
               
            }
            console.log($scope.materias)

            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });   

        $scope.getLogros = function(id_materia){
          $scope.logros = [];
          $http.get('/estudiantes/materias/'+id_materia +'/logros')
            .success(function(logros){                    
              $scope.logros = logros;
            })
            .error(function(error){
              console.log('Error: '+ error)
            })
        }

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

