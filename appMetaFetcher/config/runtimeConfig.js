var mainConfig = require('../../../config/config');
var config = require('./baseConfig');
var fs = require( "fs" );

mainConfig['qsocks']['headers'] = {
			"X-Qlik-User": config.engine.repoAccount
		};
mainConfig['qsocks']['ca'] = fs.readFileSync(mainConfig['certificates']['root']),
mainConfig['qsocks']['key'] = fs.readFileSync(mainConfig['certificates']['client_key']),
mainConfig['qsocks']['cert'] = fs.readFileSync(mainConfig['certificates']['client']),

mainConfig['filenames'] = config['filenames'];

module.exports = mainConfig;