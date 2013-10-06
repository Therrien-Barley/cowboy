var events = require("events"),
	util = require("util");



function louis(){
	console.log('created louis');
}

util.inherits( louis, events.EventEmitter );

louis.prototype.start = function(){
	var i = 0;

	var interval_id;

	interval_id = setInterval(function(){
		if(i < 10){
			console.log('interval '+ i);
			i++;
		}else{
			clearInterval( interval_id );
		}
	}, 1000);	
};


module.exports = louis;

