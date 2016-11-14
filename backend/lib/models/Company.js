'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Company', {
    name: DataTypes.STRING,
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
