const PATH_TO_RESOURCE = '../lib/resources/companies';
const BASE_URI = '/companies';

module.exports = function(server) {

  server.get(BASE_URI, (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.getAll(req, res, next);
  });

  server.get(BASE_URI + '/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.getById(req, res, next);
  });

  server.get(BASE_URI + '/:id/contacts', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.getContactsForId(req, res, next);
  });
  server.post(BASE_URI, (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.create(req, res, next);
  });

  server.put(BASE_URI + '/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.update(req, res, next);
  });

  server.del(BASE_URI + '/:id', (req, res, next) => {
    var resource = new (require(PATH_TO_RESOURCE));
    resource.destroy(req, res, next);
  });

}
