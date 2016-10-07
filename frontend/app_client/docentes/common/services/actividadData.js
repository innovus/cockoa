(function(){

    angular
      .module("docentes")
      .service("actividadData", actividadData);
    actividadData.$inject=['$http','$q','CONFIG'];
    function actividadData($http,$q,CONFIG){
        var findActividadesByLogro= function(id_logro){
           /* var defered = $q.defer();
            var promise = defered.promise;*/
            return $http.get(CONFIG.http_address+'/api/docentes/logros/'+id_logro+'/actividades/')
               /* .success(function(data){
                    defered.resolve(data)

                }).error(function(error){
                    defered.reject(error)
                });
                return promise;   */ 
        };
         var findActividadesByLogros= function(ids_logro){
            console.log("entro al service")
            console.log(ids_logro)
            var envio= $http({
                method: 'POST',
                url: CONFIG.http_address+'/api/docentes/logros/actividades/',
                headers:{
                    'Content-Type':'application/json'
                },
                data: ids_logro
            })
            console.log(envio);


            return envio

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
        var deleteActividad = function(id_actividad){
           return $http({
                method: 'DELETE',
                url: CONFIG.http_address+'/api/docentes/actividades/'+id_actividad,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        }

        return {
            findActividadesByLogro:findActividadesByLogro,
            updatePorcentajes:updatePorcentajes,
            updateDescripcion:updateDescripcion,
            createActividad: createActividad,
            findActividadesByLogros:findActividadesByLogros
        };
    }
})();