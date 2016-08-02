var extend = require('extend');

var config = {
	engine: {
		repoAccount: 'UserDirectory=Internal;UserId=sa_repository'
	}
};

config = extend(true, config, {
	filenames: {
		outputDir: "/Users/jparis/Desktop/temp/",
		variables_table: "variables.csv",
		dimensions_table: "dimensions.csv",
		measures_table: "measures.csv"
	}
});

module.exports = config;