var Logger = require('bunyan');

var streams = [];

if (process.env.NODE_ENV === 'test') {
  streams = [
    {
      level: 'info',
      path: './sanapp-test.log'            // log INFO and above to stdout
    }
  ]
} else {
  streams = [
    {
      level: 'error',
      path: './sanapp-error.log'            // log INFO and above to stdout
    },
    {
      level: 'info',
      stream: process.stdout  // log ERROR and above to a file
    }
  ]
}

log = new Logger({
  name: 'SANapp-api',
  streams: streams
});

Logger = function () { };

Logger.prototype = {
  getSystemLogger: function () {
    return log;
  }
};

module.exports = Logger;
