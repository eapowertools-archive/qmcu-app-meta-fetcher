var writeCSV = require('./writeCSV');

var variableData = {

    writeToFile: function(appID, filePath, appData) {
        var dataMatrix = [];
        appData['variables'].forEach(function(element) {
            var dataRow = [];
            dataRow.push(appID);
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