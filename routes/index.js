var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

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
  res.render('author');
});

/* GET quizes/new */
router.get('/quizes/new', quizController.new);

/* POST quizes/create */
router.post('/quizes/create', quizController.create);


module.exports = router;
