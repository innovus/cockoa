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
            return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoaSI6IjNkYTQxZjZiNDJiMjJhYzc4MGFkNWQ3NDk1Y2E5NmY2IiwiaGFzaHIiOiJjMTg4ZDU0MjlkZTcwODBkMWRhY2Y1MTM2M2QxODc5YSIsImV4cCI6MTQ4NDc3MzMxOCwiaWF0IjoxNDg0MTY4NTE4fQ.mmt_V5cTZf7x5K_4z4ZzG2z5F1OPJTP98fS2_VmluwA";
        };

        var getCookieToken= function(){
            return $cookieStore.get("udenar");
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
            return $http.post(CONFIG.http_seguridad+"/logout");
        };

        var isLoggedIn= function(callback){
            var token= getToken();
            if(token){
                $http.post(CONFIG.http_seguridad+"/darinfousuario",null,{ headers:{Authorization : 'Bearer '+getToken()} })
                .success(function(data){
                    $log.log(data);
                    console.log("succes darinfo")
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
            getToken:getToken
        };
    }
})();