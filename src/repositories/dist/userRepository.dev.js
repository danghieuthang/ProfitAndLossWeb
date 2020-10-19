"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Repository = _interopRequireDefault(require("./Repository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resource = '/users';
var _default = {
  get: function get() {
    return _Repository["default"].get("".concat(resource));
  },
  login: function login(data) {
    return _Repository["default"].post("".concat(resource, "/login"), data);
  },
  createReceipt: function createReceipt(data) {
    return _Repository["default"].post("".concat(resource), data);
  }
};
exports["default"] = _default;