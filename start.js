//in upnpserver/lib
// create i18n_it.js

var server = require('./server.js');
var client = require('./client.js');

server.init();

setTimeout(function() {
    client.initSSDP();
//    client.init();
    }, 3000
);
