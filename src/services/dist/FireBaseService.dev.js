"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _firebase = _interopRequireDefault(require("@/config/firebase.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = _firebase["default"].database().ref('/news/link');

var FirebaseService =
/*#__PURE__*/
function () {
  function FirebaseService() {
    _classCallCheck(this, FirebaseService);
  }

  _createClass(FirebaseService, [{
    key: "getNews",
    value: function getNews() {
      return db;
    }
  }]);

  return FirebaseService;
}();

var _default = new FirebaseService();

exports["default"] = _default;