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
/*
function partials(req, res){
  var filename = req.params.filename;
  if(!filename) return;  // might want to change this
  res.render("partials/" + filename );
};
function index(req, res){
  res.render('index', {message:"Hello!!!"});
};*/

router.get('/estudiantes/asistencias', validarSession,function(req, res, next) {
  res.render('asistencia_estudiante');
});

router.get('/docentes/cargas', /*validarSession,*/function(req, res, next) {
  res.render('index_profesor');
});

router.get('/estudiantes/notas', /*validarSession,*/function(req, res, next) {
  res.render('notas');
});


function validarSession(req,res,next){
	if(req.session.token){
		next();
	}else{
		res.redirect('/auth/loginn');
	}
}

module.exports = router;

