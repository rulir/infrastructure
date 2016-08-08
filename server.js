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
	let id = req.params.id;
	console.time('render')
	res.render('index', {title: 'Infrastructure Task', message: 'Hello from the otherside!'});
	console.timeEnd('render')
});

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
