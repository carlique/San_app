const PATH_TO_RESOURCE = '../lib/resources/contacts';

module.exports = function(server) {

  server.get('/contacts', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.getAll(req, res, next);
  });

  server.get('/contacts/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.getById(req, res, next);
  });

  server.post('/contacts', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.create(req, res, next);
  });

  server.put('/contacts/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.update(req, res, next);
  });

  server.del('/contacts/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.destroy(req, res, next);
  });

}
