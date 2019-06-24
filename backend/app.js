var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var db = require('./db-config.json');                                                                    

var con = mysql.createConnection({
  host     : db.host,
  user     :  db.user,
  password : db.password,
  database : db.database
})

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');

app.use(session({
  secret: 'my key',           //이때의 옵션은 세션에 세이브 정보를 저장할때 할때 파일을 만들꺼냐
                              //아니면 미리 만들어 놓을꺼냐 등에 대한 옵션들임
  resave: true,
  saveUninitialized:true
}));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var joinRouter = require('./routes/join');
var likeRouter = require('./routes/like');
var postRouter = require('./routes/post');
var logoutRouter = require('./routes/logout');

var testRouter = require('./routes/test');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test',testRouter);
app.use('/join',joinRouter);
app.use('/like',likeRouter);
app.use('/post',postRouter);
app.use('/logout',logoutRouter);
app.use('/login',loginRouter);

var con = mysql.createConnection({
  host     : db.host,
  user     :  db.user,
  password : db.password,
  database : db.database
})

// view engine setup

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
