var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var verifyEmail = require('./routes/verifyEmail');
var reset   = require('./routes/reset');
var login = require('./routes/login');
var verify = require('./routes/verify');
var resetPassword = require('./routes/resetPassword');
var session  = require('./routes/session');
var saveImage = require('./routes/saveImage');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('views'));
app.use(cors());


app.use('/users', users);
app.use('/login', login);
app.use('/verifyEmail', verifyEmail);
app.use('/reset', reset);
app.use('/verify',verify);
app.use('/resetPassword', resetPassword);
app.use('/createSession', session);
app.use('/viewSession', session);
app.use('/saveImage', saveImage);


var __databaseURLS = [
    {
        uri     : 'mongodb://basic:basic@ds117485.mlab.com:17485/basicapp',
        dbName  : 'basicdb'
    }
]

var __selectedDatabase = __databaseURLS[0];

mongoose.connect( __selectedDatabase.uri);

var db = mongoose.connection;
db
.on('connected', function() {
    console.log(' Database   : ' , __selectedDatabase.dbName);
})

.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.get('*', function(req, res) {
  res.sendFile("index.html",{root:__dirname}); // load the single view file (angular will handle the page changes on the front-end)
  // res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
