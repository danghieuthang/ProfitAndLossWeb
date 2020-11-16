"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _firebase = _interopRequireDefault(require("firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = {
  apiKey: 'AIzaSyB0bAvWYtuR-EP0YiultKtT2yhdW40HgMw',
  authDomain: 'swdk13.firebaseapp.com',
  databaseURL: 'https://swdk13.firebaseio.com',
  projectId: 'swdk13',
  storageBucket: 'swdk13.appspot.com',
  messagingSenderId: '281352713221',
  appId: '1:281352713221:web:1c2a5d1388131ccb70986c',
  measurementId: 'G-498BY3CXM2'
};

var _default = !_firebase["default"].apps.length ? _firebase["default"].initializeApp(config) : _firebase["default"].app();

exports["default"] = _default;