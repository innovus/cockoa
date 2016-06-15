var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',validarSession, function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 /* enviar parametros por post*/
router.post('/', function(req, res, next) {
	console.log(req);
	if(!req.session.token){

		req.session.token = req.body.token.accessToken;
		req.session.id_usuario = req.body.user.id_usuario;
		req.session.tipo_usuario = req.body.user.tipo_usuario;
		//console.log(req.session.token);
		res.render('index', { title: 'Express' });
	}
	else{
		console.log(req.session.token);
		res.redirect('./');
		//res.render('index', { title: 'Express' });

	}
	
});

router.get('/estudiantes/asistencias', function(req, res, next) {
  res.render('asistencia_estudiante');
});

function validarSession(req,res,next){
	if(req.session.token){
		next();
	}else{
		
	 	res.redirect('/auth/loginn');
	 }
}

module.exports = router;
