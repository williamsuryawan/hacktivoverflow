const Question = require('../models/question.js')
const Tag = require('../models/tag.js')

class questionController {
    static createQuestion (req,res,next) {
      console.log("masuk ke method create question", req.body,  req.loggedInUser)  
      Question
          .create({
            author: req.loggedInUser._id,
            title: req.body.title,
            description: req.body.description,
            // tags: tags.map(tag => tag._id)
          })
      .then(newquestion => {
        res.status(201).json({
            msg: "create question success",
            data: newquestion
          })
      })
      .catch(err => {
        res.status(400).json({
            msg: "create question fail",
            err
          })
      })
    }

    static findAll(req, res, next) {
        let query = {}
        
        if (req.query.q) {
          query = {
            $or: [{tags:{
              $regex: '.*' + req.query.q + '.*',
              $options: "i"
             }},{title: {
              $regex: '.*' + req.query.q + '.*',
              $options: "i"
            }}]
          }
        }
    
        Question
          .find(query)
          .populate('author')
          .then(questions => {
            res.status(200).json({
                msg: "get data success",
                questions
              })
          })
          .catch(err => {
            res.status(404).json({
                msg: "not found",
                err
              })
          })
      }

      static findById(req, res, next) {
        Question
          .findById(req.params.id)
          .populate('tags')
          .populate('author')
          .populate({
            path: 'answers',
            populate: { path: 'author' }
          })
          .then(question => {
            if (!question) {
              res.status(404).json({
                  msg: 'question not found'
                })
            } else {
              res.status(200).json({
                  msg: 'fetch data success',
                  data: question
                })
            }
          })
          .catch(err => {
            res.status(400).json({
                msg: 'fetch failed',
                err
              })
          })
      }
      
      static upvoteQuestion (req, res, next) {
        console.log("method upvoteQuestion", req.params, req.loggedInUser)
        Question
          .findOne({ '_id': req.params.id })
          .then(result => {
            console.log("hasil find question to upvote", result)
            let upVoter = false;
            let downVoter = false;
            let upIndex = 0
            let downIndex = 0
    
            result.upvoters.forEach((up, index) => {
              if (up.toString() == req.loggedInUser._id.toString()) {
                upVoter = true
                upIndex = index
              }
            })
    
            result.downvoters.forEach((down, index) => {
              if (down.toString() == req.loggedInUser._id.toString()) {
                downVoter = true
                downIndex = index
              }
            })
            console.log("hasil verifikasi up/down voter", result, upVoter, upIndex, downVoter, downIndex)
            if (!upVoter) {
              if (downVoter) {
                result.downvoters.splice(downIndex, 1)
              }
              console.log('masuk ini 1')
              result.upvoters.push(req.loggedInUser._id)
              return result
                .save()
                .then(() => {
                  res.status(200).json({
                      msg: "upvote success",
                      result
                    })
                })
            } else {
              console.log('masuk ini 2')
              result.upvoters.splice(upIndex, 1)
              return result
                .save()
                .then(() => {
                  res.status(200).json({
                      msg: "undo upvote success"
                    })
                })
            }
          })
          .catch(err => {
            res.status(500).json({
                msg: "upvote fail",
                err
              })
          })
      }  

      static downvoteQuestion (req,res,next) {
          Question.findOne({_id: req.params.id})
          .then(result => {
              let upVoter = false;
              let downVoter = false;
              let upIndex = 0
              let downIndex = 0

              result.upvoters.forEach((up, index) => {
                  if(up.toString() == req.loggedInUser._id.toString()) {
                      upVoter = true;
                      upIndex = index;
                  }
              })
              result.downvoters.forEach((down, index) => {
                  if(down.toString() == req.loggedInUser._id.toString()) {
                      downVoter = true;
                      downIndex = index;
                  }
              })

              if(!downVoter) {
                if(upVoter) {
                  result.upvoters.splice(upIndex,1)
                }
                result.downvoters.push(req.loggedInUser._id)
                return result.save()
                  .then(() => {
                    res.status(200).json({
                      msg: "downvote success",
                      result
                    })
                  })
              } else {
                result.downvoters.splice(downIndex, 1)
                return result
                  .save()
                  .then(() => {
                    res.status(200).json({
                        msg: "undo downvote success"
                      })
                  })
              }
              
          })
          .catch(err => {
            res.status(500).json({
                msg: "downvote fail",
                err
              })
          })
      }

      static editQuestion (req, res, next) {
        console.log("Masuk ke edit question", req.body, req.loggedInUser, req.params.id)
        Question
          .findOne({"_id": req.params.id})
        .then (question => {
            // let editDate = checkDate(req.body.updatedAt)
            console.log("Hasil pencarian question: ", question)
            if (question.author.toString() == req.loggedInUser._id.toString()) {
              Question.findOneAndUpdate({
                _id: req.params.id
              }, {
                  title: req.body.title,
                  description: req.body.description
              }, {new: true})
              .then(questionupdate => {
                  console.log("Hasil Edit", questionupdate)
                  res.status(200).json(questionupdate)
              })
              .catch (error => {
                  res.status(500).json({
                      msg: 'ERROR: ',error
                  })
              })
            } else {
              res
                .status(401)
                .json({
                  msg: "unauthorized access"
                })
            }
            
             
        })
        .catch(error=>{
            res.status(500).json({
                msg: 'ERROR in finding your question to edit ',error           
            }) 
            console.log(error)
        })
      }

      static deleteQuestion (req,res,next) {
        Question
        .findOne({ _id: req.params.id })
        .then(question => {
          if (question.author.toString() == req.loggedInUser._id.toString()) {
            Question
              .findOneAndDelete({ _id: req.params.id })
              .then(questiondelete => {
                console.log("Hasil Delete", questiondelete)
                res.status(200).json({
                    msg: "delete success",
                    question
                  })
              })
          } else {
            res
              .status(401)
              .json({
                msg: "unauthorized access"
              })
          }
        })
        .catch(err => {
          res
            .status(400)
            .json({
              msg: "delete failed",
              err
            })
        })
      }

}

module.exports = questionController;