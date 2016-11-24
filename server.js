var express = require('express');
var app = express();

app.get('/', function(request, response) {
	response.send('Hi');
});

app.listen(3000, function() {
	console.log('listening on 3000');
});
