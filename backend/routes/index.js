module.exports = function(server) {

  server.get('_health', function health(req, res, next) {
    var Resource = require('../lib/resources/health');
    var resource = new Resource();
    resource.health(req, res, next);
  });

  require ('./calculations')(server);
  require ('./companies')(server);
  require ('./contacts')(server);
  require ('./resources')(server);
  require ('./vats')(server);
}
