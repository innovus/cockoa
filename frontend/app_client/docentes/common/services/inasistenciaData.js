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
        var findInasistenciasByMateria = function(id_materia){
            return $http.get(CONFIG.http_address+'/inasistencias/materias/'+id_materia) 

        }
        var updateEstadoInasistencia = function(inasistencia){
           return $http({
                method: 'PUT',
                url: CONFIG.http_address+'/inasistencias/estado',
                headers:{
                    'Content-Type':'application/json'
                },
                data: inasistencia
            })
        }

        return {
            findInasistenciasByCargaAndEstudiante:findInasistenciasByCargaAndEstudiante,
            createInasistenciasEstudiantes:createInasistenciasEstudiantes,
            findInasistenciasByCarga:findInasistenciasByCarga,
            findInasistenciasByMateria: findInasistenciasByMateria,
            updateEstadoInasistencia: updateEstadoInasistencia,

        };
    }
})();