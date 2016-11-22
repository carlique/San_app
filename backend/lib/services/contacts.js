'use strict';

const Sequelize = require("sequelize");
const Response = require('../utils/response');

var models = require('../models');
var Contact = models.Contact;

module.exports = ContactsService;

function ContactsService () {
}

CompanyService.prototype.getAll = function (req, res, next) {
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
    res.send(200, Response.success(companies, "Returned " + contacts.length + " records."));
    next (false);
  })
  .catch(err => {
    res.send(500, Response.fail(null, "Unexpected error", err));
    log.error(err.stack);
    next(false);
  });
};
