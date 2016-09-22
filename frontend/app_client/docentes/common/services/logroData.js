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
        var updateDescripcionLogro = function(logro){
           return $http({
                method: 'PUT',
                url: CONFIG.http_address+'/api/docentes/logros/descripcion',
                headers:{
                    'Content-Type':'application/json'
                },
                data: logro
            })
        }

        return {
            findLogrosByCarga:findLogrosByCarga,
            findLogrosByMateriaAndPeriodo:findLogrosByMateriaAndPeriodo,
            updateDescripcionLogro:updateDescripcionLogro,
            
        };
    }
})();