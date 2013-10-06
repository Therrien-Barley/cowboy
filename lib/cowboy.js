var gm = require("gm"),
	events = require("events"),
	util = require("util");


function cowboy(){
	

}

util.inherits( cowboy, events.EventEmitter );

cowboy.prototype.mask = function(mask, bg){
	
	var self = this;
	var filename; //filename of image to return

	//mask image using gm and write it to filename
	/*
	gm('/path/to/image.jpg')
		.resize(353, 257)
		.autoOrient()
		.write(writeStream, function (err) {
		if (!err) console.log(' hooray! ');
	});
	*/

	filename = 'test';

	//on successful image processing
	self.emit( "done", filename );
};

module.exports = cowboy;