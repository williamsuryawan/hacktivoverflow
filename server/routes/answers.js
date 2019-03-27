var express = require('express')
var router = express.Router()
var AnswerController = require('../controllers/AnswerController')
const { authentication } = require('../middlewares/authentication')

router.use(authentication)

router.post('/', AnswerController.createAnswer)
router.get('/question/:questionId', AnswerController.findAnswerByQuestionId)
router.put('/upvote/:id', AnswerController.upvoteAnswer)
router.put('/downvote/:id', AnswerController.downvoteAnswer)
router.get('/one/:id', AnswerController.findAnswerById)
router.put('/:id', AnswerController.editAnswer)
router.delete('/:id', AnswerController.deleteAnswer)

module.exports = router