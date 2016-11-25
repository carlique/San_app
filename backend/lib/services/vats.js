'use strict';

// TODO: use debug tool
// TODO: write comments

const Sequelize = require("sequelize");
const Response = require('../utils/response');

var models = require('../models');
var VAT = models.VAT;

module.exports = VATsService;

function VATsService () {
}

VATsService.prototype.getAll = function (req, res, next) {
  VAT.findAll().then(vats => {
    log.info('VATsService.getAll returns: '+ vats.length +' records');
    res.send(200, Response.success(vats, "Returned " + vats.length + " records."));
    return next ();
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
};

VATsService.prototype.getById = function (req, res, next) {
  VAT.findById(req.params.id).then(vat => {
    if (!vat) {
      log.info('VATsService.getById: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find VAT with id: " + req.params.id));
    } else {
      log.info('VATsService.getById: ' + JSON.stringify(vat));
      res.send(200, Response.success(vat,"Returned VAT with id: " + req.params.id));
    }
    return next ();
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
}

VATsService.prototype.create = function (req, res, next) {
  VAT.create({
    name: req.params.name,
    vat: req.params.vat
  })
  .then(vat => {
    log.info('VATsService.create: create with Id '+ vat.id);
    res.header('Location', '/vats/' + vat.id);
    res.send(201, Response.success(vat, "VAT creted with id: " + vat.id));
    return next ();
  })
  .catch(Sequelize.ValidationError, function (err) {
    log.info('VATsService.create: validation error');
    res.send(422, Response.error(null, "Validation error", err.errors));
    return next ();
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
};

VATsService.prototype.update = function (req, res, next) {
  VAT.findById(req.params.id).then(vat => {
    if (!vat) {
      log.info('VATsService.update: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find vat with id: " + req.params.id));
      return next ();
    }
    else {
      vat.update({
        name: req.params.name,
        vat: req.params.vat
      })
      .then(vat => {
        log.info('VATsService Id:' + vat.id + ' updated');
        res.send(200, Response.success(vat, "VAT updated with id: " + vat.id));
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

VATsService.prototype.destroy = function (req, res, next) {
  VAT.findById(req.params.id).then(vat => {
    if (!vat) {
      log.info('VATsService.destroy: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find vat with id: " + req.params.id));
      return next ();
    }
    else {
      vat.destroy()
      .then(function() {
        log.info('VATsService vat with id: ' + req.params.id + ' deleted');
        res.send(200, Response.success(null, "VAT deleted with id: " + req.params.id));
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
