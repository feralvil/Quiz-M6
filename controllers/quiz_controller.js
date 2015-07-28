var models = require('../models/models.js');

// Autoload - factoriza el código si la ruta incluye :quizId
exports.load = function (req, res, next, quizId){
  models.Quiz.find(quizId).then(
    function (quiz){
      if (quiz){
        req.quiz = quiz;
        next();
      }
      else{
        next (new Error('No existe el quiz con quizId = ' + quizId));
      }
    }
  ).catch (function(error){next(error);});
};

// GET /quizes
exports.index = function (req,res){
  var textoresp = "No se han encontrado preguntas"
  if (req.query.search){
    var search = '%' + req.query.search.replace(' ', '%') + '%';
    models.Quiz.findAll({where: ["pregunta like ?", search]}).then(
      function(quizes){
        if (quizes){
          textoresp = 'Se han encontrado ' + quizes.length + ' preguntas con el término ' + req.query.search;
        }
        res.render('quizes/index', {quizes: quizes, textoresp: textoresp})
      }
    ).catch (function(error){next(error);});
  }
  else{
    models.Quiz.findAll().then(
      function (quizes){
        var textoresp = 'Se han encontrado ' + quizes.length + ' preguntas';
        res.render('quizes/index', {quizes: quizes, textoresp: textoresp});
      }
    ).catch (function(error){next(error);});
  }

};

// GET /quizes/:id
exports.show = function (req,res){
  res.render('quizes/show', {quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function (req,res){
  var resultado = "La respuesta es Incorrecta";
  if (req.query.respuesta === req.quiz.respuesta){
    resultado = "La respuesta es Correcta";
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};
