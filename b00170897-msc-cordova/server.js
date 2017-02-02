var express = require('express');
var request = require('request');
var app  = express();

app.use( express.static(__dirname + '/www') );

/* This is our proxy handler to get around CORS when developing locally, won't fire in production */
app.get('/search/', function(req, res) {

	var paramStr = req._parsedOriginalUrl.query;
	var apiUrl = "http://itunes.apple.com/search?" + paramStr;
	var reqUrl = apiUrl + paramStr;

	request({
		url: reqUrl,
		json: true
	}, function (error, response, body) {

		if (!error && response.statusCode === 200) {
		    //console.log(body) // Print the json response
		    res.send(body);
		}
		else{
			res.send(false);
		}
	});

	console.log('Got a request from host:', req.hostname, 'Origin:', req.headers.origin)
});

app.all('*', function (req, res, next) {
  // Just send the index.html for other files to support HTML5Mode   include a base tag inside your index html
	res.sendFile('www/manifest.json', { root: __dirname });
});

app.listen(8100);
console.log('Listening on port', 8100);