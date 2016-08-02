var config = require('../config/config');
var writeCSV = require('./writeCSV');


var writeHeaders = {

    writeAllHeaders: function() {
        var variablesFilename = config.filenames.outputDir + config.filenames.variables_table;
        var variablesHeaders = ['VariableID', 'Name', 'IsScript', 'Definition'];
        writeCSV.writeHeadersToFile(variablesFilename, variablesHeaders);

        var variablesFilename = config.filenames.outputDir + config.filenames.dimensions_table;
        var dimensionsHeaders = ['DimensionID', 'Name', 'IsScript', 'Definition'];
        writeCSV.writeHeadersToFile(variablesFilename, dimensionsHeaders);

        var variablesFilename = config.filenames.outputDir + config.filenames.measures_table;
        var measuresHeaders = ['MeasureID', 'Name', 'IsScript', 'Definition'];
        writeCSV.writeHeadersToFile(variablesFilename, measuresHeaders);
    }
}

module.exports = writeHeaders;