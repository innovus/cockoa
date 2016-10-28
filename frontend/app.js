//archivo de propiedades
require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require("uglify-js");
var fs = require("fs");
var app = express();
var appClientFiles = ['app_client/docentes/app.js', ];
var appClientFiles2 = ['app_client/app.js', ];
/*
var uglified= uglifyJs.minify(appClientFiles, {compress:false});
fs.writeFile('public/angular/tienda.min.js', uglified.code, function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Script generated and saved: tienda.min.js");
  }
});

*/
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'app_client/estudiantes')));
app.use(express.static(path.join(__dirname, 'app_client/docentes')));
/*
app.use(function(req,res){
    res.sendFile(path.join(__dirname,'app_client/estudiantes','index.html'));
});
*/
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'app_client/docentes', 'index.html'));
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        if (err.name === "UnauthorizedError") {
            res.status(401);
            res.json({
                "message": err.name + ":" + err.message
            });
        } else {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        }
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message);
    res.json({
        "error": "error sevidor :("
    });
});
module.exports = app;