var writeCSV = require('./writeCSV');

var dimensionData = {

    writeToFile: function(appID, filePath, appData) {
        var dataMatrix = [];
        appData['dimensions'].forEach(function(element) {
            var dataRow = [];
            dataRow.push(appID);
            dataRow.push(element['qInfo']['qId']);
            dataRow.push(element['qDim']['qGrouping']);
            dataRow.push(element['qDim']['qFieldDefs']);
            dataRow.push(element['qDim']['qFieldLabels']);
            dataRow.push(element['qDim']['title']);
            dataRow.push(element['qMetaDef']['title']);
            dataRow.push(element['qMetaDef']['description']);
            dataRow.push(element['qMetaDef']['tags']);
            dataMatrix.push(dataRow);
        }, this);
        writeCSV.writeDataToFile(filePath, dataMatrix);
    }
}

module.exports = dimensionData;