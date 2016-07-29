var variableData = require("./lib/getVariableData");
var writeCSV = require("./lib/writeCSV");
//var genAppMetadata = require("./lib/genAppMetadata");
var serializeapp = require('serializeapp');


var server = require('./lib/connect');

var appIdList;
var appIdIndex = 0;

function processApps() {
    if (appIdIndex >= appIdList.length)
    {
        return;
    }
    var docId = appIdList[appIdIndex];
    appIdIndex++;
    // do stuff with the app
    console.log(docId);
    processApps();


    
};


server.then(function(global)
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
            appIdList = docIds;
            processApps();
            
        }).catch(function(err) {
            console.log(err);    
    });

//  server.then(function(global) {
//     global.openDoc('6666b493-865c-445f-985c-38d90fe86224')
//         .then(function(app) {
//             console.log("I got here.");
//             return serializeapp(app);
//         })
//         .then(function(data) {
            
//             variableData.writeToFile("C:/temp/", data);

//             //console.log(data) // --> A JSON Object describing the app. 
//         });     
// }).catch(function(error) {
//     console.log(error);
// });