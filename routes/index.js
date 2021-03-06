var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: []});
});

/* Autoload de comandos con :quizId */
router.param('quizId', quizController.load);
/* Autoload de comandos con :commentId */
router.param('commentId', commentController.load);

/* Definición de rutas de session */
/* GET login/ */
router.get('/login', sessionController.new);
/* POST login/ */
router.post('/login', sessionController.create);
/* GET logout/ */
router.get('/logout', sessionController.destroy);

/* Definición de rutas de quizes */
/* GET quizes/ */
router.get('/quizes', quizController.index);
/* GET quizes/:id */
router.get('/quizes/:quizId(\\d+)', quizController.show);
/* GET quizes/:id/answer */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
/* GET author page. */
router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Autor', errors: []});
});
/* GET quizes/new */
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
/* POST quizes/create */
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
/* GET quizes/:id/edit  */
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
/* PUT quizes/:id  */
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
/* DELETE quizes/:id  */
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);
/* GET quizes/new */
router.get('/quizes/statistics', sessionController.loginRequired, quizController.statistics);

/* Definición de rutas de comments */
/* GET quizes/:id/comments/new  */
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
/* POST quizes/:id/comments  */
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
/* POST quizes/:id/comments  */
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish );

module.exports = router;
