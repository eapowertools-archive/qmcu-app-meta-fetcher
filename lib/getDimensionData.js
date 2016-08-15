var Promise = require('bluebird');
var writeCSV = require('./writeCSV');

var dimensionData = {

    writeLinkTableToFile: function(app, filePath, appData){
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