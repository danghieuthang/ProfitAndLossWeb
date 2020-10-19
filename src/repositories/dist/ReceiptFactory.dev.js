"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepositoryFactory = void 0;

var _receiptRepository = _interopRequireDefault(require("./receiptRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var repositories = {
  Receipts: _receiptRepository["default"]
};
var RepositoryFactory = {
  get: function get(name) {
    return repositories[name];
  }
};
exports.RepositoryFactory = RepositoryFactory;