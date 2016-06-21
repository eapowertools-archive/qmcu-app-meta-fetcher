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

var sheets = jsonFile.readFile(testFile, function(err, file)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        file.sheets.forEach(function(sheet)
        {
            if(sheet.qProperty.qMetaDef.title=='My new sheet')
            {
                console.log(sheet.qChildren);
            }
        });
    }
});


