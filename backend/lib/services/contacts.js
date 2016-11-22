'use strict';

const Sequelize = require("sequelize");
const Response = require('../utils/response');

var models = require('../models');
var Contact = models.Contact;

module.exports = ContactsService;

function ContactsService () {
}

ContactsService.prototype.getAll = function (req, res, next) {
  var maxRecords = req.params.limit ? req.params.limit : 10;
  var lastId = req.params.lastId ? req.params.lastId : 0;

  if (maxRecords > 50) maxRecords = 50;

  Contact.findAll({
      limit: maxRecords,
      where: {
        id: {
          $gt: lastId
        }
      }
    }).then(contacts => {
    log.info('ContactsService.getAll returns: '+ contacts.length +' records');
    res.send(200, Response.success(contacts, "Returned " + contacts.length + " records."));
    next (false);
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    next(false);
  });
};

ContactsService.prototype.getById = function (req, res, next) {
  Contact.findById(req.params.id).then(contact => {
    if (!contact) {
      log.info('ContactsService.getById: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find contact with id: " + req.params.id));
    } else {
      log.info('ContactsService.getById: ' + JSON.stringify(contact));
      res.send(200, Response.success(contact,"Returned contact with id: " + req.params.id));
    }
    next (false);
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    next(false);
  });
}

ContactsService.prototype.create = function (req, res, next) {
  Contact.create({
    firstName: req.params.firstName,
    lastName: req.params.lastName,
    CompanyId: req.params.companyId,
    title: req.params.title,
    position: req.params.position,
    street: req.params.street,
    city: req.params.city,
    post: req.params.post,
    country: req.params.country,
    phoneNumber: req.params.phoneNumber,
    phoneNumber2: req.params.phoneNumber2,
    email: req.params.email,
    www: req.params.www,
    desc: req.params.desc
  })
  .then(contact => {
    log.info('Contact created with Id '+ contact.id);
    res.header('Location', '/contacts/' + contact.id);
    res.send(201, Response.success(contact, "Contact created with id: " + contact.id));
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

ContactsService.prototype.update = function (req, res, next) {
  Contact.findById(req.params.id).then(contact => {
    if (!contact) {
      log.info('ContactsService.update: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find contact with id: " + req.params.id));
      next(false);
    }
    else {
      contact.update({
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        title: req.params.title,
        position: req.params.position,
        street: req.params.street,
        city: req.params.city,
        post: req.params.post,
        country: req.params.country,
        phoneNumber: req.params.phoneNumber,
        phoneNumber2: req.params.phoneNumber2,
        email: req.params.email,
        www: req.params.www,
        desc: req.params.desc
      })
      .then(contact => {
        log.info('ContactsService Id:' + contact.id + ' updated');
        res.send(200, Response.success(contact, "Contact updated with id: " + contact.id));
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

ContactsService.prototype.destroy = function (req, res, next) {
  Contact.findById(req.params.id).then(contact => {
    if (!contact) {
      log.info('ContactsService.destroy: id not found: '+ req.params.id);
      res.send(404, Response.error(null, "Couldn't find contact with id: " + req.params.id));
      next(false);
    }
    else {
      contact.destroy()
      .then(function() {
        log.info('ContactsService contact with id: ' + req.params.id + ' deleted');
        res.send(200, Response.success(null, "Contact deleted with id: " + req.params.id));
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
