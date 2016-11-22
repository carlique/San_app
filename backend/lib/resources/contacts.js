'use strict';

module.exports = Contacts;

function Contacts () {
}

Contacts.prototype.getById = function (req, res, next) {
  var service = new (require('./../services/contacts'));
  service.getById(req, res, next);
};

Contacts.prototype.getAll = function (req, res, next) {
  var service = new (require('./../services/contacts'));
  service.getAll(req, res, next);
};

Contacts.prototype.create = function (req, res, next) {
  var service = new (require('./../services/contacts'));
  service.create(req, res, next);
};

Contacts.prototype.update = function (req, res, next) {
  var service = new (require('./../services/contacts'));
  service.update(req, res, next);
};

Contacts.prototype.destroy = function (req, res, next) {
  var service = new (require('./../services/contacts'));
  service.destroy(req, res, next);
};
