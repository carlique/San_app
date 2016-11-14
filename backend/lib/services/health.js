info = require('./../../package.json');

module.exports =  Health;

function Health () {
}

Health.prototype.getInfo = function () {
  return {
    name:     info.name,
    version:  info.version
  };
};
