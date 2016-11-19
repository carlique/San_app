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
    res.send(500, err);
    log.error(err.stack);
    next(false);
  });
};

CompanyService.prototype.getById = function (req, res, next) {
  Company.findById(req.params.id).then(company => {
    if (!company) {
      log.info('CompanyService.getById: 404');
      res.send(404, new Error("Did not find company with id: " + req.params.id));
    } else {
      log.info('CompanyService.getById: ' + JSON.stringify(company));
      res.send(company)
    }
    next (false);
  })
  .catch(err => {
    res.send(500, err);
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
    log.info('CompanyService.created with Id: '+ JSON.stringify(company));
    res.send(company);
    next(false);
  })
  .catch(Sequelize.ValidationError, function (err) {
    // respond with validation errors
    return res.send(422,err.errors);
  })
  .catch(err => {
    res.send(500, err);
    log.error(err.stack);
    next(false);
  });
};

CompanyService.prototype.update = function (req, res, next) {
  Company.findById(req.params.id).then(company => {
    if (!company) {
      log.info('CompanyService.getById: 404');
      res.send(404, new Error("Did not find company with id: " + req.params.id));
      next(false);
    }
    else {
      company.update({
        name: req.params.name,
        ico: req.params.ico
      })
      .then(company => {
        log.info('CompanyService Id:' + company.id + ' updated');
        res.send(company);
        next(false);
      })
      .catch(Sequelize.ValidationError, function (err) {
        // respond with validation errors
        return res.send(422,err.errors);
      })
    }
  })
  .catch(err => {
    res.send(500, err);
    log.error(err.stack);
    next(false);
  });
};

CompanyService.prototype.destroy = function (req, res, next) {
  Company.findById(req.params.id).then(company => {
    if (!company) {
      log.info('CompanyService.getById: 404');
      res.send(404, new Error("Did not find company with id: " + req.params.id));
      next(false);
    }
    else {
      company.destroy()
      .then(company => {
        log.info('CompanyService company deleted');
        res.send(204);
        next(false);
      })
    }
  })
  .catch(err => {
    res.send(500, err);
    log.error(err.stack);
    next(false);
  });
};
