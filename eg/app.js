var louis = require("../test/louis"),
	cowboy = require("../lib/cowboy");


var latest_image;

var lou = new louis({
	freq: 1000,
	total: 10,
	imagepath: "../test/"
});

var boy = new cowboy();

//start the test setInterval
lou.start();

var threshold = 128;

var destination_path = "../masked/";

lou.on("data", function( err, depth_imagepath, rgb_imagepath ){

	var file_timestamp = depth_imagepath.substring(depth_imagepath.lastIndexOf("/")+1, depth_imagepath.lastIndexOf("."));

	boy.mask(depth_imagepath, rgb_imagepath, destination_path, file_timestamp + ".png", threshold);
});


boy.on("done", function( image ){
	console.log('done');
	latest_image = image;
});

