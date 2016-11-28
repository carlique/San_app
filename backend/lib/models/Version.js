'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Version', {
    number: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    CompanyId: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
    indexes: [{
        unique: true,
        fields: ['number','CompanyId']
    }]

  });
};
