"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Repository = _interopRequireDefault(require("./Repository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resource = '/accounting-periods';
var _default = {
  search: function search(params) {
    return _Repository["default"].get("".concat(resource, "/search"), {
      params: params
    });
  },
  getAll: function getAll() {
    return _Repository["default"].get("".concat(resource));
  },
  searchById: function searchById(id) {
    return _Repository["default"].get("".concat(resource, "/").concat(id));
  },
  create: function create(data) {
    return _Repository["default"].post("".concat(resource), data);
  },
  update: function update(data) {
    return _Repository["default"].put("".concat(resource), data);
  },
  "delete": function _delete(id) {
    return _Repository["default"].put("".concat(resource, "/delete"), id);
  }
};
exports["default"] = _default;