"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/stable");

require("regenerator-runtime/runtime");

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store/"));

var _locales = _interopRequireDefault(require("./locales"));

var _request = require("./utils/request");

var _proLayout = _interopRequireWildcard(require("@ant-design-vue/pro-layout"));

var _themePluginConfig = _interopRequireDefault(require("../config/themePluginConfig"));

require("./mock");

var _bootstrap = _interopRequireDefault(require("./core/bootstrap"));

require("./core/lazy_use");

require("./permission");

require("./utils/filter");

require("./global.less");

var _vuefire = _interopRequireDefault(require("vuefire"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// with polyfills
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// use lazy load components
// permission control
// global filter
// global style
_vue["default"].config.productionTip = false; // mount axios to `Vue.$http` and `this.$http`

_vue["default"].use(_request.VueAxios); // use pro-layout components


_vue["default"].component('pro-layout', _proLayout["default"]);

_vue["default"].component('page-container', _proLayout.PageHeaderWrapper);

_vue["default"].component('page-header-wrapper', _proLayout.PageHeaderWrapper);

window.umi_plugin_ant_themeVar = _themePluginConfig["default"].theme;
new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  i18n: _locales["default"],
  VueFire: _vuefire["default"],
  // init localstorage, vuex
  created: _bootstrap["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');