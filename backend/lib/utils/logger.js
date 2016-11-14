var Logger = require('bunyan');

log = new Logger({
  name: 'regsub-orm',
  streams: [
  {
    stream: process.stdout,
    level: 'debug'
  }
  ],
});

Logger = function () { };

Logger.prototype = {
  getSystemLogger: function () {
    return log;
  }
};

module.exports = Logger;
