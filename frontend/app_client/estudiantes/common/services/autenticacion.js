(function(){
    angular
    .module("compras")
    .service("autenticacion", autenticacion);

    autenticacion.$inject= ["$window","$http","CONFIG"];
    function autenticacion($window, $http, CONFIG){
        
        var saveToken= function(token){
            $window.localStorage["compras-token"]=token;
        };

        var getToken= function(){
            return $window.localStorage["compras-token"];
        };

        var register= function(user){
            return $http.post(CONFIG.http_address+"/api/registro",user).success(function(data){
     
                saveToken(data.token);
            });        
        };

        var login= function(user){
            return $http.post(CONFIG.http_address+"/api/login",user).success(function(data){
           
                saveToken(data.token);
            });
        };

        var logout= function(){
            $window.localStorage.removeItem("compras-token");
        };

        var isLoggedIn= function(){
            var token= getToken();
             
            if(token){
                
                var payload= JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            }
            else{
               
                return false;
            }
        };

        var currentUser=function(){
            
            if(isLoggedIn()){
                var token= getToken();
                var payload= JSON.parse($window.atob(token.split('.')[1]));
                return{
                    usuario:payload.usuario,
                    nombre_usuario:payload.nombre_usuario
                };
            }
        }; 

        return{
            logout:logout,
            isLoggedIn:isLoggedIn,
            currentUser:currentUser,
            login:login,
            register:register,
            saveToken:saveToken,
            getToken:getToken
        };
    }
})();