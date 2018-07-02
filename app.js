var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
let expressSessions = require('express-session');
let flash = require('connect-flash');
const winston = require('winston');
const Logger = require('./configuration/winston');
const hbsEmail = require('nodemailer-express-handlebars');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
var hbsUtils = require('hbs-utils') (hbs);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let loginRouter = require('./routes/login');
var registroRouter = require('./routes/registro');
let admin=require('./routes/admin');
var regeneration = require('./routes/regeneration');
var Multer = require('./routes/multer.js');


let loginFlash= require('./routes/login-flash');


var app = express();

//Getión de sesiones.
app.use(expressSessions({
  secret: 'GeekshubsAcademy',
  name:'SesionGeek',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

//view engine partials
hbsUtils.registerPartials(`${__dirname}/views/partials`);
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
//app.use(logger('combined', {stream: winston.sream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('components', express.static(`${__dirname}/public/components`));

app.use('/', indexRouter);
app.use('/admin', admin);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/registro', registroRouter);
app.use('/login-flash', loginFlash);
app.use('/regeneration',regeneration);
app.use('/multer', Multer);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  res.render('404');
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

//  404  error handlerbars
//app.use(function(req, res, next) {
//  app.get('views/404.hbs')
  //next(createError(404));
//});


module.exports = app;
