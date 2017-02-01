var app = angular.module('estudiantes',[]);//creamos el modulo pokedex y le pasamos array con las dependencias

function Periodos(){
	this.vectorPeriodos=[];
	this.setPeriodos=function(){
		$http.get('/api/todos/periodos')
		.success(function(data){
			this.vectorPeriodos = data;
		}).error(function(error){
			console.log("error: " + error)
		});
	}
}
app.service("periodos",['$http',Periodos($http)]);