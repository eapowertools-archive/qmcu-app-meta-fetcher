var Promise = require('bluebird');
var writeCSV = require('./writeCSV');

var measureData = {

    writeLinkTableToFile: function(app, filePath, appData){
        var visMeasMatrix = [];
        var measureIds = [];
        appData['measures'].forEach(function(measure) {
            measureIds.push(measure['qInfo']['qId']);
        }, this);

        Promise.all(measureIds.map(function(measureId) {
            return app.getMeasure(measureId);
        })).then(function(measures) {
            Promise.all(measures.map(function(meas){
                 return meas.getLinkedObjects();
            })).then(function(linkedMeasures){
                for (var i = 0; i < linkedMeasures.length; i++) {
                    linkedMeasures[i].forEach(function(linkedElement) {
                        var visMeasureRow = [];
                        visMeasureRow.push(linkedElement['qInfo']['qId']);
                        visMeasureRow.push(measureIds[i]);
                        visMeasMatrix.push(visMeasureRow);
                    }, this);
                }
            }).then(function(result){
                writeCSV.writeDataToFile(filePath, visMeasMatrix);
            });
        });
    },

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