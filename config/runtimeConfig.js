var config = require('./baseConfig');
var fs = require( "fs" );
var path = require('path');
var extend = require('extend');

var certPath = __dirname + '/../certs';

config = extend(true, config, {
	certificates: {
		client: path.resolve(certPath, 'client.pem'),
		client_key: path.resolve(certPath,'client_key.pem'),
		server: path.resolve(certPath, 'server.pem'),
		server_key: path.resolve(certPath, 'server_key.pem'),
		root: path.resolve(certPath,'root.pem')
	}
});

config = extend(true, config, {
	qsocks: {
		host: 'selun-eps.qliktech.com',
		port: 4747,
		isSecure: true,
		origin: 'https://localhost',
		ca: fs.readFileSync(path.resolve(certPath,'root.pem')),
		key: fs.readFileSync(path.resolve(certPath,'client_key.pem')),
		cert: fs.readFileSync(path.resolve(certPath, 'client.pem')),
		headers: {
			"X-Qlik-User": config.engine.repoAccount
		}
	}
});

config['filenames']['outputDir'] =  __dirname + "/../output/";

module.exports = config;