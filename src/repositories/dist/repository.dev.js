"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseDomain = 'https://localhost:44383'; // const baseDomain = 'https://pnl-swd.azurewebsites.net/'

var apiVersion = 'v1';
var baseURL = "".concat(baseDomain, "/api/").concat(apiVersion);
var TOKEN = 'vidu';

var _default = _axios["default"].create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + TOKEN
  }
});

exports["default"] = _default;