var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: []});
});

/* Autoload de comandos con :quizId */
router.param('quizId', quizController.load);

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
router.get('/quizes/new', quizController.new);

/* POST quizes/create */
router.post('/quizes/create', quizController.create);

/* GET quizes/:id/edit  */
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);

/* PUT quizes/:id  */
router.put('/quizes/:quizId(\\d+)', quizController.update);

/* DELETE quizes/:id  */
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

/* GET quizes/:id/comments/new  */
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);

/* POST quizes/:id/comments  */
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;
