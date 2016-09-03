(function(){
  angular
    .module('compras')
    .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject=['$scope','productData','autenticacion','$location','marcaData'];
    function homeCtrl ($scope,productData,autenticacion,$location,marcaData){
        var hm=this;
        /**
         * atributos
         */
        hm.lstProductos=[];
        hm.lstMarcas=[];
        hm.isLoggedIn=autenticacion.isLoggedIn();
        hm.currentPath=$location.path();
        hm.pageHeader= {
          title:'compras',
          strapline:'compra todos los productos de la canasta familiar'
        };
        hm.sidebar={
          content:"Buscando las tiendas mas cercanas..."
        };
        hm.formError="";
        hm.producto={};
        hm.esCrear=false;

        /**
         * metodos
         */
        var init= function(){
          productData.darProductos().success(function(data){
            console.log(data);
            hm.lstProductos=data;
          }).error(function(data){
            alert("error en la consulta: "+data);        
          });

          marcaData.darMarcas().success(function(data){
            console.log(data);
            hm.lstMarcas=data;
          }).error(function(data){
            alert("error en la consulta "+ data);
          });
          
        }

        hm.crearProducto=function(){
            productData.create(hm.producto).success(function(producto){
                console.log(producto);
                hm.lstProductos.push(producto);
            }).error(function(error,status){
                console.log(error,status);
                if(status=="401"){
                  alert("no esta autorizado para realizar esta transaccion");
                }
            });
        }

        hm.toggleForm= function (){
            hm.esCrear= !hm.esCrear;
        }

        init();
    }

})();
