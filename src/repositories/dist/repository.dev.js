"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _store = _interopRequireDefault(require("@/store"));

var _store2 = _interopRequireDefault(require("store"));

var _notification = _interopRequireDefault(require("ant-design-vue/es/notification"));

var _mutationTypes = require("@/store/mutation-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseDomain = 'https://pnl-retail.azurewebsites.net/';
var apiVersion = 'v1';
var baseURL = "".concat(baseDomain, "/api/").concat(apiVersion);

var request = _axios["default"].create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  },
  timeout: 6000
});

var token = _store2["default"].get(_mutationTypes.ACCESS_TOKEN);

var errorHandler = function errorHandler(error) {
  if (error.response) {
    var data = error.response.data;

    if (data['status-code'] === 403) {
      _notification["default"].error({
        message: 'Forbidden',
        description: data.message
      });
    }

    if (data['status-code'] === 500) {
      _notification["default"].error({
        message: 'Internal Server Error',
        description: data.results
      });
    }

    if (data['status-code'] === 400) {
      _notification["default"].error({
        message: 'Bad request',
        description: data.results
      });
    }

    if (data['status-code'] === 401) {
      _notification["default"].error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      });

      if (token) {
        _store["default"].dispatch('Logout').then(function () {
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        });
      }
    }
  }

  return Promise.reject(error);
}; // xử lí request


request.interceptors.request.use(function (config) {
  var token = _store2["default"].get(_mutationTypes.ACCESS_TOKEN);

  if (token) {
    config.headers.common['Authorization'] = 'Bearer ' + token;
  }

  return config;
}, errorHandler); // xử lí response

request.interceptors.response.use(function (response) {
  var res = response.data;

  if (res['status-code'] === 401) {
    _notification["default"].error({
      message: 'Unauthorized',
      description: 'Authorization verification failed'
    });

    _store["default"].dispatch('Logout').then(function () {
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    });
  } else {
    return res;
  }
}, errorHandler);
var _default = request;
exports["default"] = _default;