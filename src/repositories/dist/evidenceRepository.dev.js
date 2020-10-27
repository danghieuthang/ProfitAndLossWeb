"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Repository = _interopRequireDefault(require("./Repository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resource = '/evidences';
var _default = {
  addEvidence: function addEvidence(formData) {
    return _Repository["default"].post("".concat(resource), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};
exports["default"] = _default;