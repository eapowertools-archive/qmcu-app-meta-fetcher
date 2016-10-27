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
		masterMetrics_table: "masterMetrics.csv",
		apps_table: "apps.csv",
		sheets_table: "sheets.csv",
		visualizations_table: "visualizations.csv",
		visualizationsMasterMetrics_table: "visualizations_masterMetrics.csv",
		customPropertyDefinitions_table: "customPropertyDefinitions.csv",
		entityCustomPropertyMap_table: "entity_customProperty.csv",
		nonMasterMetrics_table: "nonMasterMetrics.csv"
	}
});

module.exports = config;