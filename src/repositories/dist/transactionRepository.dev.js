"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Repository = _interopRequireDefault(require("./Repository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resource = '/transactions';
var _default = {
  search: function search(params) {
    return _Repository["default"].post("".concat(resource, "/search"), params);
  },
  searchById: function searchById(id) {
    return _Repository["default"].get("".concat(resource, "/").concat(id));
  },
  create: function create(data) {
    return _Repository["default"].post("".concat(resource), data);
  },
  approval: function approval(id) {
    return _Repository["default"].put("".concat(resource, "/approval"), id);
  },
  reject: function reject(id) {
    return _Repository["default"].put("".concat(resource, "/reject"), id);
  }
};
exports["default"] = _default;