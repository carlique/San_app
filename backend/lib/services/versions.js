'use strict';

// TODO: use debug tool
// TODO: write comments

const Sequelize = require("sequelize");
const Response = require('../utils/response');

var models = require('../models');
var Version = models.Version;
var Calculation = models.Calculation;

module.exports = VersionsService;

function VersionsService () {
}

VersionsService.prototype.getAll = function (req, res, next) {
  Calculation.findById(req.params.calculationId).then(calculation => {
    if (!calculation) {
      log.info('VersionsService.getAll: calculation with calculationId not found: '+ req.params.calculationId);
      return res.send(404, Response.error(null, "Couldn't find calculation with id: " + req.params.calculationId));
    } else {
      calculation.getVersions().then(versions => {
        log.info('VersionsService.getAll returns: '+ versions.length +' records');
        res.send(200, Response.success(versions, "Returned " + versions.length + " records."));
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

VersionsService.prototype.getById = function (req, res, next) {
  Version.findById(req.params.id).then(version => {
    if (!version) {
      log.info('VersionsService.getById: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find Version with id: " + req.params.id));
    } else {
      log.info('VersionsService.getById: ' + JSON.stringify(version));
      res.send(200, Response.success(version,"Returned version with id: " + req.params.id));
    }
    return next ();
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
}

VersionsService.prototype.create = function (req, res, next) {
  Calculation.findById(req.params.calculationId).then(calculation => {
    if (!calculation) {
      log.info('VersionsService.getAll: calculation with calculationId not found: '+ req.params.calculationId);
      return res.send(404, Response.error(null, "Couldn't find calculation with id: " + req.params.calculationId));
    } else {
      Version.create({
        desc: req.params.desc,
        CalculationId: calculation.id
      })
      .then(version => {
        log.info('VersionsService.create: create with Id '+ version.id);
        res.header('Location', '/calculations/' + calculation.id + '/versions/' + version.id);
        res.send(201, Response.success(version, "Versions created with id: " + version.id));
        return next ();
      })
      .catch(Sequelize.ValidationError, function (err) {
        log.info('VersionsService.create: validation error');
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

VersionsService.prototype.update = function (req, res, next) {
  Calculation.findById(req.params.calculationId).then(calculation => {
    if (!calculation) {
      log.info('VersionsService.getAll: calculation with calculationId not found: '+ req.params.calculationId);
      return res.send(404, Response.error(null, "Couldn't find calculation with id: " + req.params.calculationId));
    } else {
      Version.findById(req.params.id).then(version => {
        if (!version) {
          log.info('VersionsService.update: id not found: '+ req.params.id);
          res.send(404, Response.error(null, "Couldn't find version with id: " + req.params.id));
          return next();
        }
        else {
          version.update({
            desc: req.params.desc,
          })
          .then(version => {
            log.info('VersionsService Id:' + version.id + ' updated');
            res.send(200, Response.success(version, "Version updated with id: " + version.id));
            return next ();
          })
          .catch(Sequelize.ValidationError, function (err) {
            res.send(422, Response.error(null, "Validation error", err.errors));
            return next ();
          })
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

VersionsService.prototype.destroy = function (req, res, next) {
  Calculation.findById(req.params.calculationId).then(calculation => {
    if (!calculation) {
      log.info('VersionsService.getAll: calculation with calculationId not found: '+ req.params.calculationId);
      return res.send(404, Response.error(null, "Couldn't find calculation with id: " + req.params.calculationId));
    } else {
      Version.findById(req.params.id).then(version => {
        if (!version) {
          log.info('VersionsService.destroy: id not found: '+ req.params.id);
          res.send(404, Response.error(null, "Couldn't find version with id: " + req.params.id));
          return next ();
        }
        else {
          version.destroy()
          .then(function() {
            log.info('VersionsService version with id: ' + req.params.id + ' deleted');
            res.send(200, Response.success(null, "Version deleted with id: " + req.params.id));
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
