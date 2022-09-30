var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const fs = require("fs")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {getLogger} = require("./utils/logger");
const {Random} = require("./utils/random");

var expressServer = express();
var logger = new getLogger()
let rawdata = fs.readFileSync('./settings.json');
let settings = JSON.parse(rawdata);

// view engine setup
expressServer.set('views', path.join(__dirname, 'views'));
expressServer.set('view engine', 'ejs');
expressServer.disable('x-powered-by')

expressServer.use(express.json());
expressServer.use(express.urlencoded({ extended: false }));
expressServer.use(cookieParser());
expressServer.use(express.static(path.join(__dirname, 'public')));

expressServer.use('/', indexRouter);
expressServer.use('/users', usersRouter);

// catch 404 and forward to error handler
expressServer.use(function(req, res, next) {
  next(createError(404));
});

// error handler
expressServer.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

expressServer.listen(settings["express"]["expressPort"], settings["express"]["expressHost"], function() {

  logger.info(`Currently loggerId: ${loggerId}`)
  logger.info("Starting websocket...")
  logger.info(`Websocket is listing on http://${settings["express"]["expressHost"]}:${settings["express"]["expressPort"]}/`)

})

module.exports = expressServer;
