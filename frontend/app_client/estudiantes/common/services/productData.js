(function(){

    angular
      .module("compras")
      .service("productData", productData);

    productData.$inject=['$http','autenticacion',"CONFIG"];
    function productData($http, autenticacion,CONFIG){
        var darProductos= function(){
            return $http.get(CONFIG.http_address+"/api/producto");
        };

        var findById=function(identificador){
            return $http.get(CONFIG.http_address+"/api/producto/"+identificador);
        };

        var create=function(producto){
            return $http.post(CONFIG.http_address+"/api/producto", producto,{ headers:{Authorization : 'Bearer '+autenticacion.getToken()} })
        }

        return {
            findById:findById,
            darProductos:darProductos,
            create:create
        };
    }
})();
