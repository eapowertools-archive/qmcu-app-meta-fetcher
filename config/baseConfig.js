var extend = require('extend');

var config = {
	engine: {
		repoAccount: 'UserDirectory=Internal;UserId=sa_repository'
	}
};

config = extend(true, config, {
	filenames: {
		outputDir: "",
		variables_table: "variables.csv",
		dimensions_table: "dimensions.csv",
		measures_table: "measures.csv",
		apps_table: "apps.csv",
		sheets_table: "sheets.csv",
		visualizations_table: "visualizations.csv",
		visualizationsDimensions_table: "visualizations_dimensions.csv",
		visualizationsMeasures_table: "visualizations_measures.csv"
	}
});

module.exports = config;