'use strict';

// TODO: use debug tool
// TODO: write comments

const Sequelize = require("sequelize");
const Response = require('../utils/response');

var models = require('../models');
var Company = models.Company;

module.exports = CompaniesService;

function CompaniesService () {
}

CompaniesService.prototype.getAll = function (req, res, next) {
  var maxRecords = req.params.limit ? req.params.limit : 10;
  var lastId = req.params.lastId ? req.params.lastId : 0;

  if (maxRecords > 50) maxRecords = 50;

  Company.findAll({
      limit: maxRecords,
      where: {
        id: {
          $gt: lastId
        }
      }
    }).then(companies => {
    log.info('CompanyService.getAll returns: '+ companies.length +' records');
    res.send(200, Response.success(companies, "Returned " + companies.length + " records."));
    return next ();
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
};

CompaniesService.prototype.getById = function (req, res, next) {
  Company.findById(req.params.id).then(company => {
    if (!company) {
      log.info('CompanyService.getById: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find company with id: " + req.params.id));
    } else {
      log.info('CompanyService.getById: ' + JSON.stringify(company));
      res.send(200, Response.success(company,"Returned company with id: " + req.params.id));
    }
    return next ();
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
}

CompaniesService.prototype.getContactsForId = function (req, res, next) {
  Company.findById(req.params.id).then(company => {
    if (!company) {
      log.info('CompanyService.getContactsForId: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find company with id: " + req.params.id));
    } else {
      company.getContacts().then(contacts => {
        log.info('CompanyService.getContactsForId returns: '+ contacts.length +' records');
        res.send(200, Response.success(contacts, "Returned " + contacts.length + " records."));
      });
      return next ();
    }
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
}

CompaniesService.prototype.create = function (req, res, next) {
  Company.create({
    name: req.params.name,
    street: req.params.street,
    city: req.params.city,
    post: req.params.post,
    country: req.params.country,
    streetInvoice: req.params.streetInvoice,
    cityInvoice: req.params.cityInvoice,
    postInvoice: req.params.postInvoice,
    countryInvoice: req.params.countryInvoice,
    customer: req.params.customer,
    provider: req.params.provider,
    bank: req.params.bank,
    account: req.params.account,
    iban: req.params.iban,
    idNumber: req.params.idNumber,
    vatNumber: req.params.vatNumber,
    email: req.params.email,
    www: req.params.www,
    phoneNumber: req.params.phoneNumber,
    phoneNumber2: req.params.phoneNumber2,
    phoneFax: req.params.phoneFax,
    desc: req.params.desc
  })
  .then(company => {
    log.info('CompanyService.create: create with Id '+ company.id);
    res.header('Location', '/companies/' + company.id);
    res.send(201, Response.success(company, "Company creted with id: " + company.id));
    return next ();
  })
  .catch(Sequelize.ValidationError, function (err) {
    log.info('CompanyService.create: validation error');
    res.send(422, Response.error(null, "Validation error", err.errors));
    return next ();
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
};

CompaniesService.prototype.update = function (req, res, next) {
  Company.findById(req.params.id).then(company => {
    if (!company) {
      log.info('CompanyService.update: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find company with id: " + req.params.id));
      return next ();
    }
    else {
      company.update({
        name: req.params.name,
        street: req.params.street,
        city: req.params.city,
        post: req.params.post,
        country: req.params.country,
        streetInvoice: req.params.streetInvoice,
        cityInvoice: req.params.cityInvoice,
        postInvoice: req.params.postInvoice,
        countryInvoice: req.params.countryInvoice,
        customer: req.params.customer,
        provider: req.params.provider,
        bank: req.params.bank,
        account: req.params.account,
        iban: req.params.iban,
        idNumber: req.params.idNumber,
        vatNumber: req.params.vatNumber,
        email: req.params.email,
        www: req.params.www,
        phoneNumber: req.params.phoneNumber,
        phoneNumber2: req.params.phoneNumber2,
        phoneFax: req.params.phoneFax,
        desc: req.params.desc
      })
      .then(company => {
        log.info('CompanyService Id:' + company.id + ' updated');
        res.send(200, Response.success(company, "Company updated with id: " + company.id));
        return next ();
      })
      .catch(Sequelize.ValidationError, function (err) {
        res.send(422, Response.error(null, "Validation error", err.errors));
        return next ();
      })
    }
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
};

CompaniesService.prototype.destroy = function (req, res, next) {
  Company.findById(req.params.id).then(company => {
    if (!company) {
      log.info('CompanyService.destroy: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find company with id: " + req.params.id));
      return next ();
    }
    else {
      company.destroy()
      .then(function() {
        log.info('CompanyService company with id: ' + req.params.id + ' deleted');
        res.send(200, Response.success(null, "Company deleted with id: " + req.params.id));
        return next ();
      })
    }
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
};
