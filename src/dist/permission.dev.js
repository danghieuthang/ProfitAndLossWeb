"use strict";

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _store2 = _interopRequireDefault(require("store"));

var _nprogress = _interopRequireDefault(require("nprogress"));

require("@/components/NProgress/nprogress.less");

var _notification = _interopRequireDefault(require("ant-design-vue/es/notification"));

var _domUtil = require("@/utils/domUtil");

var _mutationTypes = require("@/store/mutation-types");

var _locales = require("@/locales");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_nprogress["default"].configure({
  showSpinner: false
}); // NProgress Configuration


var allowList = ['login', 'register', 'registerResult']; // no redirect allowList

var loginRoutePath = '/user/login';
var defaultRoutePath = '/dashboard/workplace';

_router["default"].beforeEach(function (to, from, next) {
  _nprogress["default"].start(); // start progress bar


  to.meta && typeof to.meta.title !== 'undefined' && (0, _domUtil.setDocumentTitle)("".concat((0, _locales.i18nRender)(to.meta.title), " - ").concat(_domUtil.domTitle));
  /* has token */

  if (_store2["default"].get(_mutationTypes.ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({
        path: defaultRoutePath
      });

      _nprogress["default"].done();
    } else {
      // check login user.roles is null
      if (_store["default"].getters.roles.length === 0) {
        // request login userInfo
        _store["default"].dispatch('GetInfo').then(function (res) {
          var roles = res.result && res.result.role; // generate dynamic router

          _store["default"].dispatch('GenerateRoutes', {
            roles: roles
          }).then(function () {
            // 根据roles权限生成可访问的路由表
            // 动态添加可访问路由表
            _router["default"].addRoutes(_store["default"].getters.addRouters); // 请求带有 redirect 重定向时，登录自动重定向到该地址


            var redirect = decodeURIComponent(from.query.redirect || to.path);

            if (to.path === redirect) {
              // set the replace: true so the navigation will not leave a history record
              next(_objectSpread({}, to, {
                replace: true
              }));
            } else {
              // 跳转到目的路由
              next({
                path: redirect
              });
            }
          });
        })["catch"](function () {
          _notification["default"].error({
            message: '错误',
            description: '请求用户信息失败，请重试'
          }); // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息


          _store["default"].dispatch('Logout').then(function () {
            next({
              path: loginRoutePath,
              query: {
                redirect: to.fullPath
              }
            });
          });
        });
      } else {
        next();
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      // 在免登录名单，直接进入
      next();
    } else {
      next({
        path: loginRoutePath,
        query: {
          redirect: to.fullPath
        }
      });

      _nprogress["default"].done(); // if current page is login will not trigger afterEach hook, so manually handle it

    }
  }
});

_router["default"].afterEach(function () {
  _nprogress["default"].done(); // finish progress bar

});