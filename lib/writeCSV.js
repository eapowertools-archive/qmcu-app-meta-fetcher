var fs = require('fs');


var writeCSV = {
    writeToFile: function(filename, headers, data) {
        var dataToWrite = "";
        headers.forEach(function(element) {
            dataToWrite += element + ",";
        }, this);
        dataToWrite = dataToWrite.substring(0, dataToWrite.length-1);
        dataToWrite += "\n";

        data.forEach(function(element) {
            if (element.length != headers.length)
            {
                throw "Number of elements in row does not match the number of headers."
            }
            element.forEach(function(element) {
                dataToWrite += element + ",";
            }, this);
            dataToWrite = dataToWrite.substring(0, dataToWrite.length-1);
            dataToWrite += "\n";
        }, this);

        fs.writeFile(filename, dataToWrite, {flag: 'w'}, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log(filename + " was saved.");
        }); 
    }
}

module.exports = writeCSV;
