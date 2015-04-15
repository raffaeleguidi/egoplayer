var upnpClient = require('node-upnp-client');

module.exports = {

    initSSDP: function() {
        var Client = require('node-ssdp').Client
            , client = new Client();

        client.on('response', function (headers, statusCode, rinfo) {
          log.info('Got a response to an m-search.');
        });

        var serviceType = 'urn:schemas-upnp-org:service:ContentDirectory:1';

        log.info("search for a service type: %s", serviceType);

        // search for a service type
        client.search(serviceType);

        // Or get a list of all services on the network
        client.search('ssdp:all')
    },
    init: function() {

        log.info('Starting Egotic Client');

//        cli = upnpClient(1901);
        cli = upnpClient();

        cli.searchDevices();

        // listen for search terminated

        cli.on('searchDevicesEnd', function() {
            log.info('_avTransports'+ JSON.stringify(cli._avTransports))
            log.info('_renderers'+ JSON.stringify(cli._renderers))
            log.info('_connectionManagers'+ JSON.stringify(cli._connectionManagers))
            log.info('_servers count: %d', cli._servers.length)
            log.info('_servers'+ JSON.stringify(cli._servers))
        });

        // listen for added / removed devices

        cli.on('updateUpnpDevice', function() {
            log.info('_avTransports'+ JSON.stringify(cli._avTransports))
            log.info('_renderers'+ JSON.stringify(cli._renderers))
            log.info('_connectionManagers'+ JSON.stringify(cli._connectionManagers))
            log.info('_servers count: %d', cli._servers.length)
            log.info('_servers'+ JSON.stringify(cli._servers))
        });
    }

}

// in client.js
//if (port) PORT=port;

var winston = require("winston");
require("date-format-lite");
var log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        return new Date().format("YYYY/MM/DD hh:mm:ss,S");
      },
      formatter: function(options) {
        // Return string will be passed to logger.
        return options.timestamp() +' [CLIENT] '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
  ]
});

//log.info
//log.set(log.transports.Console, { timestamp: true });

/*
Console Transport

  winston.add(winston.transports.Console, options)
The Console transport takes a few simple options:

level: Level of messages that this transport should log (default 'info').
silent: Boolean flag indicating whether to suppress output (default false).
colorize: Boolean flag indicating if we should colorize output (default false).
timestamp: Boolean flag indicating if we should prepend output with timestamps (default false). If function is specified, its return value will be used instead of timestamps.
prettyPrint: Boolean flag indicating if we should util.inspect the meta (default false). If function is specified, its return value will be the string representing the meta.
depth Numeric indicating how many times to recurse while formatting the object with util.inspect (only used with prettyPrint: true) (default null, unlimited)
showLevel: Boolean flag indicating if we should prepend output with level (default true).
formatter: If function is specified, its return value will be used instead of default output. (default undefined)
debugStdout: Boolean flag indicating if 'debug'-level output should be redirected to stdout instead of to stderr. (default false)
Metadata: Logged via util.inspect(meta);
*/

var cli = {};
//
////start search
//


/*

you can now access, servers/renderers/connectionManagers and avTransports lists with :

cli._avTransports,
cli._renderers,
cli._connectionManagers,
cli._servers

Exemple of cli object after search with a server and renderer:

upnpClient {domain: null, _events: Object, _maxListeners: 10, _client: Socket, _ssdp: SSDP…}
_avTransports: Array[2]
_client: Socket
_connectionManagers: Array[5]
_events: Object
_maxListeners: 10
_renderers: Array[2]
0: Object
_index: 0
baseUrl: "http://192.168.0.21:54243"
friendlyName: "salon"
icon: "http://192.168.0.21:54243/icons/sm.png"
id: "uuid:79773cf6-fbac-3fab-b616-337183de8cdc:urn:schemas-upnp-org:service:RenderingControl:1urn:upnp-org:serviceId:RenderingControl"
modelName: "Freebox"
name: "urn:upnp-org:serviceId:RenderingControl"
online: true
onserviceoffline: false
onserviceonline: false
type: "upnp:urn:schemas-upnp-org:service:RenderingControl:1"
udn: "uuid:79773cf6-fbac-3fab-b616-337183de8cdc"
url: "http://192.168.0.21:54243/service/RenderingControl/control"
__proto__: Object
1: Object
length: 2
__proto__: Array[0]
_servers: Array[3]
0: Object
_index: 0
baseUrl: "http://192.168.0.36:10293"
friendlyName: "Ht5streamer_smo-ubu"
icon: "http://192.168.0.36:10293/icons/icon_32.png"
id: "uuid:50252187-dd92-4267-8a19-502c576a4eca:urn:schemas-upnp-org:service:ContentDirectory:1urn:upnp-org:serviceId:ContentDirectory"
modelName: "Windows Media Connect compatible (Node upnpserver)"
name: "urn:upnp-org:serviceId:ContentDirectory"
online: true
onserviceoffline: false
onserviceonline: false
type: "upnp:urn:schemas-upnp-org:service:ContentDirectory:1"
udn: "uuid:50252187-dd92-4267-8a19-502c576a4eca"
url: "http://192.168.0.36:10293/cds/control"
__proto__: Object
1: Object
2: Object
length: 3
__proto__: Array[0]
_ssdp: SSDP
_udnList: Array[5]
domain: null
__proto__: upnpClient

*/

