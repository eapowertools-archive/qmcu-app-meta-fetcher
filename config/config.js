var path = require('path');
var extend = require('extend');

//For production


var certPath = 'F:/My Documents/_Git/global-metrics-app/certs';

//var certPath = path.join(process.env.programdata, '/Qlik/Sense/Repository/Exported Certificates/.Local Certificates');
var routePath = path.join(__dirname, '/../routes/');
var publicPath = path.join(__dirname, '/../public/');
var logPath = path.join(__dirname,'/../log/');
var appPath = path.join(__dirname, '/../app/');

var logFile = logPath + 'masterlib.log';

var config = extend(true, {
	port: 8591,
	enginePort: 4747,
	qrsPort: 4242,
	hostname: 'masterlib.112adams.local',
	repoAccount: 'UserDirectory=Internal;UserId=sa_repository',
	repoAccountUserDirectory: 'INTERNAL',
	repoAccountUserId: 'sa_repository',
	certificates: {
		client: path.resolve(certPath, 'client.pem'),
		client_key: path.resolve(certPath,'client_key.pem'),
		server: path.resolve(certPath, 'server.pem'),
		server_key: path.resolve(certPath, 'server_key.pem'),
		root: path.resolve(certPath,'root.pem')
	},
	routePath: routePath,
	publicPath: publicPath,
	appPath: appPath,
	logPath: logPath,
	logFile: logFile,
	logLevel: 'info'
});

module.exports = config;