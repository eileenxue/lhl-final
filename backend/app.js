const PORT = process.env.PORT || 3005;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const usersRouter = require('./routes/users');
const testsRouter = require('./routes/tests');
const questionsRouter = require('./routes/questions');


app.use('/api/users', usersRouter);
app.use('/api/tests', testsRouter);
app.use('/api/questions', questionsRouter);

app.get("/api/authentication") // how do you kow if the user is logged in if you need to refresh? 
app.post("/api/login") // why not get again ????/ insert and return back the user object 
app.post("/api/register")


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
