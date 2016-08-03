var variableData = require("./lib/getVariableData");
var writeCSV = require("./lib/writeCSV");
var writeHeaders = require('./lib/writeHeaders');
var serializeapp = require('serializeapp');
var fs = require('fs');


var main = function main(qsocks, config){
    var _global;

    try {
        fs.mkdirSync(config.filenames.outputDir);
    }
    catch(err) {
        console.log("Output folder already created.");
    }
    // create folder if it doesn't exist

    // Create all files and write headers to files
    writeHeaders.writeAllHeaders(config.filenames.outputDir);

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
                    return serializeApp(app);
                })
                .then(function(data)
                {
                    var filename = config.filenames.outputDir + config.filenames.variables_table;
                    variableData.writeToFile(fileDir, data)
                    return 0;
                })
            }));
        });
}

module.exports = main;