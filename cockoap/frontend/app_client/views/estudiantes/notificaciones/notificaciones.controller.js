//una function javascript q se llama asi misma
//(function (){
var app = angular.module('docentes'); //creamos el modulo pokedex y le pasamos array con las dependencias
/** 
 * @ngdoc controller
 * @name docentes.controller:notificacionesController
 * @requires $scope, $http, $uibModal, $log, $filter, $location, CONFIG, estudianteData, notificacionData
 * @description
 * 
 * Esta es una controllador para consultar la actividad en detalle 
 * 
 */
app.controller('notificacionesController', ['$rootScope', '$scope', '$http', '$uibModal', '$log', '$filter', '$location', 'CONFIG', 'estudianteData', 'notificacionData', 'myutils', function($rootScope, $scope, $http, $uibModal, $log, $filter, $location, CONFIG, estudianteData, notificacionData, myutils) {
    $scope.tipo_notificacion_seleccionada = null;
    $scope.notificaciones = [];
    $scope.todasNotificaciones = [];
    $scope.tiposNotificacion = [];
    //init
    notificacionData.findTiposNotificaciones().success(function(data) {
        $scope.tiposNotificacion = data;
    }).error(function(error) {
        console.log(error);
    });
    myutils.showWait();
    notificacionData.findNotificationByEstudiante().success(function(data) {
        $scope.notificaciones = data;
        $scope.todasNotificaciones = data;
        console.log(data)
        myutils.hideWait();
    }).error(function(error) {
        console.log(error);
        myutils.hideWait();
    });
    /** 
     * @ngdoc method
     * @name seleccionarTipo
     * @methodOf docentes.controller:notificacionesController
     * @param {int} tipo_notificacion tipo_notificacion es un entero que contiene el id de el tipo de notificacion 
     * 
     *
     * @description
     * 
     * Este metodo se lo usa en el momento que un usuario hace click en un tipo de notificacion para poder filtrar las notificaciones 
     * 
     * 
     */
    var seleccionarTipo = function(tipo_notificacion) {
        $scope.tipo_notificacion_seleccionada = tipo_notificacion;
        $scope.notificaciones = $filter('filter')($scope.todasNotificaciones, {
            id_tipo_notificacion: tipo_notificacion.id_tipo_notificacion
        });
    }
    /** 
     * @ngdoc method
     * @name mostrarTodos
     * @methodOf docentes.controller:notificacionesController
     *
     * @description
     * 
     * Este metodo se lo usa en el momento que un usuario hace click en mostrar todos  para poder quitar el filtro de las notificaciones 
     * 
     * 
     */
    var mostrarTodos = function() {
        $scope.tipo_notificacion_seleccionada = [];
        $scope.notificaciones = $scope.todasNotificaciones
    }
    /** 
     * @ngdoc method
     * @name clickNotificacion
     * @methodOf docentes.controller:notificacionesController
     * @param {Object} notificacion notificacion es un objeto tipo notificacion que contiene los datos de una notificacion
     * 
     *
     * @description
     * 
     * Este metodo se lo usa en el momento que un usuario hace click en una notificacion que no ha mirado, y cambia el estado a revisado
     * 
     * 
     */
    var clickNotificacion = function(notificacion) {
        if (notificacion.estado_notificacion == "0") {
            notificacionData.updateEstadoNotificacion(notificacion.id_notificacion).success(function(data) {
                console.log("success")
                console.log(data)
            }).error(function(error) {
                console.log(error);
            });
        }
        if (notificacion.id_tipo_notificacion == 2) {
            console.log(notificacion);
            console.log("entro al if")
            $rootScope.notificacion = notificacion;
            $location.path('/estudiantes/notas');
        } else {
            console.log(notificacion);
            $rootScope.notificacion = notificacion;
            console.log("entro al else")
            $location.path('/estudiantes/inasistencias');
        }
    }
    //option de faltas justificada o no
    /////////////////////
    $scope.seleccionarTipo = seleccionarTipo;
    $scope.mostrarTodos = mostrarTodos;
    $scope.clickNotificacion = clickNotificacion;
}]);