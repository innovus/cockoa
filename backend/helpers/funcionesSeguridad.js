/**
 * @file archivo que contiene el modulo de funciones varias de seguridad
 * @name funcionesSeguridad.js
 * @author David Villota <david.villlota@udenar.edu.co>
 * @license UDENAR
 * @copyright 2016 Udenar
 **/
var Request= require("request");
var Respuesta = require("../helpers/respuesta");
var Q= require("q");

/**
* Modulo que agrupa todas las funciones de seguridad de autenticacion de tokens y desencriptacion de la informacion
* @module FuncionesSeguridad
**/

/**
* funcion middleware que administra y valida la autenticacion a traves del token conectandose con el servidor ARGUS
* @param {Object} req - objeto de peticion.
* @param {Object} res - objeto de respuesta.
* @param {function} next - funcion next.
* @returns {function} next- funcion next para continuar con la ejecucion del codigo que llama al middleware
**/
var loginMovil = function(req,res){
  var data= { username: "1004575444", password: "1004575444"};
  Request.post(
    {
      url:process.env.LOGINMOVIL,
      form:data
    },
    function(err,httpResponse,body){

      if(err){
                console.log(err);
                Respuesta.sendJsonResponse(res,500,{"error":"existe un error en la autenticacion de la sesion"});
            }
            else if(httpResponse.statusCode==200){
              console.log("entro a 200")

               Respuesta.sendJsonResponse(res,200,body);

            }
            else{

                Respuesta.sendJsonResponse(res,500,body);
            }

    }
  );

}
var autorizacion= function(req,res,next){
  console.log(process.env.ARGUS);
  //var ip= codificarIp("190.157.30.117");
   var ip= codificarIp(req.ip);
   console.log("si entro a autorizacion")


  console.log("ip")
  console.log(ip);
  ip = ip.replace('..ffff.','');
  console.log(ip)
  if (req.headers.authorization && req.headers.authorization.search('Bearer ') === 0) {
      var token = req.headers.authorization.split(' ')[1];
      var data= {
        token: token,
        ip:ip
      };
      Request.post(
        {
            url:process.env.ARGUS,
            form:data
        },
        function (err, httpResponse, body){
            if(err){
                console.log(err);
                Respuesta.sendJsonResponse(res,500,{"error":"existe un error en la autenticacion de la sesion"});
            }
            else if(httpResponse.statusCode==200){
              console.log("entro a 200")

                return next();
            }
            else{

                Respuesta.sendJsonResponse(res,500,body);
            }
        }
    );
  }
  else{
      Respuesta.sendJsonResponse(res,500,{"error":"el usuario no se encuentra autenticado"});
  }
};

function getTokenData(token){
  console.log("token")
  console.log(token)

   console.log(process.env.TOKENINFO); 
   var deferred= Q.defer();


   var data={
      token:token
   };
   Request.post(
      {
        url:process.env.TOKENINFO,
        form:data
      },
      function(err, httpResponse,body){
          if(err){
              console.log(err);
              deferred.reject(err);
          }
          else if(httpResponse.statusCode==200){
              console.log("respuestaaaaa:");
              console.log(body)
  
              deferred.resolve(JSON.parse(body));
          } 
          else{
              deferred.reject(JSON.parse(body));
          }   
   });

   return deferred.promise;

};

var codificarIp=function(ip){
	var codificada=ip.replace(/\:/g,".");
	return codificada;
};

module.exports.autorizacion= autorizacion;
module.exports.getTokenData=getTokenData;
module.exports.loginMovil =loginMovil ;