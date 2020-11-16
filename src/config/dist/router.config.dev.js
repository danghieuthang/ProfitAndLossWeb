"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constantRouterMap = exports.asyncRouterMap = void 0;

var _layouts = require("@/layouts");

var _icons = require("@/core/icons");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var RouteView = {
  name: 'RouteView',
  render: function render(h) {
    return h('router-view');
  }
};
var asyncRouterMap = [{
  path: '/',
  name: 'index',
  component: _layouts.BasicLayout,
  meta: {
    title: 'menu.home'
  },
  redirect: '/dashboard',
  children: [// dashboard
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/Analysis',
    component: RouteView,
    meta: {
      title: 'menu.dashboard',
      keepAlive: true,
      icon: _icons.bxAnaalyse
    },
    children: [{
      path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
      name: 'Analysis',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/dashboard/Analysis'));
        });
      },
      meta: {
        title: 'menu.dashboard.analysis',
        keepAlive: false
      }
    }]
  }, {
    path: '/profit-and-loss',
    name: 'ProfitAndLoss',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/profitandloss/ProfitAndLoss'));
      });
    },
    meta: {
      title: 'Profit And Loss',
      icon: 'table'
    }
  }, {
    path: '/store',
    name: 'store',
    hideChildrenInMenu: true,
    component: RouteView,
    redirect: '/stores',
    meta: {
      title: 'Stores',
      icon: 'table'
    },
    children: [{
      path: '/stores',
      name: 'Store',
      hidden: true,
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/store/Store'));
        });
      },
      meta: {
        title: 'List all Store',
        keepAlive: false
      } // children: stores

    }, {
      path: '/stores/:store',
      name: 'Transaction In Store',
      hidden: true,
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/transaction/TransactionInStore'));
        });
      },
      meta: {
        title: 'Transaction in Store',
        keepAlive: false
      },
      props: {} // children: stores

    }, {
      path: '/stores/:store/transactions/:id/split',
      name: 'Split Transaction',
      hidden: true,
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/transaction/SplitTransaction'));
        });
      },
      meta: {
        title: 'Transaction Split',
        keepAlive: false
      }
    }, {
      path: '/stores/:store/transactions/:id',
      name: 'Detail Transaction',
      hidden: true,
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/transaction/TransactionDetail'));
        });
      },
      meta: {
        title: 'Transaction Details',
        keepAlive: true
      }
    }]
  }, // // transaction
  // {
  //   path: '/transactions',
  //   name: 'transaction',
  //   redirect: '/transactions/all',
  //   component: RouteView,
  //   hideChildrenInMenu: true,
  //   meta: { title: 'Transactions', icon: 'table' },
  //   children: [
  //     {
  //       path: '/transactions/all',
  //       name: 'Transaction',
  //       hidden: true,
  //       component: () => import('@/views/transaction/Transaction'),
  //       meta: { title: 'All Transaction', keepAlive: false }
  //       // children:
  //     },
  //     {
  //       path: '/transactions/:brand/:store',
  //       name: 'Transaction In Store',
  //       hidden: true,
  //       component: () => import('@/views/transaction/TransactionInStore'),
  //       meta: { title: 'Transaction in Store', keepAlive: false }
  //       // children: stores
  //     },
  //     {
  //       path: '/transactions/:brand/:store/split/:id',
  //       name: 'Split Transaction',
  //       hidden: true,
  //       component: () => import('@/views/transaction/SplitTransaction'),
  //       meta: { title: 'Split Transaction', keepAlive: false }
  //     },
  //     {
  //       path: '/transactions/:brand/:store/:id',
  //       name: 'Detail Transaction',
  //       hidden: true,
  //       component: () => import('@/views/transaction/TransactionDetail'),
  //       meta: { title: 'Detail Transaction', keepAlive: true }
  //     }
  //   ]
  // },
  {
    path: '/accounting-period',
    name: 'accounting-period',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/accountingperiod/AccountingPeriod'));
      });
    },
    meta: {
      title: 'Accoungting Period',
      icon: 'table'
    }
  }]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}];
/**
 * 基础路由
 * @type { *[] }
 */

exports.asyncRouterMap = asyncRouterMap;
var constantRouterMap = [{
  path: '/user',
  component: _layouts.UserLayout,
  redirect: '/user/login',
  hidden: true,
  children: [{
    path: 'login',
    name: 'login',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/user/Login'));
      });
    }
  }, {
    path: 'recover',
    name: 'recover',
    component: undefined
  }]
}, {
  path: '/404',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/exception/404'));
    });
  }
}];
exports.constantRouterMap = constantRouterMap;