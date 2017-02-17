(function() {
    /**
     * @ngdoc service
     * @name docentes.service: myutils
     * @requires $mdDialog
     * @requires $rootScope
     * 
     * @description 
     * 
     * servicio que permite mostrar una animacion de cargando mientras se hace la consulta de datos
     */
    angular.module('docentes').service('myutils', myutils);
    myutils.$inject = ['$mdDialog', '$rootScope'];

    function myutils($mdDialog, $rootScope) {
        return {
            hideWait: hideWait,
            showWait: showWait
        }

        function hideWait() {
            setTimeout(function() {
                $rootScope.$emit("hide_wait");
            }, 5);
        }

        function showWait() {
            console.log("show")
            $mdDialog.show({
                controller: 'waitController',
                template: '<md-dialog id="plz_wait" style="background-color:transparent;box-shadow:none">' + '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait">' + '<md-progress-circular md-mode="indeterminate"  md-diameter="85" ></md-progress-circular>' + '</div>' + '</md-dialog>',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                fullscreen: false
            }).then(function(answer) {});
        }
    }
})();