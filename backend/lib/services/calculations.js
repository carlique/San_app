'use strict';

// TODO: use debug tool
// TODO: write comments

const Sequelize = require("sequelize");
const Response = require('../utils/response');

var models = require('../models');
var Calc = models.Calculation;
var Version = models.Version;

module.exports = CalculationsService;

function CalculationsService () {
}

CalculationsService.prototype.getAll = function (req, res, next) {
  var maxRecords = req.params.limit ? req.params.limit : 10;
  var lastId = req.params.lastId ? req.params.lastId : 0;

  if (maxRecords > 50) maxRecords = 50;

  Calc.findAll({
      limit: maxRecords,
      where: {
        id: {
          $gt: lastId
        },
      }
    }).then(calculations => {
    log.info('CalculationsService.getAll returns: '+ calculations.length +' records');
    res.send(200, Response.success(calculations, "Returned " + calculations.length + " records."));
    return next ();
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
};

CalculationsService.prototype.getById = function (req, res, next) {
  Calc.findOne({
    where: { id: req.params.id }
  }).then(calculation => {
    if (!calculation) {
      log.info('CalculationsService.getById: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find calculation with id: " + req.params.id));
    } else {
      log.info('CalculationsService.getById: ' + JSON.stringify(calculation));
      res.send(200, Response.success(calculation,"Returned calculation with id: " + req.params.id));
    }
    return next ();
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
}

CalculationsService.prototype.create = function (req, res, next) {
  Calc.create({
    number: req.params.number,
    name: req.params.name,
    CompanyId: req.params.companyId,
    ContactId: req.params.contactId,
    street: req.params.street,
    city: req.params.city,
    post: req.params.post,
    country: req.params.country,
    phoneNumber: req.params.phoneNumber,
    phoneNumber2: req.params.phoneNumber2,
    dateFrom: req.params.dateFrom,
    dateTo: req.params.dateTo,
    discount: req.params.discount,
    booking: req.params.booking,
    order: req.params.order,
    dateOrder: req.params.dateOrder,
    assembleDate:  req.params.assembleDate,
    disassembleDate:  req.params.disassembleDate,
    assemblePhone:  req.params.assemblePhone,
    assembleContact: req.params.assembleContact,
    executionContact: req.params.executionContact,
    greetings: req.params.greetings,
    technician: req.params.technician,
    desc: req.params.desc
  })
  .then(calculation => {
    log.info('CalculationsService.create: create with Id '+ calculation.id);
    res.header('Location', '/calculations/' + calculation.id);
    res.send(201, Response.success(calculation, "Calculation created with id: " + calculation.id));
    return next ();
  })
  .catch(Sequelize.ValidationError, function (err) {
    log.info('CalculationsService.create: validation error');
    res.send(422, Response.error(null, "Validation error", err.errors));
    return next ();
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next ();
  });
};

CalculationsService.prototype.update = function (req, res, next) {
  Calc.findById(req.params.id).then(calculation => {
    if (!calculation) {
      log.info('CalculationsService.update: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find calculation with id: " + req.params.id));
      return next ();
    }
    else {
      calculation.update({
        number: req.params.number,
        name: req.params.name,
        companyId: req.params.companyId,
        contactId: req.params.contactId,
        street: req.params.street,
        city: req.params.city,
        post: req.params.post,
        country: req.params.country,
        phoneNumber: req.params.phoneNumber,
        phoneNumber2: req.params.phoneNumber2,
        dateFrom: req.params.dateFrom,
        dateTo: req.params.dateTo,
        discount: req.params.discount,
        booking: req.params.booking,
        order: req.params.order,
        dateOrder: req.params.dateOrder,
        assembleDate:  req.params.assembleDate,
        disassembleDate:  req.params.disassembleDate,
        assemblePhone:  req.params.assemblePhone,
        assembleContact: req.params.assembleContact,
        executionContact: req.params.executionContact,
        greetings: req.params.greetings,
        technician: req.params.technician,
        desc: req.params.desc
      })
      .then(calculation => {
        log.info('CalculationsService Id:' + calculation.id + ' updated');
        res.send(200, Response.success(calculation, "Calculation updated with id: " + calculation.id));
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

CalculationsService.prototype.destroy = function (req, res, next) {
  Calc.findById(req.params.id).then(calculation => {
    if (!calculation) {
      log.info('CalculationsService.destroy: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find calculation with id: " + req.params.id));
      return next ();
    }
    else {
      calculation.destroy()
      .then(function() {
        log.info('CalculationsService calculation with id: ' + req.params.id + ' deleted');
        res.send(200, Response.success(null, "Calculation deleted with id: " + req.params.id));
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
