var appMetadata = require('./lib/getAppMetadata');
var dimensionData = require('./lib/getDimensionData');
var measureData = require('./lib/getMeasureData');
var variableData = require('./lib/getVariableData');
var writeCSV = require('./lib/writeCSV');
var writeHeaders = require('./lib/writeHeaders');
var serializeapp = require('serializeapp');
var fs = require('fs');
var Promise = require('bluebird');
var extend = require('extend');
var serializeApp = require('serializeapp');


var main = function main(qsocks, config){
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position) {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    // create folder if it doesn't exist
    try {
        fs.mkdirSync(config.filenames.outputDir);
    }
    catch(err) {
        console.log("Output folder already created.");
    }

    // Create all files and write headers to files
    writeHeaders.writeAllHeaders(config.filenames.outputDir);

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
                        return serializeApp(app);
                    })
                    .then(function(appData)
                    {
                        var appFilePath = config.filenames.outputDir + config.filenames.apps_table;
                        appMetadata.writeToFile(appId, appFilePath, appData);

                        var varFilePath = config.filenames.outputDir + config.filenames.variables_table;
                        variableData.writeToFile(appId, varFilePath, appData);

                        var dimFilePath = config.filenames.outputDir + config.filenames.dimensions_table;
                        dimensionData.writeToFile(appId, dimFilePath, appData);
                        
                        var mesFilePath = config.filenames.outputDir + config.filenames.measures_table;
                        measureData.writeToFile(appId, mesFilePath, appData);
                    })
                })
            }));
        });
}

module.exports = main;