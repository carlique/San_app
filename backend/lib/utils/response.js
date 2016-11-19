'use strict';

const SUCCESS = "success";
const FAIL = "fail";
const ERROR = "error";

module.exports = {
  success: function (data, msg) {
    var response = {
      status: SUCCESS,
      data: data,
      message: msg
    }
    return response;
  },
  fail: function (data, msg) {
    var response = {
      status: FAIL,
      data: data,
      message: msg
    }
    return response;
  },

  error: function (data, msg) {
    var response = {
      status: ERROR,
      data: data,
      message: msg
    }
    return response;
  }
}
