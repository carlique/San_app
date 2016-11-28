'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    return queryInterface.createTable(
      'Versions',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        number: Sequelize.INTEGER,
        calculationId: {
          type: Sequelize.INTEGER,
          references: { model: 'Companies', key: 'id' }
        },
        desc: Sequelize.TEXT
      }
    ).then(function () {
      return queryInterface.addIndex(
        'Versions',
        ['number'],
        {
          indexName: 'uniqueNumber',
          indicesType: 'UNIQUE'
        }
      );
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Versions');
  }
};
