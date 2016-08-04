var writeCSV = require('./writeCSV');

var measureData = {

    writeToFile: function(appID, filePath, appData) {
        var dataMatrix = [];
        appData['measures'].forEach(function(element) {
            var dataRow = [];
            dataRow.push(appID);
            dataRow.push(element['qInfo']['qId']);
            dataRow.push(element['qMeasure']['qLabel']);
            dataRow.push(element['qMeasure']['qDef']);
            dataRow.push(element['qMeasure']['qGrouping']);
            dataRow.push(element['qMeasure']['qExpressions']);
            dataRow.push(element['qMeasure']['qActiveExpressions']);
            dataRow.push(element['qMetaDef']['title']);
            dataRow.push(element['qMetaDef']['description']);
            dataRow.push(element['qMetaDef']['tags']);
            dataMatrix.push(dataRow);
        }, this);
        writeCSV.writeDataToFile(filePath, dataMatrix);
    }
}

module.exports = measureData;