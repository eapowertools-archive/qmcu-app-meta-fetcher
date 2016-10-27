var writeCSV = require('./writeCSV');

var nonMasterMetricsData = {

    writeToFile: function (filePath, appData) {
        var dataMatrix = [];
        appData['sheets'].forEach(function (element) {
            element['qChildren'].forEach(function (childVisualization) {
                childVisualization.qProperty.qHyperCubeDef.qDimensions.forEach(function (dim) {
                    if (dim.qLibraryId == undefined) {
                        var dataRow = [];
                        dataRow.push(childVisualization['qProperty']['qInfo']['qId']);
                        dataRow.push("dimension");
                        dataRow.push(dim['qDef']['qFieldDefs'][0]);
                        dataMatrix.push(dataRow);
                    }
                }, this);
                childVisualization.qProperty.qHyperCubeDef.qMeasures.forEach(function (measure) {
                    if (measure.qLibraryId == undefined) {
                        var dataRow = [];
                        dataRow.push(childVisualization['qProperty']['qInfo']['qId']);
                        dataRow.push("measure");
                        dataRow.push(measure['qDef']['qDef']);
                        dataMatrix.push(dataRow);
                    }
                }, this);
            }, this);
        }, this);
        writeCSV.writeDataToFile(filePath, dataMatrix);
    }
}

module.exports = nonMasterMetricsData;