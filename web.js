var express = require('express');
var fs = require('fs');
var path= require('path');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
	var filePath = path.join(__dirname, 'index.html');
    var stat = fs.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});