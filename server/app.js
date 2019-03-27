require('dotenv').config()
var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')
const port = process.env.port || 3000

var app = express();

mongoose.connect(`mongodb+srv://${process.env.name}:${process.env.password}@cluster0-dlbfv.mongodb.net/hacktivoverflow?retryWrites=true`, {useNewUrlParser: true})

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var questionRouter = require('./routes/questions');
var answerRouter = require('./routes/answers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//basic route
// app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/questions', questionRouter);
app.use('/answers', answerRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

module.exports = app;