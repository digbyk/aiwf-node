var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var db = require('./app/model/db');

var app = express();

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

require('./app/auth')(passport);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(express.methodOverride());
app.use(cookieParser());
app.use(session({
	store: new RedisStore(),
	secret: 'SEKR37ly',
	saveUninitialized: true,
	resave: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

require('./app/routes/index')(app, passport);
require('./app/routes/home')(app, passport);
require('./app/routes/gifts')(app);
require('./app/routes/lists')(app);

module.exports = app;
//var server = http.createServer(app).listen(app.get('port'), function () {
//	console.log('Express server listening on port ' + app.get('port'));
//});
