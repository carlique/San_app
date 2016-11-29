'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
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
        CalculationId: {
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
    }).done();
  },

  down: function (queryInterface) {
    return queryInterface.dropTable('Versions')
    .done();
  }
};
