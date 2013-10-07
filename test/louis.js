var events = require("events"),
	util = require("util");


function louis( opts ){
	console.log('created louis');
	this.freq = opts.freq;
	this.total = opts.total;
}

util.inherits( louis, events.EventEmitter );

louis.prototype.start = function(){
	var self = this;
	var i = 1;

	var interval_id;

	interval_id = setInterval(function(){
		if(i <= self.total){
			console.log('interval '+ i);
			self.emit("data", i + ".png", i + ".png");
			i++;
		}else{
			clearInterval( interval_id );
		}
	}, self.freq);	
};


module.exports = louis;

