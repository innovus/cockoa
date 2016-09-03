(function(){
    angular.module("compras").controller("detalleProductoCtrl",detalleProductoCtrl);

    detalleProductoCtrl.$inject= ["$scope", "$routeParams", "productData"];
    function detalleProductoCtrl($scope, $routeParams, productData){

        $scope.productoid= $routeParams.productoid;
        $scope.producto= {};
        $scope.pageHeader={
            title: "Detalles de producto"
        };         

        productData.findById($scope.productoid).success(function(producto){
            console.log(producto);
            $scope.producto=producto;
        }).error(function(error){
            alert("error en la consulta");
        });
    }
})();