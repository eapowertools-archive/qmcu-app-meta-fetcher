var writeCSV = require('./writeCSV');

var visualizationData = {

    writeToFile: function(filePath, appData) {
        var dataMatrix = [];
        appData['sheets'].forEach(function(element) {
            element['qChildren'].forEach(function(childVisualization) {
                var dataRow = [];
                dataRow.push(element['qProperty']['qInfo']['qId']);
                dataRow.push(childVisualization['qProperty']['qInfo']['qId']);
                dataRow.push(childVisualization['qProperty']['qInfo']['qType']);
                dataMatrix.push(dataRow);
            }, this);
        }, this);
        writeCSV.writeDataToFile(filePath, dataMatrix);
    }
}

module.exports = visualizationData;