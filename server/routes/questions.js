var express = require('express');
var router = express.Router();
var QuestionController = require('../controllers/questionController')
const { authentication } = require('../middlewares/authentication')

router.get('/', QuestionController.findAll)
router.get('/:id', QuestionController.findById)

router.use(authentication)
router.post('/', QuestionController.createQuestion)
router.put('/:id', QuestionController.editQuestion)
router.put('/upvote/:id', QuestionController.upvoteQuestion)
router.put('/downvote/:id', QuestionController.downvoteQuestion)
router.delete('/:id', QuestionController.deleteQuestion)

module.exports = router;