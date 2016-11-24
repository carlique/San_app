const PATH_TO_RESOURCE = '../lib/resources/resources';

module.exports = function(server) {

  server.get('/resources', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.getAll(req, res, next);
  });

  server.get('/resources/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.getById(req, res, next);
  });

  server.post('/resources', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.create(req, res, next);
  });

  server.put('/resources/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.update(req, res, next);
  });

  server.del('/resources/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.destroy(req, res, next);
  });

}
