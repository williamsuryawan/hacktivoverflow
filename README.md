# hacktivoverflow by William Suryawan

## Base URL
### Server: http://localhost:3000
### Admin: http://localhost:8080
### Deploy: 

## User Routing
Routing | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/users/login|POST||email:String(**Required**)<br>password:String(**Required**)|Error:<br>Wrong username/password<br>Success:<br>login success|login to the website
/users/register|POST||name:String(**Required**)<br>email:String(**Required**)<br>password:String(**Required**)|Error:<br>email have been registered<br>Success:<br>users have been login successfully|register new user to the website


## Question Routing

Routing | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/questions/|GET|token:**Not Required**||Error:<br>Internal server error<br>Success:<br>show the question list|view all questions available <br> (all users without any login can view)
/questions/:id|GET|token:**Not Required**||Error:<br>Internal server error<br>Success:<br>show one question|view question by questionId <br> (all users without any login can view)
/questions/ |POST|token:String(**Required**)|title:String(**Required**)<br>description:string(**Required**)|Error:<br>Internal server error<br> No token available <br>Success:<br>success create new question to the website|add question to Hacktiv Overflow
/questions/upvote/:id|PUT|token:String(**Required**) <br> id:String(**Required**)||Error:<br>Internal server error<br> No token available <br>Success:<br>upvote question success|upvote question by questionId (one user can't put more than one upvote per question)
/questions/downvote/:id|PUT|token:String(**Required**) <br> id:String(**Required**)||Error:<br>Internal server error<br> No token available <br>Success:<br>upvote question success|downvote question by questionId (one user can't put more than one downvote per question)
/questions/edit/:id|PUT|token:String(**Required**) <br> questionId:String(**Required**)||Error:<br>Internal server error<br> Not valid author Token <br>Success:<br>edit question success|delete question from Hacktiv Overflow (authorization: need to be the author)
/questions/delete/:id|DELETE|token:String(**Required**) <br> questionId:String(**Required**)||Error:<br>Internal server error<br> Not valid author Token <br>Success:<br>delete question success| delete question from Hacktiv Overflow (authorization: need to be the author)


## Answer Routing

Routing | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/answers/question/:id|GET|token:String(**Required**)||Error:<br>Internal server error<br>Success:<br>show all answers based on question|find all answers based on questionId
/answers/one/:id|GET|token:String(**Required**)||Error:<br>Internal server error<br>Success:<br>show one specific answer|find one answer based on answerId
/answers/ |POST|token:String(**Required**)|content:String(**Required**)<br>questionId:string(**Required**)|Error:<br>Internal server error<br> No token available <br>Success:<br>success create new answer to one specific question|add question to Hacktiv Overflow
/answers/upvote/:id|PUT|token:String(**Required**) <br> id:String(**Required**)||Error:<br>Internal server error<br> No token available <br>Success:<br>upvote answer success|upvote answer by answerId (one user can't put more than one upvote per answer)
/answers/downvote/:id|PUT|token:String(**Required**) <br> id:String(**Required**)||Error:<br>Internal server error<br> No token available <br>Success:<br>upvote answer success|downvote answer by answerId (one user can't put more than one downvote per answer)
/answers/:id|PUT|token:String(**Required**) <br> answerId:String(**Required**)||Error:<br>Internal server error<br> Not valid author Token <br>Success:<br>edit answer success|delete answer from Hacktiv Overflow (authorization: need to be the author)
/answers/:id|DELETE|token:String(**Required**) <br> answerId:String(**Required**)||Error:<br>Internal server error<br> Not valid author Token <br>Success:<br>delete answer success| delete answer from Hacktiv Overflow (authorization: need to be the author)


## CRON and Background Job
```
SMS for new user registration
SMS for every month on day 1 at 7 AM
SMS API with Nexmo
```