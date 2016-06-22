var jsonFile = require('jsonfile');
var Promise = require('bluebird');
//var fs = Promise.promisifyAll(require('fs'));
var fs = require('fs');

var currDir = "F:/My Documents/_Git/global-metrics-app/output";

/*
fs.readdir(currDir, function(err, files)
{
    if(err)
    {
        return console.error(err);
    }
    
    files.forEach(function(file)
    {

    })

})
*/

var testFile = currDir + '/' + '540fadad-756c-4859-af39-20d6afe3f040.json';

var file = jsonFile.readFileSync(testFile);

var sheets = file.sheets;

var libItems = [];

sheets.forEach(function(sheet)
{
    sheet.qChildren.forEach(function(child)
    {
        if(child.qProperty.qHyperCubeDef != undefined)
        {
            child.qProperty.qHyperCubeDef.qDimensions.forEach(function(dimension)
            {
                if(dimension.qLibraryId != undefined)
                {
                    var result = {};
                    result.masterItemId = dimension.qLibraryId;
                    result.qInfo = child.qProperty.qInfo;
                    result.libraryItemUse = 'dimension';
                    result.sheetInfo = {
                        qInfo: sheet.qProperty.qInfo,
                        sheetTitle: sheet.qProperty.qMetaDef.title
                    };
                    libItems.push(result);
                }
            });
            child.qProperty.qHyperCubeDef.qMeasures.forEach(function(measure)
            {
                if(measure.qLibraryId != undefined)
                {
                    var result = {};
                    result.masterItemId = measure.qLibraryId;
                    result.qInfo = child.qProperty.qInfo;
                    result.libraryItemUse = 'measure';
                    result.sheetInfo = {
                        qInfo: sheet.qProperty.qInfo,
                        sheetTitle: sheet.qProperty.qMetaDef.title
                    };
                    libItems.push(result);
                }
            });
        }
    })
})

console.log(libItems);