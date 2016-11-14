'use strict';

const Sequelize = require("sequelize");

var models = require('../models');
var Company = models.Company;

// TODO: use proper system wide logger
var Logger = require('../utils/logger');
var logger = new Logger();

//const log       = require('debug')('company:sequelize-model');
//const error     = require('debug')('company:error');

module.exports = CompanyService;

function CompanyService () {
}

CompanyService.prototype.getById = function (req, res, next) {
  Company.findById(req.params.id).then(company => {
    if (!company) {
      res.send(404, new Error("Did not find company with id: " + req.params.id));
    } else {
      res.send(company)
    }
    next (false);
  })
  .catch(err => { res.send(500, err);
    error(err.stack);
    next(false);
  });
};
