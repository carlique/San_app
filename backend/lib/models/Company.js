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
    ico: DataTypes.STRING
  }, {

    classMethods: {
      fromJSON: function(json) {
        var data = JSON.parse(json);
        var company = this.build({
          name: data.name,
          ico: data.ico
        });
        return company;
      }
    },

    instanceMethods: {
      getJSON: function() {
        return JSON.stringify(this);
      }
    }
  });
};
