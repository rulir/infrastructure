'use strict';

let express = require('express');
let path = require('path');

//new express app
let app = express();

app.set('port', process.env.PORT || 5000);

//init pug tamplating
app.set('view engine', 'pug');

//add static
app.use(express.static(path.join('public')));

app.get('/', function(req, res) {
	console.time('render');
	res.render('index', {
		title: 'Infrastructure Task',
		message: 'Введите любой текст на русском языке'
	});
	console.timeEnd('render');
});

app.get('/replaced-string', function(req, res) {
	let inputString = req.query.sourceString;
	console.log(inputString);
	let outputString = alphabetPosition(inputString);
	console.log(outputString);
	res.render('replaced-string', {
		title: 'Infrastructure Task',
		message: 'Каждая цифра соответствует позиции буквы в русском алфавите',
		resultString: outputString
	});
});

function alphabetPosition(text) {
	let positions = [];
	text.toLowerCase().split('').forEach(function(val, i) {
		if (val.charCodeAt() > 1071 && val.charCodeAt() < 1104) {
			positions.push(val.charCodeAt() - 1071);
		}
	});
	return positions.join(' ');
}

// for catch 404-error and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//starting server on port 3000
app.listen(app.get('port'), function() {
	console.log('server running on port ', app.get('port'));
});