/**
 * declaramos la aplicacion e inyectamos sus dependencias
 */

(function(){
    angular.module('estudiantes',['ngRoute', 'ngSanitize','ui.bootstrap','xeditable','ngAnimate']);
    angular.module('docentes',['ngRoute', 'ngSanitize','ui.bootstrap','xeditable','ngAnimate'])
})();
