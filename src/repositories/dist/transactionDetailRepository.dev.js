"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Repository = _interopRequireDefault(require("./Repository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resource = '/transactions';
var _default = {
  create: function create(data) {
    return _Repository["default"].post("".concat(resource), data);
  },
  update: function update(data) {
    return _Repository["default"].put("".concat(resource), data);
  },
  searchByTransactionId: function searchByTransactionId(id) {
    return _Repository["default"].get("".concat(resource, "/receipt/").concat(id));
  },
  search: function search(params) {
    return _Repository["default"].get("".concat(resource), {
      params: params
    });
  }
};
exports["default"] = _default;