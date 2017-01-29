(function(){

    /**
     * @ngdoc service
     * @name docentes.service: autenticacion
     * @requires $http
     * @requires CONFIG
     * @requires $window
     * 
     * @description 
     * 
     * servicio que permite la comunicacion con el web service de autenticacion
     */
    angular
    .module("docentes")
    .service("autenticacion", autenticacion);

    autenticacion.$inject= ["$window","$http","CONFIG","$cookieStore","$log"];
    function autenticacion($window, $http, CONFIG, $cookieStore,$log){
        
        /**
         * @ngdoc method
         * @name saveToken
         * @methodOf docentes.service: autenticacion
         * @param {String} token token que se va a guardar en el local storage
         */

        var saveToken= function(token){
            $window.localStorage["compras-token"]=token;
        };

         /**
         * @ngdoc method
         * @name getToken
         * @methodOf docentes.service: autenticacion
         * @returns {String} token guardado en el navegador del cliente
         */
        var getToken= function(){
          
            //return $cookieStore.get("udenar");
           // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoaSI6IjNkYTQxZjZiNDJiMjJhYzc4MGFkNWQ3NDk1Y2E5NmY2IiwiaGFzaHIiOiJjMTg4ZDU0MjlkZTcwODBkMWRhY2Y1MTM2M2QxODc5YSIsImV4cCI6MTQ4NTM3ODM3OSwiaWF0IjoxNDg0NzczNTc5fQ.vSMVUSusKz7lVK7Hw5SKr4CVVXcgkSBYODThB50huQ8";
            return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoaSI6ImRlNzM1NjI2N2JlNGI5N2EwYjZhMDBiYzdlNTk3ZDlmIiwiaGFzaHIiOiJmNDVkZjA4YjIyYzljMTlmNWZkYmY4ZjgxN2E1ZDJlOSIsImV4cCI6MTQ4NTgwNTU5MSwiaWF0IjoxNDg1MjAwNzkxfQ.tXQ1sak3z2uTUw-LDekQ6gVc8H52x92QhqDldoNwTX8";
        };

        var getCookieToken= function(){
            return $cookieStore.get("udenar");
        };

        var register= function(user){
            return $http.post(CONFIG.http_address+"/api/registro",user).success(function(data){
     
                saveToken(data.token);
            });        
        };
        var getPerfil= function(){
            return $http.get(CONFIG.http_address + '/api/todos/perfil/',{ headers:{Authorization : 'Bearer '+CONFIG.token}});       
        };

        var login= function(user){
            return $http.post(CONFIG.http_address+"/api/login",user).success(function(data){
           
                saveToken(data.token);
            });
        };

        var logout= function(){
            return $http.post(CONFIG.http_seguridad+"/logout");
        };

        var isLoggedIn= function(callback){
            var token= getToken();
            if(token){
                $http.post(CONFIG.http_seguridad+"/darinfousuario",null,{ headers:{Authorization : 'Bearer '+getToken()} })
                .success(function(data){
                    $log.log(data);
                    console.log("succes daringo")
                    callback(data,null);
                }).error(function(e){
                    $log.error(e);
                    console.log("error dar ingo")
                    console.log(e);
                    callback(null,e);
                });
            }
            else{
                callback(null,{"error":"no se encuentra la sesion abierta"})
            }
        };

        var obtenerRutas= function(){
           console.log(getToken()); 
           return $http.post(CONFIG.http_seguridad+"/obtenerRutas", null, { headers:{Authorization : 'Bearer '+getToken()} });
        };

        var obtenerOpciones= function(){

        };

        return{
            obtenerRutas:obtenerRutas,
            getCookieToken:getCookieToken,
            logout:logout,
            isLoggedIn:isLoggedIn,
            login:login,
            register:register,
            saveToken:saveToken,
            getToken:getToken,
            getPerfil:getPerfil,
        };
    }
})();