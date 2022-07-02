const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session")
const FileStore = require("session-file-store")(session)

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const dishRouter = require('./routes/DishRouter')
const promoRouter = require('./routes/PromoRouter')
const leaderRouter = require('./routes/LeaderRouter')

const mongoose = require('mongoose')


const url = 'mongodb://localhost:27017/conFusion'
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
// app.use(cookieParser('Julia-Linda-Nguyen'));
app.use(session({
  name: "Nguyen",
  secret: "Julia-Linda-Nguyen",
  saveUninitialized: true,
  resave: false,
  store: new FileStore()
}))

function auth (req, res, next) {
  console.log(req.session);
  if (!req.session.user) {
      var authHeader = req.headers.authorization;
      if (!authHeader) {
          var err = new Error('You are not authenticated!');
          res.setHeader('WWW-Authenticate', 'Basic');              
          err.status = 401;
          next(err);
          return;
      }
      var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      var user = auth[0];
      var pass = auth[1];
      if (user == 'admin' && pass == 'password') {
          // res.cookie('user','admin',{signed: true});
          req.session.user = "admin"
          next(); // authorized
      } else {
          var err = new Error('You are not authenticated!');
          res.setHeader('WWW-Authenticate', 'Basic');              
          err.status = 401;
          next(err);
      }
    }
    else {
        if (req.session.user === 'admin') {
            console.log('req.session: ',req.session);
            next();
        }
        else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
  
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter.dishRouter);
app.use('/dishes', dishRouter.dishRouterId);
app.use('/promotions', promoRouter.promoRouter);
app.use('/promotions', promoRouter.promoRouterId);
app.use('/leaders', leaderRouter.leaderRouter);
app.use('/leaders', leaderRouter.leaderRouterId);

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
