'use strict';

// TODO: add type M:N relationship
// TODO: add group M:N relationship

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Resource', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    altName: DataTypes.STRING,
    count: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2),
    unit: DataTypes.STRING,
    desc: DataTypes.TEXT
  });
};
