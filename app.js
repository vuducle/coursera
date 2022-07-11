const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session")
const FileStore = require("session-file-store")(session)
var passport = require('passport');
var authenticate = require('./authenticate');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishRouter = require('./routes/DishRouter')
const promoRouter = require('./routes/PromoRouter')
const leaderRouter = require('./routes/LeaderRouter')
const mongoose = require('mongoose')
const config = require("./config")

const url = config.mongoUrl;

const connect = mongoose.connect(url, {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

connect.then(db => {
  console.log("Connected to server")
}, err => {
  console.log(err)
})

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishRouter.dishRouter);
app.use('/dishes', dishRouter.dishRouterId);
app.use('/promotions', promoRouter.promoRouter);
app.use('/promotions', promoRouter.promoRouterId);
app.use('/leaders', leaderRouter.leaderRouter);
app.use('/leaders', leaderRouter.leaderRouterId);

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
