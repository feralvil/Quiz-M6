// MW de autorización de accesos HTTP:
exports.loginRequired = function (req, res, next){
  if (req.session.user){
    next();
  }
  else{
    res.redirect('/login');
  }
}

// GET /login
exports.new = function (req,res){
  var errors = req.session.errors || {};
  req.session.errors = {};
  res.render('sessions/new', {errors: errors});
};

// POST /login
exports.create = function (req,res){
  var login = req.body.login;
  var password = req.body.password;

  var userController = require('./user_controller');
  userController.autenticar(login, password, function(error, user) {
    if (error){
      req.session.errors = [{"message": "Error de Autenticación: " + error}];
      res.redirect('/login');
      return;
    }

    // Crear req.session.user y guardar campos id y username
    // La sesión se define por la existencia de: req.session.user
    req.session.user = {id: user.id, username: user.username};

    // redirección a path anterior a login:
    res.redirect(req.session.redir.toString());
  });
};

// GET /logout
exports.destroy = function (req,res){
  delete req.session.user;
  // redirección a path anterior a login:
  res.redirect(req.session.redir.toString());
};
