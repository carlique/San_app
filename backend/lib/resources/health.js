'use strict';

module.exports = Health;

function Health () {
}

Health.prototype.health = function (req, res, next) {
  var Service = require('./../services/health');
  var service = new Service();
  res.send(service.getInfo());
  next();
};
