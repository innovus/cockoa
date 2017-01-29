(function() {

    /** 
     * @ngdoc controller
     * @name docentes.controller:inasistenciaEstudianteController 
     * @requires $scope,$http,$cookieStore, materiaData, inasistenciaData
     * @description
     * 
     * Esta es una controllador para manejar la vista de inasistencias del estudiante
     * 
    */


    var app = angular.module('docentes'); //creamos el modulo pokedex y le pasamos array con las dependencias
    //creamos un controlador
    //definimos el primer controlador, le pasamos el nombre
    //del controlador y le pasamos una function javascript
    //Agregamos el objecto pokemon asociado al controlador
    app.controller('inasistenciaEstudianteController', ['$rootScope','$scope', '$http', '$cookieStore', 'materiaData', 'inasistenciaData', function($rootScope,$scope, $http, $cookieStore, materiaData, inasistenciaData) {
        $scope.materia_seleccionada = null;
        $scope.inasistencias = null;
        console.log("notificacion")
        console.log($rootScope.notificacion);
        //////////////////////


        /** 
        * @ngdoc method
        * @name getInasistenciasByMateria
        * @methodOf docentes.controller:inasistenciaEstudianteController 
        * @param {Object} materia materia es un objeto donde tiene todos los datos de una materia
        *
        * @description
        * 
        * Este metodo se lo usa para obtener las inasistencias de una materia
        * 
        * 
        */ 

        getInasistenciasByMateria = function(materia) {
            $scope.materia_seleccionada = materia;
            console.log(materia)
            inasistenciaData.findInasistenciasByMateria(materia.id_materia).success(function(data) {
                $scope.inasistencias = data;
                for (var i = $scope.inasistencias.length - 1; i >= 0; i--) {
                    $scope.inasistencias[i].nombre1 = delNull($scope.inasistencias[i].nombre1);
                    $scope.inasistencias[i].nombre2 = delNull($scope.inasistencias[i].nombre2);
                    $scope.inasistencias[i].apellido1 = delNull($scope.inasistencias[i].apellido1);
                    $scope.inasistencias[i].apellido2 = delNull($scope.inasistencias[i].apellido2);
                    $scope.inasistencias[i].nombrecompleto = $scope.inasistencias[i].nombre1 + " " + $scope.inasistencias[i].nombre2 + " " + $scope.inasistencias[i].apellido1 + " " + $scope.inasistencias[i].apellido2;
                } //cierra dor
                console.log(data);
            }).error(function(error) {
                console.log('Error: ' + error);
            })
        }
        $scope.getInasistenciasByMateria = getInasistenciasByMateria;



        /** 
        * @ngdoc method
        * @name selectCurso
        * @methodOf docentes.controller:inasistenciaEstudianteController  
        * @param {String} id_curso id_curso es el id de el curso a consultar
        *
        * @description
        * 
        * Este metodo se lo usa para que cuando un estudiante de click en una notificacion pendiente
        * 
        * 
        */ 
        /*
        $scope.selectCurso = function(id_curso) {
            $http.get('/api/cursos/' + id_curso + '/estudiantes').success(function(est) {
                $scope.estudiantes = est;
                for (var i = $scope.estudiantes.length - 1; i >= 0; i--) {
                    $scope.estudiantes[i].nombre1 = delNull($scope.estudiantes[i].nombre1);
                    $scope.estudiantes[i].nombre2 = delNull($scope.estudiantes[i].nombre2);
                    $scope.estudiantes[i].apellido1 = delNull($scope.estudiantes[i].apellido1);
                    $scope.estudiantes[i].apellido2 = delNull($scope.estudiantes[i].apellido2);
                    $scope.estudiantes[i].nombrecompleto = $scope.estudiantes[i].nombre1 + " " + $scope.estudiantes[i].nombre2 + " " + $scope.estudiantes[i].apellido1 + " " + $scope.estudiantes[i].apellido2;
                };
                console.log($scope.estudiantes);
            }).error(function(error) {
                $scope.estudiantes = [];
                console.log('Error: ' + error);
            })
        }
        */


         materiaData.findMateriasWithInasistenciaByEstudiante().success(function(data) {
            $scope.materias = data;
            console.log($scope.materias)
        }).error(function(data) {
            console.log('Error: ' + data);
        });

        if($rootScope.notificacion != undefined || $rootScope.notificacion != null){
            console.log("nunca entro")
            console.log($rootScope.notificacion.guia)
             materiaData.findMateriasByActividad($rootScope.notificacion.guia).success(function(data) {
                $rootScope.notificacion == null;
                console.log(data);
                getInasistenciasByMateria(data);

                console.log($scope.materias)
            }).error(function(data) {
                console.log('Error: ' + data);
            });


        }

    }]);
})();

function delNull(item) {
    if (item == null) {
        return "";
    } else {
        return item;
    }
}
