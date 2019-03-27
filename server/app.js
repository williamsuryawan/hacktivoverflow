require('dotenv').config()
var express = require('express');
var mongoose = require('mongoose')
var cors = require('cors')
const port = process.env.port || 3000
const cron = require('node-cron');
const { send } = require('./helpers/nexmosms')
const kue = require('kue')
const queue = kue.createQueue()

var app = express();

mongoose.connect(`mongodb+srv://${process.env.name}:${process.env.password}@cluster0-dlbfv.mongodb.net/hacktivoverflow?retryWrites=true`, {useNewUrlParser: true})

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var questionRouter = require('./routes/questions');
var answerRouter = require('./routes/answers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//basic route
// app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/questions', questionRouter);
app.use('/answers', answerRouter);

let cronEveryMonth = '0 7 1 * *'
cron.schedule(cronEveryMonth, () => {
    send(`Happy new month! Dont forget to work hard and refresh your day during weekend!`)
});

queue.process('welcome-newuser', (job, done) => {
    send(`Hello ${job.data} has just registered!`);
    done();
})
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

module.exports = app;