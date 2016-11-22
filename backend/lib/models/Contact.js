'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contact', {
    firstName: DataTypes.STRING,
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    title: DataTypes.STRING,
    position: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    post: DataTypes.STRING,
    country: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    phoneNumber2: DataTypes.STRING,
    email: DataTypes.STRING,
    www: DataTypes.STRING,
    desc: DataTypes.TEXT
  });
};
