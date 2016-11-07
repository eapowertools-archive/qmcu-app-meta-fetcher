var config = require('../config/baseConfig');
var writeCSV = require('./writeCSV');


var writeHeaders = {

    writeAllHeaders: function(outputDir) {
        var variablesFilename = outputDir + config.filenames.variables_table;
        var variablesHeaders = ['AppID', 'VariableID', 'Name', 'IsScript', 'Definition'];
        writeCSV.writeHeadersToFile(variablesFilename, variablesHeaders);

        var masterMetricsFilename = outputDir + config.filenames.masterMetrics_table;
        var masterMetricsHeaders = ['AppID', 'MetricID', 'MetricType', 'Label', 'Definition', 'Grouping', 'Value', 'Alternate Value', 'Title', 'Description', 'Tags'];
        writeCSV.writeHeadersToFile(masterMetricsFilename, masterMetricsHeaders);

        var appsFilename = outputDir + config.filenames.apps_table;
        var appsHeaders = ['AppID', 'AppName', 'ModifiedDate', 'IsPublished', 'PublishedDate'];
        writeCSV.writeHeadersToFile(appsFilename, appsHeaders);

        var sheetsFilename = outputDir + config.filenames.sheets_table;
        var sheetsHeaders = ['AppID', 'SheetID', 'SheetName'];
        writeCSV.writeHeadersToFile(sheetsFilename, sheetsHeaders);

        var visualizationsFilename = outputDir + config.filenames.visualizations_table;
        var visualizationsHeaders = ['SheetID', 'VisualizationID', 'type'];
        writeCSV.writeHeadersToFile(visualizationsFilename, visualizationsHeaders);

        var visMasterMetricsFilename = outputDir + config.filenames.visualizationsMasterMetrics_table;
        var visMasterMetricsHeaders = ['VisualizationID', 'MasterMetricID'];
        writeCSV.writeHeadersToFile(visMasterMetricsFilename, visMasterMetricsHeaders);

        var customPropertyDefinitionsFilename = outputDir + config.filenames.customPropertyDefinitions_table;
        var customPropertyDefinitionsHeaders = ['CustomPropertyDefinitionID', 'Name', 'Type', 'Values'];
        writeCSV.writeHeadersToFile(customPropertyDefinitionsFilename, customPropertyDefinitionsHeaders);

        var customPropertyMapFilename = outputDir + config.filenames.entityCustomPropertyMap_table;
        var customPropertyMapHeaders = ['EntityID', 'EntityType', 'CustomPropertyDefinitionID', 'Value'];
        writeCSV.writeHeadersToFile(customPropertyMapFilename, customPropertyMapHeaders);

        var nonMasterMetricsFilename = outputDir + config.filenames.nonMasterMetrics_table;
        var nonMasterMetricsHeaders = ['VisualizationID', 'MetricType', 'ID', 'MetricDefinition', 'MetricLabel'];
        writeCSV.writeHeadersToFile(nonMasterMetricsFilename, nonMasterMetricsHeaders);
    }
}

module.exports = writeHeaders;