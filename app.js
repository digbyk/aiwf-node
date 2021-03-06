var conf = require('nconf');
conf.argv()
	.env()
	.file({
		file: './config.json'
	});
console.log(conf.get('auth:google:clientID'));

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var db = require('./model');

var app = express();

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

require('./auth')(passport);

// all environments
//app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	store: new RedisStore(),
	secret: 'SEKR37ly',
	saveUninitialized: true,
	resave: true
}))
app.use(passport.initialize());
app.use(passport.session());

require('./routes/index')(app, passport);
require('./routes/home')(app, passport);
require('./routes/gifts')(app);
require('./routes/lists')(app);
require('./routes/api')(app);

app.use(function (req, res, next) {
	res.status(404).send('Sorry cant find that!');
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + server.address().port);
});
