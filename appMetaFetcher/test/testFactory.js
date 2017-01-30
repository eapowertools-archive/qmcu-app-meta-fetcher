var sinon = require('sinon');
var Promise = require("bluebird");

var main = require('../main');
var qsocks = require('qsocks');
var config = require('../config/testConfig');

var app1 = require('./app1');
var app2 = require('./app2');



var qSocksConfig = new Promise(function(resolve, reject) {
    resolve({
        getDocList: function(){
            return Promise.resolve([{
                qDocId: app1.qId
            },{
                qDocId: app2.qId
            }]);
        },
        openDoc: function(id){
            if (id == app1.qId)
            {
                return Promise.resolve(app1);
            }
            else if (id == app2.qId)
            {
                return Promise.resolve(app2);
            }
        }
    });
});


var serializeAppResult = new Promise(function(resolve, reject) {
    resolve(app1);
});


sinon.stub(qsocks, 'Connect').returns(qSocksConfig);

var serializeApp = function(appToSerialize) {
    return Promise.resolve(app1);
    // return new Promise(function(resolve, reject) {
    //     resolve(app1);
    // });
};

var qrsInteract = {
    Get: function(endpoint) {
         return Promise.resolve([]);
    }
};

var socketEmitter = {
    emit: function(name, msg) {
        console.log(name+"::"+msg);
    }
}

var testmain = new main(qsocks, serializeApp, qrsInteract, config);
