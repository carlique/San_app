'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Resources', 'VATId', {
        type: Sequelize.INTEGER,
        references: { model: 'VATs', key: 'id' }
      }
    ).done();
  },
  down: function (queryInterface) {
    queryInterface.removeColumn('Resources', 'VATId')
    .done();
  }
};
