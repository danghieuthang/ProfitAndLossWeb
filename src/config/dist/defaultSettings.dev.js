"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  navTheme: 'dark',
  // theme for nav menu
  primaryColor: '#2894ad',
  // primary color of ant design
  layout: 'sidemenu',
  // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fluid',
  // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: false,
  // sticky header
  fixSiderbar: true,
  // sticky siderbar
  colorWeak: false,
  menu: {
    locale: true
  },
  title: 'Profit And Loss',
  pwa: false,
  iconfontUrl: '',
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
};
exports["default"] = _default;