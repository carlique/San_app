'use strict';

module.exports = {
  up: function (queryInterface) {
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

  down: function (queryInterface) {
    return queryInterface.bulkDelete('VATs', null, {})
  }
};
