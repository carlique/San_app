'use strict';

const PATH_TO_SERVICE = '../services/companies';

module.exports = Companies;

function Companies () {
}

Companies.prototype.getById = function (req, res, next) {
  var service = new (require(PATH_TO_SERVICE));
  service.getById(req, res, next);
};

Companies.prototype.getAll = function (req, res, next) {
  var service = new (require(PATH_TO_SERVICE));
  service.getAll(req, res, next);
};

Companies.prototype.getContactsForId = function (req, res, next) {
  var service = new (require(PATH_TO_SERVICE));
  service.getContactsForId(req, res, next);
};

Companies.prototype.create = function (req, res, next) {
  var service = new (require(PATH_TO_SERVICE));
  service.create(req, res, next);
};

Companies.prototype.update = function (req, res, next) {
  var service = new (require(PATH_TO_SERVICE));
  service.update(req, res, next);
};

Companies.prototype.destroy = function (req, res, next) {
  var service = new (require(PATH_TO_SERVICE));
  service.destroy(req, res, next);
};
