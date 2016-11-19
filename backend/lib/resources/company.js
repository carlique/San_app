'use strict';

module.exports = Company;

function Company () {
}

Company.prototype.getById = function (req, res, next) {
  var service = new (require('./../services/company'));
  service.getById(req, res, next);
};

Company.prototype.getAll = function (req, res, next) {
  var service = new (require('./../services/company'));
  service.getAll(req, res, next);
};

Company.prototype.create = function (req, res, next) {
  var service = new (require('./../services/company'));
  service.create(req, res, next);
};

Company.prototype.update = function (req, res, next) {
  var service = new (require('./../services/company'));
  service.update(req, res, next);
};

Company.prototype.destroy = function (req, res, next) {
  var service = new (require('./../services/company'));
  service.destroy(req, res, next);
};
