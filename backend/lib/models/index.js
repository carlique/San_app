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
  'Company',
  'Contact'
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
  m.Contact.belongsTo(m.Company);

//  m.Task.belongsTo(m.User);
//  m.User.hasMany(m.Task);
//  m.User.hasMany(m.PhoneNumber);
})(module.exports);

// export connection
module.exports.sequelize = sequelize;
