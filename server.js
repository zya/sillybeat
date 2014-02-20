var connect = require('connect');
var http = require('http');
var directory = '/public/';

var app = connect().use(connect.static('public'));



var host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
var port = process.env.PORT || 8080;

http.createServer(app).listen(port);


var cors_proxy = require('./lib/cors-anywhere');
cors_proxy.createServer({
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: [
        'cookie',
        'cookie2',
        // Strip Heroku-specific headers
        'x-heroku-queue-wait-time',
        'x-heroku-queue-depth',
        'x-heroku-dynos-in-use',
        'x-request-start'
    ],
    httpProxyOptions: {
        enable: {
            // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
            xforward: false
        }
    }
}).listen(8080, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});