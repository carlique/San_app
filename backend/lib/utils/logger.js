'use strict'

var Logger = require('bunyan');

var streams = [];

if (process.env.NODE_ENV === 'test') {
  streams = [
    {
      level: 'info',
      path: './sanapp-test.log'         // log INFO and above to test.log
    }
  ]
} else {
  streams = [
    {
      level: 'error',
      path: './sanapp-error.log'        // log INFO and above to error.log
    },
    {
      level: 'info',
      stream: process.stdout            // log ERROR and above to stdout
    }
  ]
}

var log = new Logger({
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
