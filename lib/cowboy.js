var gm = require("gm"),
	events = require("events"),
	util = require("util"),
	spawn = require("child_process").spawn,
	fs = require("fs"),
	exec = require('child_process').exec;

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

cowboy.prototype.mask = function(depth, rgb, resultdir){
	// depth and rgb include full paths
	// resultdir has trailing slash
	//
	var self = this;
	var filename; //filename of image to return
 
	filename = depth.replace(/^.*[\\\/]/, '');


	var gmcommand = "convert";
	var gmargs = depth + " -colorspace Gray -write mpr:mask +delete mpr:mask -fill white -opaque black -write mpr:mask +delete mpr:mask -threshold " + threshold + " -write mpr:mask +delete mpr:mask -negate -write mpr:mask +delete " + rgb + " mpr:mask -alpha Off -compose CopyOpacity -composite " + resultdir + filename;

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
		self.emit( "exit", resultdir + filename);

		PROCESS_RUNNING_FLAG = false;
		self.child_process = null;
		child_process = null;
	});


};

module.exports = cowboy;
