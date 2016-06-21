var server = require('./lib/connect');
var serializeApp = require('serializeapp');
var jsonFile = require('jsonfile');

var x={};
var fileCount =0;

var genAppMetadata = 
{
    genAppMetadata : server
        .then(function(global)
        {
            x.global = global;
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
            docIds.forEach(function(file, index, array)
            {
                x.global.openDoc(file,'','','',true)
                .then(function(app)
                {
                    return serializeApp(app);
                })
                .then(function(data)
                {
                    var fileName = 'f:/My Documents/_Git/global-metrics-app/output/' + file + '.json';
                    console.log(fileName);
                    jsonFile.writeFileSync(fileName,data);
                    return fileCount++;
                    
                })
                .then(function(count)
                {
                    console.log(count + ' of ' + array.length)
                    if(count==array.length -1)
                    {
                        console.log('done!');
                    
                    }
                });
            })
        })
        .catch(function(error)
        {
            console.log(error);
            
        })
};

module.exports = genAppMetadata;