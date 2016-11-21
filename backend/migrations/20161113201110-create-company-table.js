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
    ).then(function(){ next(false) });
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Companies')
    .then(function(){ next(false) });
  }
};
