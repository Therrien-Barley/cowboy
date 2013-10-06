var http = require("http");
var spawn = require("child_process").spawn;

var proc_id;

http.createServer(function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});

//      var timestamp = new Date().getTime();

		try {
			proc_id = spawn("cat 'oy' > /home/provolot/nodecode/cowboy/touchtest", "");
		 } catch (e) {
			console.log("entering catch block");
			console.log(e);
		}

        proc_id.stdout.on("data", function(data) {
                console.log('stdout: ' + data);
                res.write('stdout: ' + data);
        });

        console.log(proc_id);

        res.end('Hello World\n');

}).listen(8888);
