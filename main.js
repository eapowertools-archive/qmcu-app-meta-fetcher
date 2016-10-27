var extend = require('extend');
var fs = require('fs');
var Promise = require('bluebird');

var appMetadata = require('./lib/getAppMetadata');
var dimensionData = require('./lib/getDimensionData');
var measureData = require('./lib/getMeasureData');
var sheetData = require('./lib/getSheetData');
var stringExtensions = require('./lib/stringExtensions');
var variableData = require('./lib/getVariableData');
var visualizationData = require('./lib/getVisualizationData');
var writeHeaders = require('./lib/writeHeaders');
var customPropertyDefinitions = require('./lib/getCustomPropertyDefinitions');
var entityCustomPropertyValues = require('./lib/getCustomPropertiesForEntity');
var nonMasterMetricsData = require('./lib/getNonMasterItemMetrics');



var main = function main(qsocks, serializeApp, qrsInteract, config){
    stringExtensions();
    
    // create folder if it doesn't exist
    try {
        fs.mkdirSync(config.filenames.outputDir);
    }
    catch(err) {
        console.log("Output folder already created.");
    }

    // Create all files and write headers to files
    writeHeaders.writeAllHeaders(config.filenames.outputDir);

    // write custom property definitions
    var customPropertyDefinitionPath = config.filenames.outputDir + config.filenames.customPropertyDefinitions_table;
    customPropertyDefinitions.writeToFile(qrsInteract, customPropertyDefinitionPath);

    var customPropertiesPath = config.filenames.outputDir + config.filenames.entityCustomPropertyMap_table;
    entityCustomPropertyValues.writeToFile(qrsInteract, "app", customPropertiesPath);

    qsocks.Connect(config.qsocks).then(function(global)
        {
            return global.getDocList()
                    .then(function(docList)
                    {
                        return docList.map(function(doc)
                        {
                            return doc.qDocId;
                        });
                    });
        })
        .then(function(docIds)
        {
            return Promise.all(docIds.map(function(appId)
            {
                qsocksConfig = extend(true, config.qsocks, {
                    appname: appId
                });

                return qsocks.Connect(qsocksConfig).then(function(g) {
                    return g.openDoc(appId)
                    .then(function(app)
                    {
                        return serializeApp(app).then(function(appData) {
                            var appFilePath = config.filenames.outputDir + config.filenames.apps_table;
                            appMetadata.writeToFile(appId, appFilePath, appData);

                            var sheetFilePath = config.filenames.outputDir + config.filenames.sheets_table;
                            sheetData.writeToFile(appId, sheetFilePath, appData);

                            var visualizationFilePath = config.filenames.outputDir + config.filenames.visualizations_table;
                            visualizationData.writeToFile(visualizationFilePath, appData);

                            var varFilePath = config.filenames.outputDir + config.filenames.variables_table;
                            variableData.writeToFile(appId, varFilePath, appData);

                            var dimFilePath = config.filenames.outputDir + config.filenames.dimensions_table;
                            dimensionData.writeToFile(appId, dimFilePath, appData);
                            
                            var mesFilePath = config.filenames.outputDir + config.filenames.measures_table;
                            measureData.writeToFile(appId, mesFilePath, appData);

                            // non master item metrics
                            var nonMasterMetricsFilePath = config.filenames.outputDir + config.filenames.nonMasterMetrics_table;
                            nonMasterMetricsData.writeToFile(nonMasterMetricsFilePath, appData);

                            // do dimension specific stuff
                            var visDimFilePath = config.filenames.outputDir + config.filenames.visualizationsDimensions_table;
                            dimensionData.writeLinkTableToFile(app, visDimFilePath, appData);

                            var visMeasureFilePath = config.filenames.outputDir + config.filenames.visualizationsMeasures_table;
                            measureData.writeLinkTableToFile(app, visMeasureFilePath, appData);

                            return;
                        });
                    })
                })
            }));
        });
}

module.exports = main;