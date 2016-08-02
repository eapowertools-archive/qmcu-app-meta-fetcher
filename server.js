var variableData = require("./lib/getVariableData");
var writeCSV = require("./lib/writeCSV");
var writeHeaders = require('./lib/writeHeaders');
//var genAppMetadata = require("./lib/genAppMetadata");
var serializeapp = require('serializeapp');
var server = require('./lib/connect');
var jsonFile = require('jsonfile');


var main = function main(qsocks, config){
    var _global;

    // Create all files and write headers to files
    writeHeaders.writeAllHeaders();



    qsocks.Connect(config).then(function(global)
        {
            _global = global;
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
            return Promise.all(docIds.map(function(app)
            {
                return _global.openDoc(app)
                .then(function(app)
                {
                    //return serializeApp(app);
                    return app;
                })
                .then(function(data)
                {
                    var fileDir = '/Users/jparis/Desktop/temp/';
                    variableData.writeToFile(fileDir, data)
                    return 0;
                })
            }));
        });
}

module.exports = main;