'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('VATs', [
        {
          name: 'Base VAT',
          vat: 21
        },
        {
          name: 'Lowered VAT',
          vat: 15
        }
      ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('VATs', null, {})
  }
};
