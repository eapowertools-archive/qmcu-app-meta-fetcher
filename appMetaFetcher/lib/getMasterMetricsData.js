var Promise = require('bluebird');
var writeCSV = require('./writeCSV');

var masterMetricsData = {
        writeToFile: function(appID, filePath, appData) {
            this.writeDimensionsToFile(appID, filePath, appData);
            this.writeMeasuresToFile(appID, filePath, appData);
        },
        writeLinkTableToFile: function(app, filePath, appData){
            var dimLinkPromise = this.writeDimensionLinksToFile(app, filePath, appData);
            var measureLinkPromise = this.writeMeasureLinksToFile(app, filePath, appData);
            return Promise.all([dimLinkPromise, measureLinkPromise]);
        },

        writeMeasureLinksToFile: function(app, filePath, appData){
        var visMeasMatrix = [];
        var measureIds = [];
        appData['measures'].forEach(function(measure) {
            measureIds.push(measure['qInfo']['qId']);
        }, this);

        return Promise.all(measureIds.map(function(measureId) {
            return app.getMeasure(measureId);
        })).then(function(measures) {
            return Promise.all(measures.map(function(meas){
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
    writeMeasuresToFile: function(appID, filePath, appData) {
        var dataMatrix = [];
        appData['measures'].forEach(function(element) {
            var dataRow = [];
            dataRow.push(appID);
            dataRow.push(element['qInfo']['qId']);
            dataRow.push("measure");
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
    },
    writeDimensionLinksToFile: function(app, filePath, appData){
        var visDimMatrix = [];
        var dimIds = [];
        appData['dimensions'].forEach(function(dim) {
            dimIds.push(dim['qInfo']['qId']);
        }, this);

        Promise.all(dimIds.map(function(dimId) {
            return app.getDimension(dimId);
        })).then(function(dimensions) {
            Promise.all(dimensions.map(function(dim){
                 return dim.getLinkedObjects();
            })).then(function(linkedDimensions){
                for (var i = 0; i < linkedDimensions.length; i++) {
                    linkedDimensions[i].forEach(function(linkedElement) {
                        var visDimRow = [];
                        visDimRow.push(linkedElement['qInfo']['qId']);
                        visDimRow.push(dimIds[i]);
                        visDimMatrix.push(visDimRow);
                    }, this);
                }
            }).then(function(result){
                writeCSV.writeDataToFile(filePath, visDimMatrix);
            });
        });
    },

    writeDimensionsToFile: function(appID, filePath, appData) {
        var dataMatrix = [];
        appData['dimensions'].forEach(function(element) {
            var dataRow = [];
            dataRow.push(appID);
            dataRow.push(element['qInfo']['qId']);
            dataRow.push("dimension");
            dataRow.push(element['qDim']['qFieldLabels']);
            dataRow.push(element['qDim']['qFieldDefs']);
            dataRow.push(element['qDim']['qGrouping']);
            dataRow.push(element['qDim']['title']);
            dataRow.push("");
            dataRow.push(element['qMetaDef']['title']);
            dataRow.push(element['qMetaDef']['description']);
            dataRow.push(element['qMetaDef']['tags']);
            dataMatrix.push(dataRow);
        }, this);
        writeCSV.writeDataToFile(filePath, dataMatrix);
    }

}

module.exports = masterMetricsData;