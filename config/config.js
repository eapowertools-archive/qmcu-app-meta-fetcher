var fs = require( "fs" );
var path = require('path');

var certPath = __dirname + '/../certs';

var config = {
	qsocks: {
		host: 'masterlib.112adams.local',
		port: 4747,
		isSecure: true,
		origin: 'localhost',
		ca: fs.readFileSync(path.resolve(certPath,'root.pem')),
		key: fs.readFileSync(path.resolve(certPath,'client_key.pem')),
		cert: fs.readFileSync(path.resolve(certPath, 'client.pem')),
		headers: {
			"X-Qlik-User": configMod.engine.repoAccount
		}
	},
	engine: {
		repoAccount: 'UserDirectory=Internal;UserId=sa_repository'
	},
	certificates: {
		client: path.resolve(certPath, 'client.pem'),
		client_key: path.resolve(certPath,'client_key.pem'),
		server: path.resolve(certPath, 'server.pem'),
		server_key: path.resolve(certPath, 'server_key.pem'),
		root: path.resolve(certPath,'root.pem')
	}
}

module.exports = config;