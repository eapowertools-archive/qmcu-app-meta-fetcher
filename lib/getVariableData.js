var writeCSV = require('./writeCSV');
var config = require('../config/baseConfig');


var variableData = {

    writeToFile: function(filePath, appData) {
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
        writeCSV.writeDataToFile(filePath, dataMatrix);
    }
}

module.exports = variableData;