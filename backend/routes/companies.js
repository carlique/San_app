const PATH_TO_RESOURCE = '../lib/resources/companies';

module.exports = function(server) {

  server.get('/companies', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.getAll(req, res, next);
  });

  server.get('/companies/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.getById(req, res, next);
  });

  server.get('/companies/:id/contacts', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.getContactsForId(req, res, next);
  });

  server.post('/companies', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.create(req, res, next);
  });

  server.put('/companies/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.update(req, res, next);
  });

  server.del('/companies/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.destroy(req, res, next);
  });

}
