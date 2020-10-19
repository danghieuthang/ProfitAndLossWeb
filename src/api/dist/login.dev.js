"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.getSmsCaptcha = getSmsCaptcha;
exports.getInfo = getInfo;
exports.getCurrentUserNav = getCurrentUserNav;
exports.logout = logout;
exports.get2step = get2step;

var _request = _interopRequireDefault(require("@/utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userApi = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav'
};
/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */

function login(parameter) {
  return (0, _request["default"])({
    url: userApi.Login,
    method: 'post',
    data: parameter
  });
}

function getSmsCaptcha(parameter) {
  return (0, _request["default"])({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  });
}

function getInfo() {
  return (0, _request["default"])({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function getCurrentUserNav() {
  return (0, _request["default"])({
    url: userApi.UserMenu,
    method: 'get'
  });
}

function logout() {
  return (0, _request["default"])({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
/**
 * get user 2step code open?
 * @param parameter {*}
 */


function get2step(parameter) {
  return (0, _request["default"])({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  });
}