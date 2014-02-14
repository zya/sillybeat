var cors_proxy = require('cors-anywhere');

cors_proxy.createServer({
	
	requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']

}).listen(8080);