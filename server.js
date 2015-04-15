var Server = require("upnpserver");

module.exports = {

    init: function() {

        log.info('Starting Egotic Server');
        var server=new Server({ httpPort: 10000, name: 'Egotic Player' /* configuration, see below */ }, [
           './media'
        //    { path: '/media/images' },
        //    { path: '/media/movies', mountPoint: '/My movies'},
        //    { path: '/media/albums', mountPoint: '/Personnal/My albums', type: 'music' }
        ]);

        server.start();
    }

}

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
        return options.timestamp() +' [SERVER] '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
  ]
});

