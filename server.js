var connect = require('connect');
var http = require('http');
var directory = '/public/';

var app = connect().use(connect.static('public'));

var port = Number(process.env.PORT || 5000);
Tes
var host = process.env.HOST ? '0.0.0.0' : '127.0.0.1';

http.createServer(app).listen(port);

var cors_proxy = require('cors-anywhere');

cors_proxy.createServer({
	
	requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']

}).listen(8080,host,function(){
	console.log('cors-anywhere is running on ' + host + ':' + 8080);
});

