var events = require("events"),
	util = require("util");


function louis( opts ){
	console.log('created louis');
	this.freq = opts.freq;
}

util.inherits( louis, events.EventEmitter );

louis.prototype.start = function(){
	var self = this;
	var i = 0;

	var interval_id;

	interval_id = setInterval(function(){
		if(i < 10){
			console.log('interval '+ i);
			self.emit("data", "depth" + i + ".png", "rgb" + i + ".png");
			i++;
		}else{
			clearInterval( interval_id );
		}
	}, this.freq);	
};


module.exports = louis;

