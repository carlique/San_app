var Sequelize = require('sequelize');
var dbconfig  = require('config').database;  // we use node-config to handle environments

// initialize database connection
var sequelize = new Sequelize(
  dbconfig.name,
  dbconfig.username,
  dbconfig.password,
  {
    dialect: dbconfig.dialect,
    storage: dbconfig.storage,
    logging:log.debug.bind(log)
  }
);

// load models
var models = [
  'Calculation',
  'Company',
  'Contact',
  'Resource',
  'VAT'
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
  m.Contact.belongsTo(m.Company);
  m.Calculation.belongsTo(m.Company);
  m.Calculation.belongsTo(m.Contact);
  m.Company.hasMany(m.Calculation);
  m.Company.hasMany(m.Contact);
  m.Resource.belongsTo(m.VAT);
})(module.exports);

// export connection
module.exports.sequelize = sequelize;
