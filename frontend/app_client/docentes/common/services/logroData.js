(function(){

    angular
      .module("docentes")
      .service("logroData", logroData);
    logroData.$inject=['$http','CONFIG'];
    function logroData($http,CONFIG){
        var findLogrosByCarga= function(id_carga){
            return $http.get(CONFIG.http_address+'/api/docentes/cargas/'+id_carga+'/logros')    
        };

        var findLogrosByMateriaAndPeriodo = function(id_materia,id_periodo){
            return $http.get(CONFIG.http_address+'/estudiantes/materias/'+id_materia +'/logros/periodos/'+ id_periodo)
        }

        return {
            findLogrosByCarga:findLogrosByCarga,
            findLogrosByMateriaAndPeriodo:findLogrosByMateriaAndPeriodo,
        };
    }
})();