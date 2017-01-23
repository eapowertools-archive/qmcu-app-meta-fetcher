var writeCSV = require('./writeCSV');

var nonMasterMetricsData = {

    writeToFile: function (filePath, appData) {
        var dataMatrix = [];
        appData['sheets'].forEach(function (element) {
            element['qChildren'].forEach(function (childVisualization) {
                if (childVisualization.qProperty.qHyperCubeDef != null) {
                    childVisualization.qProperty.qHyperCubeDef.qDimensions.forEach(function (dim) {
                        if (dim.qLibraryId == undefined) {
                            var dataRow = [];
                            dataRow.push(childVisualization['qProperty']['qInfo']['qId']);
                            dataRow.push("dimension");
                            dataRow.push(dim['qDef']['cId'])
                            dataRow.push(dim['qDef']['qFieldDefs'][0]);
                            if (dim['qDef']['qFieldLabels'][0] != undefined && dim['qDef']['qFieldLabels'][0] != "")
                            {
                                dataRow.push(dim['qDef']['qFieldLabels'][0]);
                            }
                            else
                            {
                                dataRow.push(dim['qDef']['qFieldDefs'][0]);
                            }
                            dataMatrix.push(dataRow);
                        }
                    }, this);
                    childVisualization.qProperty.qHyperCubeDef.qMeasures.forEach(function (measure) {
                        if (measure.qLibraryId == undefined) {
                            var dataRow = [];
                            dataRow.push(childVisualization['qProperty']['qInfo']['qId']);
                            dataRow.push("measure");
                            dataRow.push(measure['qDef']['cId']);
                            dataRow.push(measure['qDef']['qDef']);
                            if (measure['qDef']['qLabel'] != undefined && measure['qDef']['qLabel'] != "")
                            {
                                dataRow.push(measure['qDef']['qLabel']);
                            }
                            else
                            {
                                dataRow.push("");
                            }
                            dataMatrix.push(dataRow);
                        }
                    }, this);
                }
                else if (childVisualization.qProperty.visualization == "filterpane")
                {
                    childVisualization.qChildren.forEach(function (filterDim) {
                        if (filterDim['qProperty']['qListObjectDef']['qLibraryId'] == undefined) {
                            var dataRow = [];
                            dataRow.push(childVisualization['qProperty']['qInfo']['qId']);
                            dataRow.push("dimension");
                            dataRow.push(filterDim['qProperty']['qListObjectDef']['qDef']['cId']);
                            dataRow.push(filterDim['qProperty']['qListObjectDef']['qDef']['qFieldDefs'][0]);
                            if (filterDim['qProperty']['title'] != undefined && filterDim['qProperty']['title'] != "")
                            {
                                dataRow.push(filterDim['qProperty']['title']);
                            }
                            else
                            {
                                dataRow.push(filterDim['qProperty']['qListObjectDef']['qDef']['qFieldDefs'][0]);
                            }
                            dataMatrix.push(dataRow);
                        }
                    }, this);
                }
            }, this);
        }, this);
        writeCSV.writeDataToFile(filePath, dataMatrix);
    }
}

module.exports = nonMasterMetricsData;