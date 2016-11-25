'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VAT', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    vat: DataTypes.DECIMAL(10,2),
  });
};
