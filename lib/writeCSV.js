var fs = require('fs');

var delimiter = "|";

var writeCSV = {
    
    writeHeadersToFile: function(filename, headers) {
        var dataToWrite = "";
        headers.forEach(function(element) {
            dataToWrite += element + delimiter;
        }, this);
        dataToWrite = dataToWrite.substring(0, dataToWrite.length-1);
        dataToWrite += "\n";

        fs.writeFileSync(filename, dataToWrite, {flag: 'w'}, function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
        console.log(filename + " was saved.");
    },
    writeDataToFile: function(filename, data) {
        var dataToWrite = "";

        data.forEach(function(element) {
            element.forEach(function(element) {
                dataToWrite += element + delimiter;
            }, this);
            dataToWrite = dataToWrite.substring(0, dataToWrite.length-1);
            dataToWrite += "\n";
        }, this);

        fs.writeFileSync(filename, dataToWrite, {flag: 'a'}, function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
        console.log(filename + " was saved.");
    }
}

module.exports = writeCSV;
