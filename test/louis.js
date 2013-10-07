var events = require("events"),
	util = require("util"),
	fs = require("fs");


function louis( opts ){
	console.log('created louis');
	this.freq = opts.freq;
	this.total = opts.total;
	this.imagepath = opts.imagepath;
}

util.inherits( louis, events.EventEmitter );

louis.prototype.start = function(){
	var self = this;
	var i = 0;

	var interval_id;


	fs.watch(this.imagepath + '/depth/', function(event, filename){
	    //rename is called once, change is called 3 times, so check for rename to elimate duplicates
	    if(event === "rename"){
	    	console.log('new depth file added at: ' + self.imagepath + '/depth/' + filename );
	    	console.log('new rgb file added at: ' + self.imagepath + '/rgb/' + filename );
	    	self.emit( "data", null, self.imagepath + '/depth/' + filename, self.imagepath + '/rgb/' + filename );
	    }
	  });

	/*
	interval_id = setInterval(function(){
		if(i < self.total){
			console.log('interval '+ i);
			self.emit("data", "depth" + i + ".png", "rgb" + i + ".png");
			i++;
		}else{
			clearInterval( interval_id );
		}
	}, self.freq);
	*/	
};


module.exports = louis;

