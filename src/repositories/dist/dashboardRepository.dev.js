"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Repository = _interopRequireDefault(require("./Repository"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resource = '/dashboards';
var baseDomain = 'https://pnl-retail.azurewebsites.net/'; // const baseDomain = 'https://localhost:44383'

var apiVersion = 'V1';
var baseURL = "".concat(baseDomain, "/api/").concat(apiVersion);

var request = _axios["default"].create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  },
  timeout: 6000
});

var _default = {
  getExpensePie: function getExpensePie(params) {
    return _Repository["default"].get("".concat(resource, "/pie/expense"), {
      params: params
    });
  },
  getRevenuesPie: function getRevenuesPie(params) {
    return _Repository["default"].get("".concat(resource, "/pie/revenues"), {
      params: params
    });
  },
  getRevenueExpense: function getRevenueExpense(params) {
    return _Repository["default"].get("".concat(resource, "/revenue-expenses"), {
      params: params
    });
  },
  getProfitAndLoss: function getProfitAndLoss(params) {
    return _Repository["default"].get("".concat(resource, "/profit-and-loss"), {
      params: params
    });
  },
  "export": function _export(params) {
    return request.get("".concat(resource, "/profit-and-loss/export"), {
      params: params,
      responseType: 'blob'
    });
  }
};
exports["default"] = _default;