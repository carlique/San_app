'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    post: DataTypes.STRING,
    country: DataTypes.STRING,
    streetInvoice: DataTypes.STRING,
    cityInvoice: DataTypes.STRING,
    postInvoice: DataTypes.STRING,
    countryInvoice: DataTypes.STRING,
    customer: DataTypes.INTEGER,
    provider: DataTypes.INTEGER,
    bank: DataTypes.STRING,
    account: DataTypes.STRING,
    iban: DataTypes.STRING,
    idNumber: DataTypes.STRING,
    vatNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    www: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    phoneNumber2: DataTypes.STRING,
    phoneFax: DataTypes.STRING,
    desc: DataTypes.TEXT
  });
};
