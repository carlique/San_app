'use strict';

const restify = require('restify');
const util    = require('util');

var config = require('config');

const debug   = require('debug')('san_app:server');
const error = require('debug')('san_app:error');

var Logger = require('./lib/utils/logger');
var logger = new Logger();

var port = process.env.PORT || config.port || 3000;
var url = process.env.URL || config.url || 'localhost';

var server = restify.createServer({
  name: 'SAN_app' || config.name,
  version: config.version,
  log: logger.getSystemLogger()   // Pass our logger to restify.
});

server.use(restify.gzipResponse());
server.use(restify.fullResponse());
server.use(restify.authorizationParser());
//server.use(check);
server.use(restify.queryParser());
server.use(restify.bodyParser({
  mapParams: true
}));

require('./routes/index')(server);

server.on('uncaughtException', function(req, res, route, err) {
  var auditer = restify.auditLogger({log:log});
  auditer(req, res, route, err);
  res.send(500, "Unexpected error occured");
});

server.on('after', function(req, res, route, err) {
  if (route &&
      (
        route.spec.path === '_health'
      )
    ) {
    //Skip auditor logging if its health request
    return;
  }
  var auditer = restify.auditLogger({log:log});
  auditer(req, res, route, err);
});

server.listen(port, process.env.REST_LISTEN ? process.env.REST_LISTEN : url, function() {
  log.info(server.name +' listening at '+ server.url);
});

module.exports = server;
