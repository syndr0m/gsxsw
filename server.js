// WooOOOoo
//
// thanks to https://github.com/arunjitsingh/
// 

var http = require('http'), io = require('socket.io'); // for npm, otherwise use require('./path/to/socket.io') 
var fs = require('fs'), util = require('util');
var url = require('url'), path = require('path');

// thanks to https://github.com/arunjitsingh/
function findType(uri) {
  var types = {
    '.js':      'text/javascript',
    '.html':    'text/html',
    '.css':     'text/css',
    '.manifest':'text/cache-manifest',
    '.ico':     'image/x-icon',
    '.jpeg':    'image/jpeg',
    '.jpg':     'image/jpg',
    '.png':     'image/png',
    '.gif':     'image/gif',
    '.svg':     'image/svg+xml'
  };

  var ext = uri.match(/\.\w+$/gi);
  if (ext && ext.length > 0) {
    ext = ext[0].toLowerCase();
    if (ext in types) {
      return types[ext];
    }
  }
  return undefined;
}

// creating server, using /static/ for static files. =)
server = http.createServer(function(request, response){
	var uri = url.parse(request.url).pathname;
	if (uri === '/') {uri = '/index.html';}
	
	console.log('GET '+uri);
	
	// thanks to https://github.com/arunjitsingh/
	var _file = path.join(path.join(process.cwd(), '/static'), uri);
	console.log('trying to read : '+_file);
	path.exists(_file, function(exists) {
		// 404
		if (!exists) {
			response.writeHead(404);
			response.end();
			return;
		}
		fs.stat(_file, function(err, stat) {
			// header
			var type = findType(uri), size = stat.size;
			if (!type) {
				response.writeHead(500);
				response.end();
			}
			response.writeHead(200, {'Content-Type':type, 'Content-Length':size});
			var rs = fs.createReadStream(_file);
			util.pump(rs, response, function(err) {
				if (err) {
					console.log("ReadStream, WriteStream error for util.pump");
					response.end();
				}
			});
		});
	});
});
server.listen(80);
  
// Fun stuff here :)
var socket = io.listen(server); 
socket.on('connection', function(client){
	console.log('+new client');
	// new client is here! 
	client.on('message', function(data){ 
		console.log('message: '+data);
	}) 
	client.on('disconnect', function(data){
		console.log('disconnected');
	})
}); 