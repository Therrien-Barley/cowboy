var gm = require("gm"),
	events = require("events"),
	util = require("util"),
	spawn = require("child_process").spawn,
	fs = require("fs"),
	exec = require('child_process').exec;

var imgdir = "/home/provolot/www/cowboy/images/";
var depthdir = imgdir + "depth/";
var rgbdir = imgdir + "rgb/";
var resultdir = "results/"
var threshold = "70%";

// the process id of the process spawned to take photos/video
var child_process = null;

// Exit strategy to kill child process
// (eg. for timelapse) on parent process exit
process.on('exit', function() {
	if(PROCESS_RUNNING_FLAG){
		child_process.kill();
	}
});

function cowboy(){
	
}

util.inherits( cowboy, events.EventEmitter );

cowboy.prototype.mask = function(depth, rgb){
	
	var self = this;
	var filename; //filename of image to return
 
	filename = resultdir + depth; //filename = depth = rgb because all images have 1.jpg, 2.jpg as their convention


	var gmcommand = "convert";
	var gmargs = depthdir + depth + " -colorspace Gray -write mpr:mask +delete mpr:mask -fill white -opaque black -write mpr:mask +delete mpr:mask -threshold " + threshold + " -write mpr:mask +delete mpr:mask -negate -write mpr:mask +delete " + rgbdir + rgb + " mpr:mask -alpha Off -compose CopyOpacity -composite " + filename;

	gmargs = gmargs.split(" ");

	this.child_process = spawn(gmcommand, gmargs);
	child_process = this.child_process;

	  this.child_process.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
		dout = data;
	  });

	  this.child_process.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
		derr = data;
	  });

	this.child_process.on('close', function (code) {    
		//emit exit signal for process chaining over time
		self.emit( "exit", filename);

		PROCESS_RUNNING_FLAG = false;
		self.child_process = null;
		child_process = null;
	});


};

module.exports = cowboy;
