(function(){

    angular
      .module("docentes")
      .service("logroData", logroData);
    logroData.$inject=['$http','CONFIG'];
    function logroData($http,CONFIG){
        var findLogrosByCarga= function(id_carga){
            return $http.get(CONFIG.http_address+'/api/docentes/cargas/'+id_carga+'/logros')    
        };

        return {
            findLogrosByCarga:findLogrosByCarga,
        };
    }
})();