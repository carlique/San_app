'use strict';

const SUCCESS = "success";
const FAIL = "fail";
const ERROR = "error";

module.exports = {
  success: function (data, msg, info) {
    return res(SUCCESS, data, msg, info);
  },
  fail: function (data, msg, info) {
    return res(FAIL, data, msg, info);
  },

  error: function (data, msg, info) {
    return res(ERROR, data, msg, info);
  }
}

function res (status, data, msg, info) {
  var response = {
    "status": status,
    "data": data,
    "message": msg,
    "more info": info
  }
  return response;
}
