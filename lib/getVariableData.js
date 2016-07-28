var writeCSV = require('./writeCSV');


var variableData = {

    writeToFile: function(directoryName, appData) {
        var filename = directoryName + "/variables.csv";
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
        writeCSV.writeToFile(filename, headers, dataMatrix);
    }
}

module.exports = variableData;