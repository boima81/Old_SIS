/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {
  /****************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   ****************************************************************************/

  middleware: {
    /***************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP requests.           *
     * (This Sails app's routes are handled by the "router" middleware below.)  *
     *                                                                          *
     ***************************************************************************/

    order: [
      "cookieParser",
      "session",
      "bodyParser",
      "compress",
      "poweredBy",
      "router",
      "www",
      "favicon",
      //   'test'
      //   'adminMiddleware'
    ],

    // test: function(req, res, next) {
    //   var domain = require('domain');
    //   var d = domain.create();
    //   d.on('error', function (er) {
    //       console.log('error =>',er);

    //   });
    //   d.add(req);
    //   d.add(res);
    //   d.run(function () {
    //     next();
    //   });
    // }

    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests.       *
     *                                                                          *
     * https://sailsjs.com/config/http#?customizing-the-body-parser             *
     *                                                                          *
     ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),
    // adminMiddleware: function (req, res, next) {
    //   console.log("Requested :: ", req.method, req.url);
    //   if (req.session && req.session.adminId) {
    //     console.error('req.session.adminId =>', req.session.adminId);

    //   }

    //   return next();
    // }
  },
};
