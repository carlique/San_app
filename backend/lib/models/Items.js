'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Items', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0
    }
    unit: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0
    }
    discount: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0
    }
    vat: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0
    }
  });
};
