"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepositoryFactory = void 0;

var _receiptRepository = _interopRequireDefault(require("./receiptRepository"));

var _userRepository = _interopRequireDefault(require("./userRepository"));

var _storeRepository = _interopRequireDefault(require("./storeRepository"));

var _supplierRepository = _interopRequireDefault(require("./supplierRepository"));

var _receiptTypeRepository = _interopRequireDefault(require("./receiptTypeRepository"));

var _evidenceRepository = _interopRequireDefault(require("./evidenceRepository"));

var _transactionRepository = _interopRequireDefault(require("./transactionRepository"));

var _accountingPeriodRepository = _interopRequireDefault(require("./accountingPeriodRepository"));

var _transactionCategoryRepository = _interopRequireDefault(require("./transactionCategoryRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var repositories = {
  receipts: _receiptRepository["default"],
  users: _userRepository["default"],
  stores: _storeRepository["default"],
  suppliers: _supplierRepository["default"],
  receipt_types: _receiptTypeRepository["default"],
  evidences: _evidenceRepository["default"],
  transactions: _transactionRepository["default"],
  'accounting-periods': _accountingPeriodRepository["default"],
  'transaction-categories': _transactionCategoryRepository["default"]
};
var RepositoryFactory = {
  get: function get(name) {
    return repositories[name];
  }
};
exports.RepositoryFactory = RepositoryFactory;