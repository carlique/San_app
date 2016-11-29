'use strict';

// TODO: use debug tool
// TODO: write comments
// TODO: prototype return messages - sigle, plural, ...

const Sequelize = require("sequelize");
const Response = require('../utils/response');

var models = require('../models');
var Version = models.Version;
var Item = models.Item;

module.exports = ItemsService;

function ItemsService () {
}

ItemsService.prototype.getAll = function (req, res, next) {
  Version.findById(req.params.versionId).then(version => {
    if (!version) {
      log.info('VersionsService.getAll: version with versionId not found: '+ req.params.versionId);
      return res.send(404, Response.error(null, "Couldn't find version with id: " + req.params.versionId));
    } else {
      version.getItems().then(items => {
        log.info('VersionsService.getAll returns: '+ items.length +' records');
        res.send(200, Response.success(items, "Returned " + items.length + " records."));
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

ItemsService.prototype.getById = function (req, res, next) {
  Version.findOne({
    where: {
      id: req.params.versionId,
      CalculationId: req.params.calculationId
    }
  }).then(version => {
    if (!version) {
      log.info('ItemsService.getAll: calculation and/or version with calculation and/or versionId not found: '+ req.params.calculationId + ", "+ req.params.versionId);
      return res.send(404, Response.error(null, "Couldn't find calculation/version with id: " + req.params.calculationId + "/" + req.params.versionId));
    } else {
      Item.findById(req.params.id).then(item => {
        if (!item) {
          log.info('ItemsService.getById: id not found: '+ req.params.id);
          res.send(404, Response.error(null, "Couldn't find Version with id: " + req.params.id));
        } else {
          log.info('ItemsService.getById: ' + JSON.stringify(item));
          res.send(200, Response.success(item,"Returned item with id: " + req.params.id));
        }
      })
    return next ();
    }
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
}

ItemsService.prototype.create = function (req, res, next) {
  Version.findOne({
    where: {
      id: req.params.versionId,
      CalculationId: req.params.calculationId
    }
  })
  .then(version => {
    if (!version) {
      log.info('ItemsService.getAll: calculation and/or version with calculation and/or versionId not found: '+ req.params.calculationId + ", "+ req.params.versionId);
      return res.send(404, Response.error(null, "Couldn't find calculation/version with id: " + req.params.calculationId + "/" + req.params.versionId));
    } else {
      Item.create({
        name: req.params.name,
        amount: req.params.amount,
        unit: req.params.unit,
        price: req.params.price,
        discount: req.params.discount,
        vat: req.params.vat,
        VersionId: version.id
      })
      .then(item => {
        log.info('ItemsService.create: create with Id '+ item.id);
        res.header('Location', '/calculations/' + version.CalculationId + '/versions/' + version.id + '/items/' + item.id);
        res.send(201, Response.success(item, "Item created with id: " + item.id));
        return next ();
      })
      .catch(Sequelize.ValidationError, function (err) {
        log.info('ItemsService.create: validation error');
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

ItemsService.prototype.update = function (req, res, next) {
  Version.findOne({
    where: {
      id: req.params.versionId,
      CalculationId: req.params.calculationId
    }
  }).then(version => {
    if (!version) {
      log.info('ItemsService.getAll: calculation and/or version with calculation and/or versionId not found: '+ req.params.calculationId + ", "+ req.params.versionId);
      return res.send(404, Response.error(null, "Couldn't find calculation/version with id: " + req.params.calculationId + "/" + req.params.versionId));
    } else {
      Item.findById(req.params.id).then(item => {
        if (!item) {
          log.info('ItemsService.update: id not found: '+ req.params.id);
          res.send(404, Response.error(null, "Couldn't find item with id: " + req.params.id));
          return next ();
        } else {
          item.update({
            name: req.params.name,
            amount: req.params.amount,
            unit: req.params.unit,
            price: req.params.price,
            discount: req.params.discount,
            vat: req.params.vat,
          })
          .then(item => {
            log.info('ItemsService Id:' + item.id + ' updated');
            res.send(200, Response.success(item, "Item updated with id: " + item.id));
            return next ();
          })
          .catch(Sequelize.ValidationError, function (err) {
            res.send(422, Response.error(null, "Validation error", err.errors));
            return next ();
          });
        }
      })
    }
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
};

ItemsService.prototype.destroy = function (req, res, next) {
  Version.findOne({
    where: {
      id: req.params.versionId,
      CalculationId: req.params.calculationId
    }
  }).then(version => {
    if (!version) {
      log.info('ItemsService.getAll: calculation and/or version with calculation and/or versionId not found: '+ req.params.calculationId + ", "+ req.params.versionId);
      return res.send(404, Response.error(null, "Couldn't find calculation/version with id: " + req.params.calculationId + "/" + req.params.versionId));
    } else {
      Item.findById(req.params.id).then(item => {
        if (!item) {
          log.info('ItemsService.destroy: id not found: '+ req.params.id);
          res.send(404, Response.error(null, "Couldn't find item with id: " + req.params.id));
          return next ();
        }
        else {
          item.destroy()
          .then(function() {
            log.info('ItemsService item with id: ' + req.params.id + ' deleted');
            res.send(200, Response.success(null, "Item deleted with id: " + req.params.id));
            return next ();
          });
        }
      });
    }
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
};
