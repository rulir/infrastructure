'use strict';

const express = require('express');
const path = require('path');

//func for calculate position in alphabet
const alphabetPosition = require('./resources/alphabet-position');

//new express app
const app = express();

app.set('port', process.env.PORT || 5000);

//init pug tamplating
app.set('view engine', 'pug');

//add static
app.use(express.static(path.join('public')));

//initial state
app.get('/', function(req, res) {
	console.time('render'); // eslint-disable-line no-console
	res.render('index', {
		title: 'Infrastructure Task',
		message: 'Введите любой текст на русском языке'
	});
	console.timeEnd('render'); // eslint-disable-line no-console
});

//favicon request interceptor
app.get('/favicon.ico', function(req, res) {
	console.log('favicon req'); // eslint-disable-line no-console
	res.setHeader('Content-Type', 'image/x-icon');
	res.status('200').send('OK');
	res.end();
});

//result state
app.get('/replaced-string', function(req, res) {
	let inputString = req.query.sourceString;
	let outputString = alphabetPosition(inputString);
	console.time('render'); // eslint-disable-line no-console
	res.render('replaced-string', {
		title: 'Infrastructure Task',
		message: 'Каждая цифра соответствует позиции буквы в русском алфавите',
		resultString: outputString
	});
	console.timeEnd('render'); // eslint-disable-line no-console
});

// for catch 404-error and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//starting server
app.listen(app.get('port'), function() {
	console.log('server running on port ', app.get('port')); // eslint-disable-line no-console
});