'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Companies', 'street', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'city', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'post', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'country', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'streetInvoice', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'cityInvoice', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'postInvoice', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'countryInvoice', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'customer', Sequelize.INTEGER);
    queryInterface.addColumn('Companies', 'provider', Sequelize.INTEGER);
    queryInterface.addColumn('Companies', 'bank', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'account', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'iban', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'vatNumber', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'email', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'www', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'phoneNumber', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'phoneNumber2', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'phoneFax', Sequelize.STRING);
    queryInterface.addColumn('Companies', 'desc', Sequelize.TEXT);

    queryInterface.renameColumn('Companies', 'ico', 'idNumber');
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Companies', 'street');
    queryInterface.removeColumn('Companies', 'city');
    queryInterface.removeColumn('Companies', 'post');
    queryInterface.removeColumn('Companies', 'country');
    queryInterface.removeColumn('Companies', 'streetInvoice');
    queryInterface.removeColumn('Companies', 'cityInvoice');
    queryInterface.removeColumn('Companies', 'postInvoice');
    queryInterface.removeColumn('Companies', 'countryInvoice');
    queryInterface.removeColumn('Companies', 'customer');
    queryInterface.removeColumn('Companies', 'provider');
    queryInterface.removeColumn('Companies', 'bank');
    queryInterface.removeColumn('Companies', 'account');
    queryInterface.removeColumn('Companies', 'iban');
    queryInterface.removeColumn('Companies', 'vatNumber');
    queryInterface.removeColumn('Companies', 'email');
    queryInterface.removeColumn('Companies', 'www');
    queryInterface.removeColumn('Companies', 'phoneNumber');
    queryInterface.removeColumn('Companies', 'phoneNumber2');
    queryInterface.removeColumn('Companies', 'phoneFax');
    queryInterface.removeColumn('Companies', 'desc');

    queryInterface.renameColumn('Companies', 'idNumber', 'ico');
  }
};
