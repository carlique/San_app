'use strict';

// TODO: use debug tool
// TODO: write comments

const Sequelize = require("sequelize");
const Response = require('../utils/response');

var models = require('../models');
var Resource = models.Resource;

module.exports = ResourcesService;

function ResourcesService () {
}

ResourcesService.prototype.getAll = function (req, res, next) {
  var maxRecords = req.params.limit ? req.params.limit : 10;
  var lastId = req.params.lastId ? req.params.lastId : 0;

  if (maxRecords > 50) maxRecords = 50;

  Resource.findAll({
      limit: maxRecords,
      where: {
        id: {
          $gt: lastId
        }
      }
    }).then(resources => {
    log.info('ResourcesService.getAll returns: '+ resources.length +' records');
    res.send(200, Response.success(resources, "Returned " + resources.length + " records."));
    return next ();
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
};

ResourcesService.prototype.getById = function (req, res, next) {
  Resource.findById(req.params.id).then(resource => {
    if (!resource) {
      log.info('ResourcesService.getById: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find resource with id: " + req.params.id));
    } else {
      log.info('ResourcesService.getById: ' + JSON.stringify(resource));
      res.send(200, Response.success(resource,"Returned resource with id: " + req.params.id));
    }
    return next ();
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
}

ResourcesService.prototype.create = function (req, res, next) {
  Resource.create({
    name: req.params.name,
    altName: req.params.altName,
    count: req.params.count,
    price: req.params.price,
    unit: req.params.unit,
    desc: req.params.desc
  })
  .then(resource => {
    log.info('ResourcesService.create: create with Id '+ resource.id);
    res.header('Location', '/resources/' + resource.id);
    res.send(201, Response.success(resource, "Resource creted with id: " + resource.id));
    return next ();
  })
  .catch(Sequelize.ValidationError, function (err) {
    log.info('ResourcesService.create: validation error');
    res.send(422, Response.error(null, "Validation error", err.errors));
    return next ();
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    return next (err);
  });
};

ResourcesService.prototype.update = function (req, res, next) {
  Resource.findById(req.params.id).then(resource => {
    if (!resource) {
      log.info('ResourcesService.update: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find resource with id: " + req.params.id));
      return next ();
    }
    else {
      resource.update({
        name: req.params.name,
        altName: req.params.altName,
        count: req.params.count,
        price: req.params.price,
        unit: req.params.unit,
        desc: req.params.desc
      })
      .then(resource => {
        log.info('ResourcesService Id:' + resource.id + ' updated');
        res.send(200, Response.success(resource, "Resource updated with id: " + resource.id));
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

ResourcesService.prototype.destroy = function (req, res, next) {
  Resource.findById(req.params.id).then(resource => {
    if (!resource) {
      log.info('ResourcesService.destroy: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find resource with id: " + req.params.id));
      return next ();
    }
    else {
      resource.destroy()
      .then(function() {
        log.info('ResourcesService resource with id: ' + req.params.id + ' deleted');
        res.send(200, Response.success(null, "Resource deleted with id: " + req.params.id));
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
