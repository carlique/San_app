'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    queryInterface.createTable(
      'Calculations',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        number: Sequelize.STRING,
        name: Sequelize.STRING,
        companyId: {
          type: Sequelize.INTEGER,
          references: { model: 'Companies', key: 'id' }

        },
        contactId: {
          type: Sequelize.INTEGER,
          references: { model: 'Contacts', key: 'id' }
        },
        street: Sequelize.STRING,
        city: Sequelize.STRING,
        post: Sequelize.STRING,
        country: Sequelize.STRING,
        phoneNumber: Sequelize.STRING,
        phoneNumber2: Sequelize.STRING,
        dateFrom: Sequelize.DATE,
        dateTo: Sequelize.DATE,
        discount: Sequelize.DECIMAL(10,2),
        booking: Sequelize.BOOLEAN,
        order: Sequelize.STRING,
        dateOrder: Sequelize.DATE,
        assembleDate:  Sequelize.DATE,
        disassembleDate:  Sequelize.DATE,
        assemblePhone:  Sequelize.DATE,
        assembleContact: Sequelize.STRING,
        executionContact: Sequelize.STRING,
        greetings: Sequelize.STRING,
        technician: Sequelize.STRING,
        desc: Sequelize.TEXT
      }
    ).done();
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Calculations')
    .done();
  }
};
