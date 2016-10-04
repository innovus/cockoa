(function(){

    angular
      .module("docentes")
      .service("nota_actividadData", nota_actividadData);
    nota_actividadData.$inject=['$http','CONFIG'];
    function nota_actividadData($http,CONFIG){
        var findNotasActividadByCarga= function(id_carga){
            return $http.get(CONFIG.http_address+'/api/docentes/cargas/'+id_carga +'/logros/actividades/notas')
      
        };
        var findNotasActividadByEstudianteAndLogro = function(){
            return $http.get(CONFIG.http_address+'/estudiantes/actividades/notas')

        }
       
        return {
            findNotasActividadByCarga:findNotasActividadByCarga,
            findNotasActividadByEstudianteAndLogro:findNotasActividadByEstudianteAndLogro,
        };
    }
})();