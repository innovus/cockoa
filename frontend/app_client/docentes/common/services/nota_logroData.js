(function(){

    angular
      .module("docentes")
      .service("nota_logroData", nota_logroData);
    nota_logroData.$inject=['$http','CONFIG'];
    function nota_logroData($http,CONFIG){
        var findNotasLogrosByCarga= function(id_carga){
            return $http.get(CONFIG.http_address+'/api/docentes/cargas/'+id_carga +'/logros/notas')
      
        };
        var findNotasLogrosByMateriaAndPeriodo = function(id_materia,id_periodo){
            return $http.get('/estudiantes/materias/'+id_materia +'/notas/periodos/'+ id_periodo)

        }
       
        return {
            findNotasLogrosByCarga:findNotasLogrosByCarga,
            findNotasLogrosByMateriaAndPeriodo:findNotasLogrosByMateriaAndPeriodo,
        };
    }
})();