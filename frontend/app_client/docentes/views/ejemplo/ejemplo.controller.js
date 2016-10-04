(function(){
  angular
    .module('docentes')
    .controller('ejemploCtrl', ejemploCtrl);

    ejemploCtrl.$inject=['$scope','$location'];
    function ejemploCtrl ($scope,$location){
       $scope.titulo={
         "titulo":"pagina de ejemplo",
         "subtitulo":"ejemplo jojojo"
       }
    }

})();
