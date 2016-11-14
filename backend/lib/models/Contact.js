module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contact', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  });
};
