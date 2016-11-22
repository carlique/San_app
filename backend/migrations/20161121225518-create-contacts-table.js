'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    queryInterface.createTable(
      'Contacts',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        title: Sequelize.STRING,
        companyId: {
          type: Sequelize.INTEGER,
          references: { model: 'Companies', key: 'id' }

        },
        title: Sequelize.STRING,
        position: Sequelize.STRING,
        street: Sequelize.STRING,
        city: Sequelize.STRING,
        post: Sequelize.STRING,
        country: Sequelize.STRING,
        phoneNumber: Sequelize.STRING,
        phoneNumber2: Sequelize.STRING,
        email: Sequelize.STRING,
        www: Sequelize.STRING,
        desc: Sequelize.TEXT
      }
    ).done();
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Contacts')
    .done();
  }
};
