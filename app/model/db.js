var mongoose = require('mongoose');
var url = 'mongodb://node:node@ds057548.mongolab.com:57548/aiwf';

//mongoose.connect('mongodb://localhost/aiwf');
mongoose.connect(url, {
	server: {
		auto_reconnect: true
	}
});

mongoose.connection.on('connected', function () {
	console.log('Mongoose connected');
});

mongoose.connection.on('error', function (err) {
	console.log('Mongoose connection error: ' + err);
	mongoose.connect(url, {
		server: {
			auto_reconnect: true
		}
	});
});

mongoose.connection.on('disconnected', function () {
	console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});

require('./user');
require('./gift');
require('./list');
