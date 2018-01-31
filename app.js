var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser');

//Model
var User = require('./models/users')
var Transaction = require('./models/transactions')

//mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/money_transaction')

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy

var routes = require('./routes/index');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var auth = require('./routes/auth');

var config = require('./config/config')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'abcdefgh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 6000000
  }
}))
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy(User.authenticate()))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/dashboard/users', users);
app.use('/dashboard', dashboard);
app.use('/auth', auth);


passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
