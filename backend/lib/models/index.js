var Sequelize = require('sequelize');
var dbconfig  = require('config').database;  // we use node-config to handle environments

var Logger = require('../utils/logger');
var log = new Logger().getSystemLogger();

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
  'Item',
  'Resource',
  'VAT',
  'Version',
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
  m.Contact.belongsTo(m.Company);
  m.Calculation.belongsTo(m.Company);
  m.Calculation.belongsTo(m.Contact);
  m.Calculation.hasMany(m.Version);
  m.Company.hasMany(m.Calculation);
  m.Company.hasMany(m.Contact);
  m.Item.belongsTo(m.Version);
  m.Resource.belongsTo(m.VAT);
  m.Version.belongsTo(m.Calculation);
  m.Version.hasMany(m.Item);
})(module.exports);


// define hooks
(function(m) {
  m.Calculation.afterCreate( function(calculation) {
    return m.Version.create({
      desc: "",
      CalculationId: calculation.id
    });
  });

  m.Version.beforeCreate( function(version) {
    return m.Version.max('number', {
      where: { CalculationId: version.CalculationId }
    })
    .then(max => {
      if (isNaN(max)) max = 0;
      version.number = max + 1;
    })
  })
})(module.exports);

// export connection
module.exports.sequelize = sequelize;
