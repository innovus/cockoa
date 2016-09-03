(function(){

    angular
      .module("compras")
      .service("marcaData", marcaData);

    marcaData.$inject=['$http','autenticacion','CONFIG'];
    function marcaData($http, autenticacion, CONFIG){
        var darMarcas= function(){
            return $http.get(CONFIG.http_address+"/api/marca");
        };

        return {
            darMarcas:darMarcas
        };
    }
})();
