var louis = require("../test/louis"),
	cowboy = require("../lib/cowboy"),
	http = require('http');


var latest_image;

var lou = new louis({
	freq: 1000,
	total: 10,
	imagepath: "/Users/troytherrien/Insync/info@th-ey.co/Teaching/Fall 2013/Site to Site/Github/depthcam/test/"
});

var boy = new cowboy();

//start the test setInterval
lou.start();

var threshold = 128;

var destination_path = "/Users/troytherrien/Insync/info@th-ey.co/Teaching/Fall 2013/Site to Site/Github/depthcam/test/masked/";

lou.on("data", function( err, depth_imagepath, rgb_imagepath ){
	console.log("depth: " + depth_imagepath);
	console.log("test rgb: " + rgb_imagepath);

	var file_timestamp = depth_imagepath.substring(depth_imagepath.lastIndexOf("/")+1, depth_imagepath.lastIndexOf("."));

	console.log("*** depth_imagepath: "+ depth_imagepath + '\n');

	console.log('*** file_timestamp: '+ file_timestamp + '\n');

	boy.mask(depth_imagepath, rgb_imagepath, destination_path, file_timestamp + ".png", threshold);
});


boy.on("done", function( image ){
	console.log('done');
	latest_image = image;
});


var server = http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Hello World\n");
});

server.listen(3000);
