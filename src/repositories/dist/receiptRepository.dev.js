"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Repository = _interopRequireDefault(require("./Repository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resource = '/receipts';
var _default = {
  get: function get(params) {
    return _Repository["default"].get("".concat(resource), {
      params: params
    });
  },
  createReceipt: function createReceipt(data) {
    return _Repository["default"].post("".concat(resource), data);
  },
  getEvidenceByTransactionId: function getEvidenceByTransactionId(id) {
    return _Repository["default"].get("".concat(resource, "/search/").concat(id));
  }
};
exports["default"] = _default;