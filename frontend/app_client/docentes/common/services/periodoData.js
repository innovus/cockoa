(function(){

    angular
      .module("docentes")
      .service("periodoData", periodoData);
    periodoData.$inject=['$http','CONFIG'];
    function periodoData($http,CONFIG){
        var findPeriodoActual= function(){
            return $http.get(CONFIG.http_address+'/api/todos/periodos/actual')    
        };
        var findPeriodos = function(){
            return $http.get(CONFIG.http_address+'/api/todos/periodos')
            
        }
        var findCargasByPeriodo = function(id_periodo){
            return $http.get(CONFIG.http_address+'/api/docentes/cargas/periodos/' +id_periodo)


        }
        return {
            findPeriodoActual:findPeriodoActual,
            findPeriodos:findPeriodos,
            findCargasByPeriodo:findCargasByPeriodo,
        };
    }
})();