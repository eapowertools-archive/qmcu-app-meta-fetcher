var enigma = require( "@qlik/enigma" );
var Promise = require( "bluebird" );
var WebSocket = require( "ws" );
var fs = require( "fs" );
var path = require( "path" );
var util = require( "util" );
var configMod = require("../config/config");

var schema = require( "../node_modules/@qlik/enigma/schemas/qix/2.2/schema.json");

var socketConfig = {
	ca: fs.readFileSync(configMod.certificates.root),
	key: fs.readFileSync(configMod.certificates.client_key),
	cert: fs.readFileSync(configMod.certificates.client),
	headers: {
		"X-Qlik-User": configMod.engine.repoAccount
	}
};
var config = {
	Promise: Promise,
	schema: schema,
	session: {
		host: configMod.engine.hostname,
		port: configMod.engine.port
	},
	createSocket( url ) {
		return new WebSocket( url, socketConfig );
	}
};

module.exports = enigma.getService( "qix", config );

/*
enigma.getService( "qix", config ).then( function( global ) {
	return global.getDocList().then( function( docList ) {
		var docNames = docList.map( function( doc ) {
			return doc.qDocName;
		} ).join( "\n" );
		console.log( "--- Your server has the following apps ---\n" + docNames );
		process.exit();
	} );
} ).catch( function( err ) {
	console.log( "Error when connecting to qix service: " + err );
	process.exit( 1 );
} );


*/