"use strict"
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo';
var db = pgp(connectionString);

///////////prueba/////////

///////////////



////////////////////////
/*
const userController = {
	updateOrCreateUser: function  (user, cb){
		cb(null,user);
	},
	authenticate: function(identificacion,password,cb){

		var passwordEncriptada = encriptar(identificacion,password);

		//consulto primero el usuario
		db.one("select * from usuario where identificacion = ${identificacion}",
		{
			identificacion:identificacion
		})
		.then(function(data){
		//si entro aqui es por que  el usuario existe, y  va a revisar la contraseña
			db.one("select identificacion, id_usuario from usuario where identificacion = ${identificacion} and password_usuario = ${password_usuario}",
			{
				identificacion:identificacion,
				password_usuario:passwordEncriptada
			})
			.then(function(data){
				//si la contraseña coincide entra aqui
				//el data es el user  y cb es el done(null,user)
				return cb(null,data);
				//res.send("Logeado");
			}).catch(function(err){
				if(err.code == 0){
					//si la contraseña no coincide entra aqui 
					return cb(null,false,{message: 'contraseña incorrecta'});
				}else console.log(err);
			
			});
		}).catch(function(err){
			if (err.code == 0){
				return cb(null,false,{message: 'Identificacion incorrecta'});
		
			}else return cb(null,false,{message: err})
				 
		
		});
	}
};
*/

function updateOrCreateUser  (user, cb){
	cb(null,user);
}
function authenticate(identificacion,password,cb){

		//var passwordEncriptada = encriptar(identificacion,password);

		//consulto primero el usuario
		
		db.one("select * from usuario where identificacion = ${identificacion}",
		{
			identificacion:identificacion
		})
		.then(function(data){
			
		//si entro aqui es por que  el usuario existe, y  va a revisar la contraseña
			db.one("select identificacion, id_usuario,id_tipo_usuario from usuario where identificacion = ${identificacion} and password_usuario = ${password_usuario}",
			{
				identificacion:identificacion,
				password_usuario:password
			})
			.then(function(data){
				//si la contraseña coincide entra aqui
				//el data es el user  y cb es el done(null,user)
				console.log(data); 
				cb(null,data);
				//res.send("Logeado");
			}).catch(function(err){
				if(err.name == "QueryResultError"){
					console.log(err); 
					//si la contraseña no coincide entra aqui 
					return cb(null,false,{message: 'contraseña incorrecta'});
				}else console.log("prueba: " + err);
			
			});
		}).catch(function(err){
			if (err.name == "QueryResultError"){
				console.log("entro al error code cero");
				return cb(null,false,{message: 'Identificacion incorrecta'});
		
			}else return cb(null,false,{message: err})
				 
		
		});
	}
function getProfile(id,cb){
	
	db.one("select id_usuario, usuario.identificacion, nombre1, nombre2 , apellido1, apellido2, sexo, direccion, telefono, celular, email  from usuario join persona on usuario.identificacion = persona.identificacion where usuario.id_usuario = ${id}",
		{
			id:id
		})
		.then(function(data){
			//console.log(data)
			cb(data)
		}).catch(function(err){
			console.log(err)
			return cb(err);

		})


}
function encriptar(user, pass) {
   var crypto = require('crypto');
   // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
   var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex');
   return hmac;
}

function login(req, res,next){
	var emaili = req.body.email;
	var passwordi = req.body.password;
	var passwordEncriptada = encriptar(emaili,passwordi);

//consulto primero el usuario
	db.one("select * from users where email = ${email}",
		{
			email:emaili
		})
	.then(function(data){
		//si entro aqui es por que  el usuario existe, y  va a revisar la contraseña
		db.one("select email,id_usuario from users where email = ${email} and password = ${password}",
		{
			email:emaili,
			password:passwordEncriptada
		})
		.then(function(data){
			//si la contraseña coincide entra aqui
			
			res.send(data);
		}).catch(function(err){
			if(err.code == 0){
				//si la contraseña no coincide entra aqui 
				res.send("Error Password");
			}else return next(err);
			
		});
		

	}).catch(function(err){
		if (err.code == 0){
			res.send("usuario no existe");
		
		}else return next(err);
		
		 
		
	});
}

function signin(req, res,next){
	var email = req.body.email;
	var password = req.body.password;
	var passwordEncriptada = encriptar(email,password);
	db.one("select * from users where email = ${email}",
		{
			email:email
		})
	.then(function(data){
		res.send("el usuario ya existe");
	}).catch(function(err){

		if (err.code == 0){
			var queri = "insert into users(email,password) values ('"+email+"','"+passwordEncriptada+"')";
			 console.log(queri)
			//si entra qui el usuario no existe
			/*db.none('insert into users(email,password) values ${email},${this^}',
				{
					email:email,
					passwordEncriptada:passwordEncriptada
				})*/
			db.none(queri)
			.then(function(data){
				res.send("insertado")

			}).catch(function(err){
				return next(err);
			});
						
		}else return next(err);

	})
		//si entro aqui es por que  el usuario existe, y  va a revisar la contraseña

}




module.exports = {
	login: login,
	signin: signin,
	authenticate: authenticate,
	updateOrCreateUser: updateOrCreateUser,
	getProfile: getProfile
}