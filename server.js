'use strict';

let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

app.get('/:id', function(req, res) {
	let id = req.params.id;
	console.log(id);
	console.time('render')
	res.render('index', {title: 'Infrastructure Task', message: 'Hello from the otherside!'});
	console.timeEnd('render')
});

app.listen(3000);
console.log('server running on port 3000');
