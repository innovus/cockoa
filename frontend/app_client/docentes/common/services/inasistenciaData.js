(function(){

    angular
      .module("docentes")
      .service("inasistenciaData", inasistenciaData);
    inasistenciaData.$inject=['$http','CONFIG'];
    function inasistenciaData($http,CONFIG){
        var findInasistenciasByCargaAndEstudiante= function(id_carga,id_estudiante){
            return $http.get(CONFIG.http_address+'/inasistencias/cargas/'+id_carga+'/estudiantes/'+id_estudiante)    
        };
        var findInasistenciasByCarga= function(id_carga){
            return $http.get(CONFIG.http_address+'/inasistencias/cargas/'+id_carga)    
        };
        var createInasistenciasEstudiantes= function(jsonenviar){
            return $http.post(CONFIG.http_address+"/inasistencias/inasistencia",jsonenviar)    
        };

        return {
            findInasistenciasByCargaAndEstudiante:findInasistenciasByCargaAndEstudiante,
            createInasistenciasEstudiantes:createInasistenciasEstudiantes,
            findInasistenciasByCarga:findInasistenciasByCarga,
        };
    }
})();