"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Repository = _interopRequireDefault(require("./Repository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resource = '/transaction-categories';
var _default = {
  get: function get() {
    return _Repository["default"].get("".concat(resource));
  },
  getByTypeId: function getByTypeId(id) {
    return _Repository["default"].get("".concat(resource, "/").concat(id));
  }
};
exports["default"] = _default;