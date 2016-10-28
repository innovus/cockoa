var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors')

var config = require('./config/config');


var routes = require('./routes/index').router;
var index = require('./routes/index').index;
var partials = require('./routes/index').partials;

var users = require('./routes/users');
var inasistencias = require('./routes/api/inasistencia');
var cursos = require('./routes/api/cursos');
var estudiantes = require('./routes/api/estudiantes');
var docentes = require('./routes/api/profesores');
var todos = require('./routes/api/todos');

var apis = require('./routes/api/index');
var auth = require('./routes/api/auth').router;


var app = express();
app.use(cors());


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'prueba'
}));

app.use('/', routes);
app.use('/users', users);
app.use('/api',apis );
app.use('/auth',auth );
app.use('/inasistencias', inasistencias);
app.use('/api/cursos', cursos);
app.use('/estudiantes', estudiantes);
app.use('/api/docentes', docentes);
app.use('/api/todos', todos);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


app.get('/', index);
app.get('/partials/:filename', partials);
//app.use(index);

//app.get('*', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// view engine setup




// error handlers

// development error handler
// will print stacktrace
/*
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}*/

// production error handler
// no stacktraces leaked to user
/*
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});*/

app.listen(3001, function(){
  console.log('Servidor iniciado con express. Localhost Escuchando el puerto 3001')
})


module.exports = app;
