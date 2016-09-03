(function(){
    angular
    .module("compras")
    .controller("aboutCtrl", aboutCtrl);

    function aboutCtrl($scope){
        $scope.pageHeader={
            title:"About compras"
        };
        $scope.main={
            content: "Loc8r was created to help people find places to sit down and get a bit of work done.<br></br>Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        };
    }    

})();