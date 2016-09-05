(function(){
    angular
    .module('compras')
    .config(config);
    
    config.$inject=['$routeProvider','$locationProvider'];
    function config($routeProvider, $locationProvider){
        $routeProvider
        .when('/home',{
            templateUrl:'/views/home/home.view.html',
            controller:'homeCtrl',
            controllerAs:"hm"
        })
        .when("/about",{
            templateUrl: "/common/views/genericText.view.html",
            controller:"aboutCtrl"
        })
        .when("/producto/:productoid",{
            templateUrl: "/views/detalle_producto/detalle_producto.view.html",
            controller: "detalleProductoCtrl"
        })
        .when("/registro",{
            templateUrl:"/views/auth/registro/registro.view.html",
            controller:"registroCtrl"
        })
        .when("/login",{
            templateUrl: "/views/auth/login/login.view.html",
            controller: "loginCtrl"
        })
        .otherwise({redirectTo:"/login"});

        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
    }
})();