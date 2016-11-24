'use strict';

const PATH_TO_SERVICE = '../services/resources';

module.exports = Resources;

function Resources () {
}

Resources.prototype.getById = function (req, res, next) {
  var service = new (require(PATH_TO_SERVICE));
  service.getById(req, res, next);
};

Resources.prototype.getAll = function (req, res, next) {
  var service = new (require(PATH_TO_SERVICE));
  service.getAll(req, res, next);
};

Resources.prototype.create = function (req, res, next) {
  var service = new (require(PATH_TO_SERVICE));
  service.create(req, res, next);
};

Resources.prototype.update = function (req, res, next) {
  var service = new (require(PATH_TO_SERVICE));
  service.update(req, res, next);
};

Resources.prototype.destroy = function (req, res, next) {
  var service = new (require(PATH_TO_SERVICE));
  service.destroy(req, res, next);
};
