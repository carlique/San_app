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
        ico: Sequelize.INTEGER,
      }
    );
    done();
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Companies');
    done();
  }
};
