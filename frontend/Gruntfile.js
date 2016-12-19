module.exports= function(grunt){
    grunt.initConfig({
        ngdocs:{
        	options:{
        		starPage:'/api',
        		
        	}
        	api:{
        		src:["app_client/**/*.js","!app_client/lib/**/*.js","!app_client/views/notas/notas.controller.js"]
        	}
           // all:["app_client/**/*.js"]
        }
    });

    grunt.loadNpmTasks("grunt-ngdocs");
    grunt.registerTask("default",["ngdocs"]);

};