(function(){

    angular
      .module("docentes")
      .service("actividadData", actividadData);
    actividadData.$inject=['$http','CONFIG'];
    function actividadData($http,CONFIG){
        var findActividadesByLogro= function(id_logro){
            return $http.get(CONFIG.http_address+'/api/docentes/logros/'+id_logro+'/actividades/')    
        };
        var updatePorcentajes = function(porcentajes){
            return $http({
                method: 'PUT',
                url: CONFIG.http_address+'/api/docentes/actividades/porcentajes',
                headers:{
                    'Content-Type':'application/json'
                },
                data: porcentajes

            })
        }
        var updateDescripcion = function(actividad){
            return $http({
                method: 'PUT',
                url: CONFIG.http_address+'/api/docentes/actividades/descripcion',
                headers:{
                    'Content-Type':'application/json'
                },
                data: actividad

            })
        }
        var createActividad = function(actividad){
            return $http({
                method: 'POST',
                url: CONFIG.http_address+'/api/docentes/actividades',
                headers:{
                    'Content-Type':'application/json'
                },
                data: actividad

            })
        }

        return {
            findActividadesByLogro:findActividadesByLogro,
            updatePorcentajes:updatePorcentajes,
            updateDescripcion:updateDescripcion,
            createActividad: createActividad,
        };
    }
})();