var sinon = require('sinon');
var server = require('./server');
var qsocks = require('qsocks');
var Promise = require("bluebird");

var app1 = require('./test/app1');
var app2 = require('./test/app2');



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


sinon.stub(qsocks, 'Connect').returns(qSocksConfig);


var testmain = new server(qsocks);
