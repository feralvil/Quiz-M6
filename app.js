var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

// Añadimos el MW express-partials:
var partials = require('express-partials');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Instalamos express-partials:
app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Helpers dinámicos
app.use(function (req, res, next){
  // Guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout/)){
    req.session.redir = req.path;
  }
   // Hacer visible req.session en las vistas:
   res.locals.session = req.session;
   next();
});

// Helper para hacer el auto-logout:
app.use(function (req, res, next){
  var fecha = new Date();
  var hora = fecha.getTime();
  if (req.session.ultima > 0){
    var dif = hora - req.session.ultima; // Diferencia desde la última interacción
    if (dif > 120000){ // Han pasado más de 2 minutos (120000 milisegundos)
      // Borramos las variables de sesión
      delete req.session.user;
      delete req.session.ultima;
    }
    else{
      // Actualizamos valores
      req.session.dif = dif; // Tiempo de inactividad
      req.session.ultima = hora; // Hora de última interacción
      res.locals.session = req.session; // Hacer visible req.session en las vistas
    }
  }
  else{
    // Actualizamos valores
    req.session.ultima = hora;
    req.session.dif = 0;
    res.locals.session = req.session;
  }
  next();
});

app.use('/', routes);

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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors: []
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors: []
  });
});


module.exports = app;
