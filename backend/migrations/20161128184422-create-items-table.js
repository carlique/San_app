'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'Items',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        name: Sequelize.STRING,
        amount: Sequelize.DECIMAL(10,2),
        unit: Sequelize.STRING,
        price: Sequelize.DECIMAL(10,2),
        discount: Sequelize.DECIMAL(10,2),
        vat: Sequelize.DECIMAL(10,2),
        VersionId: {
          type: Sequelize.INTEGER,
          references: { model: 'Versions', key: 'id' }
        },
      }
    ).then(function () {
      return queryInterface.addIndex(
        'Items',
        ['VersionId'],
        {
          indexName: 'versionIds'
        }
      );
    }).done();
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Items')
    .done();
  }
};
