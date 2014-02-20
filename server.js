var connect = require('connect');
var http = require('http');
var directory = '/public/';

var app = connect().use(connect.static('public'));

var port = Number(process.env.PORT || 8080);

http.createServer(app).listen(port);

/*
var cors_proxy = require('cors-anywhere');

cors_proxy.createServer({
	
	requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']

}).listen(port);
*/
