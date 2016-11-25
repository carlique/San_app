const PATH_TO_RESOURCE = '../lib/resources/vats';

module.exports = function(server) {

  server.get('/vats', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.getAll(req, res, next);
  });

  server.get('/vats/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.getById(req, res, next);
  });

  server.post('/vats', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.create(req, res, next);
  });

  server.put('/vats/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.update(req, res, next);
  });

  server.del('/vats/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.destroy(req, res, next);
  });

}
