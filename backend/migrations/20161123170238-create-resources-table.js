'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'Resources',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        name: Sequelize.STRING,
        altName: Sequelize.STRING,
        count: Sequelize.INTEGER,
        price: Sequelize.DECIMAL(10,2),
        unit: Sequelize.STRING,
        desc: Sequelize.TEXT
      }
    ).done();
  },

  down: function (queryInterface) {
    queryInterface.dropTable('Resources')
    .done();
  }
};
