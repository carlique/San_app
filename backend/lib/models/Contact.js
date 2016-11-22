'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contact', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    firstName: DataTypes.STRING,
    sureName: DataTypes.STRING,
    title: DataTypes.STRING,
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
