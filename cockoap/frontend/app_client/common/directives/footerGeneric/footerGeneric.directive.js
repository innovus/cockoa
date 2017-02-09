(function() {
    /** 
     * @ngdoc directive
     * @name docentes.directive:footerGeneric
     * @restrict EA
     * @description
     * 
     * Esta es una directiva del pie de pagina
     * 
     */
    angular.module("docentes").directive("footerGeneric", footerGeneric);

    function footerGeneric() {
        return {
            restrict: "EA",
            templateUrl: "/common/directives/footerGeneric/footerGeneric.template.html"
        };
    }
})();