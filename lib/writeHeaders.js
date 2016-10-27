var config = require('../config/baseConfig');
var writeCSV = require('./writeCSV');


var writeHeaders = {

    writeAllHeaders: function(outputDir) {
        var variablesFilename = outputDir + config.filenames.variables_table;
        var variablesHeaders = ['AppID', 'VariableID', 'Name', 'IsScript', 'Definition'];
        writeCSV.writeHeadersToFile(variablesFilename, variablesHeaders);

        var variablesFilename = outputDir + config.filenames.dimensions_table;
        var dimensionsHeaders = ['AppID', 'DimensionID', 'Grouping', 'FieldDefinition', 'FieldLabel', 'DimensionTitle', 'Title', 'Description', 'Tags'];
        writeCSV.writeHeadersToFile(variablesFilename, dimensionsHeaders);

        var variablesFilename = outputDir + config.filenames.measures_table;
        var measuresHeaders = ['AppID', 'MeasureID', 'Name', 'Definition', 'Grouping', 'Expressions', 'ActiveExpressions', 'Title', 'Description', 'Tags'];
        writeCSV.writeHeadersToFile(variablesFilename, measuresHeaders);

        var appsFilename = outputDir + config.filenames.apps_table;
        var appsHeaders = ['AppID', 'AppName', 'ModifiedDate', 'IsPublished', 'PublishedDate'];
        writeCSV.writeHeadersToFile(appsFilename, appsHeaders);

        var sheetsFilename = outputDir + config.filenames.sheets_table;
        var sheetsHeaders = ['AppID', 'SheetID', 'SheetName'];
        writeCSV.writeHeadersToFile(sheetsFilename, sheetsHeaders);

        var visualizationsFilename = outputDir + config.filenames.visualizations_table;
        var visualizationsHeaders = ['SheetID', 'VisualizationID', 'type'];
        writeCSV.writeHeadersToFile(visualizationsFilename, visualizationsHeaders);

        var visDimsFilename = outputDir + config.filenames.visualizationsDimensions_table;
        var visDimsHeaders = ['VisualizationID', 'DimensionID'];
        writeCSV.writeHeadersToFile(visDimsFilename, visDimsHeaders);

        var visMeasFilename = outputDir + config.filenames.visualizationsMeasures_table;
        var visMeasHeaders = ['VisualizationID', 'MeasureID'];
        writeCSV.writeHeadersToFile(visMeasFilename, visMeasHeaders);

        var customPropertyDefinitionsFilename = outputDir + config.filenames.customPropertyDefinitions_table;
        var customPropertyDefinitionsHeaders = ['CustomPropertyDefinitionID', 'Name', 'Type', 'Values'];
        writeCSV.writeHeadersToFile(customPropertyDefinitionsFilename, customPropertyDefinitionsHeaders);

        var customPropertyMapFilename = outputDir + config.filenames.entityCustomPropertyMap_table;
        var customPropertyMapHeaders = ['EntityID', 'EntityType', 'CustomPropertyDefinitionID', 'Value'];
        writeCSV.writeHeadersToFile(customPropertyMapFilename, customPropertyMapHeaders);

        var nonMasterMetricsFilename = outputDir + config.filenames.nonMasterMetrics_table;
        var nonMasterMetricsHeaders = ['VisualizationID', 'MetricType', 'MetricDefinition'];
        writeCSV.writeHeadersToFile(nonMasterMetricsFilename, nonMasterMetricsHeaders);
    }
}

module.exports = writeHeaders;