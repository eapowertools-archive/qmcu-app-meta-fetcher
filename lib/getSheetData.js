var writeCSV = require('./writeCSV');

var sheetData = {

    writeToFile: function(appID, filePath, appData) {
        var dataMatrix = [];
        appData['sheets'].forEach(function(element) {
            var dataRow = [];
            dataRow.push(appID);
            dataRow.push(element['qProperty']['qInfo']['qId']);
            dataRow.push(element['qProperty']['qMetaDef']['title']);
            dataMatrix.push(dataRow);
        }, this);
        writeCSV.writeDataToFile(filePath, dataMatrix);
    }
}

module.exports = sheetData;