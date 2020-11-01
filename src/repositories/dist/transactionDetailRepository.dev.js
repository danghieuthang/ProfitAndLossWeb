"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Repository = _interopRequireDefault(require("./Repository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resource = '/transaction-details';
var _default = {
  create: function create(data) {
    return _Repository["default"].post("".concat(resource), data);
  }
};
exports["default"] = _default;