'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'Companies',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        name: Sequelize.STRING,
        idNumber: Sequelize.INTEGER,
      }
    ).done();
  },
  down: function (queryInterface) {
    queryInterface.dropTable('Companies')
    .done();
  }
};
