var express = require('express');
var router = express.Router();
//var users = require('../queries/users');


var userController = require('../../controllers/UserController');

var promise = require('bluebird');
var crypto = require('crypto')
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);


///////////////////
//////passport modules/////
///////////////////
const SECRET = 'server secret';
const passport = require('passport');  
const Strategy = require('passport-local');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const authenticate = expressJwt({
  secret: SECRET
});
const TOKENTIME = 120 * 60; // in seconds



// server responses //
//////////////////////
const respond = {
  auth: function(req, res) {
    res.status(200).json({
      user: req.user,
      token: req.token
    });
    //res.status(401).json({ prueba:3})
  },
  token: function(req, res) {
    res.status(201).json({
      token: req.token
    });
  },
  reject: function(req, res){
    res.status(204).end();
  }
};

//////////////
// passport //
//////////////

passport.use(new Strategy({
   usernameField: 'identificacion',
   passwordField: 'password'
},
function(identificacion, password, done) {
   userController.authenticate(identificacion,password,done);
}));


/*
router.get('/registrar', function(req, res) {
  res.sendfile('./views/login.html');
});
router.post('/signin', users.signin);
router.post('/login',users.login);



router.post('/login1',passport.initialize(), passport.authenticate(
  'local', {
    session: false,
    scope: []
  }), serializeUser, generateAccessToken, respond.auth);
*/
/*
app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});*/



router.post('/login', prueba, passport.initialize(), passport.authenticate(
    'local', {
      session: false,
     // failureFlash: true,
      scope: []
    }), serializeUser, generateAccessToken, respond.auth);

//////////new///
////////////

router.get('/me', authenticate, function(req, res) {
  console.log(req.user);
  res.status(200).json(req.user);
});

router.get('/profile', authenticate, function(req, res) {
  //console.log(req.user);
  userController.getProfile(req.user.id,function(data){
    res.json(data);

  })
  
});




/*
router.post('/tipo/:id', validateRefreshToken,generateAccessToken, prueba, authenticate, function(req, res) {

  dbb.one("select * from tipo where id = ${id}",
    {
      id:req.params.id
    }).then(function(data){
      res.status(200).json(data);

    }).catch(function(err){
      res.status(401).json(err);
    });
 // res.status(200).json(req.user);
});
*/
/*
router.get('/tipo/:id', authenticate, function(req, res) {

  dbb.one("select * from tipo where id = ${id}",
    {
      id:req.params.id
    }).then(function(data){
      res.status(200).json(data);

    }).catch(function(err){
      res.status(401).json(err);
    });
 // res.status(200).json(req.user);
});
*/

/////////////
////helper///
/////////////

function prueba(req,res,next){
 console.log("entro")
  next();

}


function serializeUser(req, res, next) { 
console.log("serialize"); 
  userController.updateOrCreateUser(req.user, function(err, user){
    if(err) {
      console.log("error if error"); 
      return next(err);}
    // we store the updated information in req.user again
    req.user = {
      id_usuario: user.id_usuario,
      tipo_usuario: user.id_tipo_usuario
    };
    console.log(req.user);
    next();
  });
}


//////////////////////
// token generation //
//////////////////////
function generateAccessToken(req, res, next) {
  console.log("entro a generate acces token")
  req.token = req.token ||  {};
  req.token.accessToken = jwt.sign({
    id: req.user.id_usuario,
  }, SECRET, {
    expiresIn: TOKENTIME
  });
  //res.headers = "Authorization","Bearer "+req.token.accessToken;
 console.log(req.token.accessToken); 
  /*console.log(res.getHeader('Authorization'));
  console.log(res);*/
  /*req({headers: {
    'Authorization':'Bearer '+req.token.accessToken
  }})*/
  console.log("antes del next")

  next();
}



//////////////////////


module.exports = {
  router: router,
  authenticate: authenticate,

}
