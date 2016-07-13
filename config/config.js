var path = require('path');

var certPath = __dirname + '/../certs';

var config = {
	certificates: {
		client: path.resolve(certPath, 'client.pem'),
		client_key: path.resolve(certPath,'client_key.pem'),
		server: path.resolve(certPath, 'server.pem'),
		server_key: path.resolve(certPath, 'server_key.pem'),
		root: path.resolve(certPath,'root.pem')
	},
	engine: {
		hostname: 'masterlib.112adams.local',
		enginePort: 4747,
		repoAccount: 'UserDirectory=Internal;UserId=sa_repository'
	}
}

module.exports = config;