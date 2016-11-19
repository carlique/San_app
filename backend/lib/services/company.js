'use strict';

const Sequelize = require("sequelize");
const Response = require('../utils/response');

var models = require('../models');
var Company = models.Company;

module.exports = CompanyService;

function CompanyService () {
}

CompanyService.prototype.getAll = function (req, res, next) {
  Company.findAll({}).then(companies => {
    log.info('CompanyService.getAll returns: '+ companies.length +' records');
    res.send(200, Response.success(companies, "Returned " + companies.length + " records."));
    next (false);
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    next(false);
  });
};

CompanyService.prototype.getById = function (req, res, next) {
  Company.findById(req.params.id).then(company => {
    if (!company) {
      log.info('CompanyService.getById: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find company with id: " + req.params.id));
    } else {
      log.info('CompanyService.getById: ' + JSON.stringify(company));
      res.send(200, Response.success(company,"Returned company with id: " + req.params.id));
    }
    next (false);
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    next(false);
  });
}

CompanyService.prototype.create = function (req, res, next) {
  Company.create({
    name: req.params.name,
    ico: req.params.ico}
  )
  .then(company => {
    log.info('CompanyService.created with Id: '+ company.id);
    res.send(200, Response.success(company, "Company creted with id: " + company.id));
    next(false);
  })
  .catch(Sequelize.ValidationError, function (err) {
    res.send(422, Response.error(null, "Validation error", err.errors));
    next(false);
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    next(false);
  });
};

CompanyService.prototype.update = function (req, res, next) {
  Company.findById(req.params.id).then(company => {
    if (!company) {
      log.info('CompanyService.update: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find company with id: " + req.params.id));
      next(false);
    }
    else {
      company.update({
        name: req.params.name,
        ico: req.params.ico
      })
      .then(company => {
        log.info('CompanyService Id:' + company.id + ' updated');
        res.send(200, Response.success(company, "Company updated with id: " + company.id));
        next(false);
      })
      .catch(Sequelize.ValidationError, function (err) {
        res.send(422, Response.error(null, "Validation error", err.errors));
      })
    }
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    next(false);
  });
};

CompanyService.prototype.destroy = function (req, res, next) {
  Company.findById(req.params.id).then(company => {
    if (!company) {
      log.info('CompanyService.destroy: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find company with id: " + req.params.id));
      next(false);
    }
    else {
      company.destroy()
      .then(function() {
        log.info('CompanyService company with id: ' + req.params.id + ' deleted');
        res.send(200, Response.success(null, "Company deleted with id: " + req.params.id));
        next(false);
      })
    }
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    next(false);
  });
};
