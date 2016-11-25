'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Resources', 'VATId', {
        type: Sequelize.INTEGER,
        references: { model: 'VATs', key: 'id' }
      }
    );
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Resources', 'VATId');

  }
};
