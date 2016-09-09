(function(){

    angular
      .module("docentes")
      .service("actividadData", actividadData);
    actividadData.$inject=['$http','CONFIG'];
    function actividadData($http,CONFIG){
        var findActividadesByLogro= function(id_logro){
            return $http.get(CONFIG.http_address+'/api/docentes/logros/'+id_logro+'/actividades/')    
        };

        return {
            findActividadesByLogro:findActividadesByLogro,
        };
    }
})();