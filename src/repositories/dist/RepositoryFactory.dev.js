"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepositoryFactory = void 0;

var _receiptRepository = _interopRequireDefault(require("./receiptRepository"));

var _userRepository = _interopRequireDefault(require("./userRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var repositories = {
  receipts: _receiptRepository["default"],
  users: _userRepository["default"]
};
var RepositoryFactory = {
  get: function get(name) {
    return repositories[name];
  }
};
exports.RepositoryFactory = RepositoryFactory;