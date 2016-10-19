//una function javascript q se llama asi misma
//(function (){
var app = angular.module('docentes');//creamos el modulo pokedex y le pasamos array con las dependencias

app.controller('notificacionesController',['$scope','$http','$uibModal','$log','$filter','CONFIG','estudianteData','notificacionData',function($scope,$http,$uibModal,$log,$filter,CONFIG,estudianteData,notificacionData){

 

  $scope.tipo_notificacion_seleccionada = null;
  $scope.notificaciones=[];
  $scope.todas_notificaciones=[];
  $scope.tipos_notificaciones = [];


  notificacionData.findTiposNotificaciones()
  .success(function(data){
    $scope.tipos_notificaciones = data;
  }).error(function(error){
    console.log(error);
  });


   notificacionData.findNotificationByEstudiante(30011)
  .success(function(data){
    $scope.notificaciones = data;
    $scope.todas_notificaciones=data;
    console.log(data)
  }).error(function(error){
    console.log(error);
  });

  $scope.seleccionarTipo = function(tipo_notificacion){
    $scope.tipo_notificacion_seleccionada = tipo_notificacion;
    $scope.notificaciones = $filter('filter')($scope.todas_notificaciones, {id_tipo_notificacion: tipo_notificacion.id_tipo_notificacion});
           
  }
    $scope.mostrarTodos = function(){
    $scope.tipo_notificacion_seleccionada = [];
    $scope.notificaciones = $scope.todas_notificaciones
           
  }



  //option de faltas justificada o no





   /////////////////////

}]);





