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
const uploadRouter = require('./routes/uploadRouter')
const favoriteRouter = require('./routes/favoriteRouter')
const mongoose = require('mongoose')
const config = require("./config")
const cors = require("cors")
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

app.all("*", (req,res,next) => {
  if (req.secure) {
    return next();
  } else {
    res.redirect(307, "https://" + req.hostname + ":" + app.get("secPort") + req.url);
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  name: 'session-id',
  secret: 'Jesus-Loves-w@ch!ra-so-Much!!',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));
app.use(passport.initialize());
app.use(passport.session())

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, '')));

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload',uploadRouter);
app.use('/favorites',favoriteRouter);


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
