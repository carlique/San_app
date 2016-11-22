'use strict';

module.exports = Companies;

function Companies () {
}

Companies.prototype.getById = function (req, res, next) {
  var service = new (require('./../services/companies'));
  service.getById(req, res, next);
};

Companies.prototype.getAll = function (req, res, next) {
  var service = new (require('./../services/companies'));
  service.getAll(req, res, next);
};

Companies.prototype.create = function (req, res, next) {
  var service = new (require('./../services/companies'));
  service.create(req, res, next);
};

Companies.prototype.update = function (req, res, next) {
  var service = new (require('./../services/companies'));
  service.update(req, res, next);
};

Companies.prototype.destroy = function (req, res, next) {
  var service = new (require('./../services/companies'));
  service.destroy(req, res, next);
};
