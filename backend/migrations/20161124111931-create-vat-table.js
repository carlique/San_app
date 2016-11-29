'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'VATs',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        name: Sequelize.STRING,
        vat: Sequelize.DECIMAL(10,2),
      }
    ).done();
  },

  down: function (queryInterface) {
    queryInterface.dropTable('VATs')
    .done();
  }
};
