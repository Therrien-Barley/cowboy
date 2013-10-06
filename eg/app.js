var louis = require("../test/louis"),
	cowboy = require("../lib/cowboy"),
	http = require('http');



var server = http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Hello World\n");
});

server.listen(3000);



var lou = new louis({
	freq: 1000,
	total: 10
});

var boy = new cowboy();

lou.start();



lou.on("data", function( mask, bg ){
	boy.mask(mask, bg);
});


boy.on("done", function( image ){
	console.log('done');
});