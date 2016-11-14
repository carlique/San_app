'use strict';

module.exports = Company;

function Company () {
}

Company.prototype.getById = function (req, res, next) {
  var Service = require('./../services/company');
  var service = new Service();
  service.getById(req, res, next);
};
