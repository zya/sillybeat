var connect = require('connect');
var http = require('http');
var directory = '/public/';

var app = connect().use(connect.static('public'));

var port = Number(process.env.PORT || 8888);

var host = process.env.HOST ? '0.0.0.0' : '127.0.0.1';

http.createServer(app).listen(port);

var cors_proxy = require('cors-anywhere');

cors_proxy.createServer({
	
	requireHeader: ['origin', 'x-requested-with'],

	httpProxyOptions: {
        enable: {
            // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
            xforward: false
        }
    }
    

}).listen(8080);
