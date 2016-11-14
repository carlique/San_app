module.exports = function(server) {

  server.get('_health', function health(req, res, next) {
    var Resource = require('./lib/resources/health');
    var resource = new Resource();
    resource.health(req, res, next);
  });

  server.get('/company/:id', (req, res, next) => {
    var Resource = require('./lib/resources/company');
    var resource = new Resource();
    resource.getById(req, res, next);
  });

}
