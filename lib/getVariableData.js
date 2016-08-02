var writeCSV = require('./writeCSV');
var config = require('../config/config');


var variableData = {

    writeToFile: function(directoryName, appData) {
        var filename = config.filenames.outputDir + config.filenames.variables_table;
        var headers = ['VariableID', 'Name', 'IsScript', 'Definition'];
        var dataMatrix = [];
        appData['variables'].forEach(function(element) {
            var dataRow = [];
            dataRow.push(element['qInfo']['qId']);
            dataRow.push(element['qName']);
            dataRow.push(element['qIsScriptCreated']);
            dataRow.push(element['qDefinition']);
            dataMatrix.push(dataRow);
        }, this);
        writeCSV.writeDataToFile(filename, dataMatrix);
    }
}

module.exports = variableData;