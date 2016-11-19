module.exports = function(server) {

  server.get('_health', function health(req, res, next) {
    var Resource = require('./lib/resources/health');
    var resource = new Resource();
    resource.health(req, res, next);
  });

  server.get('/companies', (req, res, next) => {
    var resource = new (require('./lib/resources/company'));
    resource.getAll(req, res, next);
  });

  server.get('/companies/:id', (req, res, next) => {
    var resource = new (require('./lib/resources/company'));
    resource.getById(req, res, next);
  });

  server.post('/companies', (req, res, next) => {
    var resource = new (require('./lib/resources/company'));
    resource.create(req, res, next);
  });

  server.put('/companies/:id', (req, res, next) => {
    var resource = new (require('./lib/resources/company'));
    resource.update(req, res, next);
  });

  server.del('/companies/:id', (req, res, next) => {
    var resource = new (require('./lib/resources/company'));
    resource.destroy(req, res, next);
  });

}
