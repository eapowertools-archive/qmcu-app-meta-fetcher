var writeCSV = require('./writeCSV');

var appMetadata = {

    writeToFile: function(appID, filePath, appData) {
        var dataMatrix = [];
        var dataRow = [];
        dataRow.push(appID);
        dataRow.push(appData['properties']['qTitle']);
        dataRow.push(appData['properties']['modifiedDate']);
        dataRow.push(appData['properties']['published']);
        if (appData['properties']['publishTime'] == '1753-01-01T00:00:00.000Z')
        {
            dataRow.push("");
        }
        else
        {
            dataRow.push(appData['properties']['publishTime']);
        }
        if (appData['properties']['published'])
        {
            dataRow.push(appData['properties']['stream']['id']);
            dataRow.push(appData['properties']['stream']['name']);
        }
        else
        {
            dataRow.push("");
            dataRow.push("");
        }
        dataMatrix.push(dataRow);
        writeCSV.writeDataToFile(filePath, dataMatrix);
    }
}

module.exports = appMetadata;