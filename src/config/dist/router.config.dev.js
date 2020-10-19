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
  redirect: '/dashboard/workplace',
  children: [// dashboard
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/workplace',
    component: RouteView,
    meta: {
      title: 'menu.dashboard',
      keepAlive: true,
      icon: _icons.bxAnaalyse,
      permission: ['dashboard']
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
        keepAlive: false,
        permission: ['dashboard']
      }
    }, {
      path: '/dashboard/workplace',
      name: 'Workplace',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/dashboard/Workplace'));
        });
      },
      meta: {
        title: 'menu.dashboard.workplace',
        keepAlive: true,
        permission: ['dashboard']
      }
    }]
  }, // forms
  {
    path: '/form',
    redirect: '/form/base-form',
    component: RouteView,
    meta: {
      title: 'Form',
      icon: 'form',
      permission: ['form']
    },
    children: [{
      path: '/form/base-form',
      name: 'BaseForm',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/form/basicForm'));
        });
      },
      meta: {
        title: 'Base form',
        keepAlive: true,
        permission: ['form']
      }
    }, {
      path: '/form/step-form',
      name: 'StepForm',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/form/stepForm/StepForm'));
        });
      },
      meta: {
        title: 'Step form',
        keepAlive: true,
        permission: ['form']
      }
    }, {
      path: '/form/advanced-form',
      name: 'AdvanceForm',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/form/advancedForm/AdvancedForm'));
        });
      },
      meta: {
        title: 'Advance form',
        keepAlive: true,
        permission: ['form']
      }
    }]
  }, // list
  {
    path: '/list',
    name: 'list',
    component: RouteView,
    redirect: '/list/table-list',
    meta: {
      title: 'Table list',
      icon: 'table',
      permission: ['table']
    },
    children: [{
      path: '/list/table-list/:pageNo([1-9]\\d*)?',
      name: 'TableListWrapper',
      hideChildrenInMenu: true,
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/receipt/ReceiptList'));
        });
      },
      meta: {
        title: 'Receipts',
        keepAlive: true,
        permission: ['table']
      }
    }, {
      path: '/list/basic-list',
      name: 'BasicList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/list/BasicList'));
        });
      },
      meta: {
        title: 'Basic List',
        keepAlive: true,
        permission: ['table']
      }
    }, {
      path: '/list/search',
      name: 'SearchList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/list/search/SearchLayout'));
        });
      },
      redirect: '/list/search/article',
      meta: {
        title: 'Search List',
        keepAlive: true,
        permission: ['table']
      },
      children: [{
        path: '/list/search/article',
        name: 'SearchArticles',
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('../views/list/search/Article'));
          });
        },
        meta: {
          title: 'Search Articles',
          permission: ['table']
        }
      }, {
        path: '/list/search/project',
        name: 'SearchProjects',
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('../views/list/search/Projects'));
          });
        },
        meta: {
          title: 'Search Projects',
          permission: ['table']
        }
      }, {
        path: '/list/search/application',
        name: 'SearchApplications',
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('../views/list/search/Applications'));
          });
        },
        meta: {
          title: 'Search Applications',
          permission: ['table']
        }
      }]
    }]
  }, // profile
  {
    path: '/profile',
    name: 'profile',
    component: RouteView,
    redirect: '/profile/basic',
    meta: {
      title: 'profile',
      icon: 'profile',
      permission: ['profile']
    },
    children: [{
      path: '/profile/basic',
      name: 'ProfileBasic',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/profile/basic'));
        });
      },
      meta: {
        title: 'Profile Basic',
        permission: ['profile']
      }
    }, {
      path: '/profile/advanced',
      name: 'ProfileAdvanced',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/profile/advanced/Advanced'));
        });
      },
      meta: {
        title: 'Profile Advanced',
        permission: ['profile']
      }
    }]
  }, // result
  {
    path: '/result',
    name: 'result',
    component: RouteView,
    redirect: '/result/success',
    meta: {
      title: 'result',
      icon: 'check-circle-o',
      permission: ['result']
    },
    children: [{
      path: '/result/success',
      name: 'ResultSuccess',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/result/Success'));
        });
      },
      meta: {
        title: 'Result Success',
        keepAlive: false,
        hiddenHeaderContent: true,
        permission: ['result']
      }
    }, {
      path: '/result/fail',
      name: 'ResultFail',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/result/Error'));
        });
      },
      meta: {
        title: 'Result Fail',
        keepAlive: false,
        hiddenHeaderContent: true,
        permission: ['result']
      }
    }]
  }, // Exception
  {
    path: '/exception',
    name: 'exception',
    component: RouteView,
    redirect: '/exception/403',
    meta: {
      title: 'exception',
      icon: 'warning',
      permission: ['exception']
    },
    children: [{
      path: '/exception/403',
      name: 'Exception403',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/exception/403'));
        });
      },
      meta: {
        title: '403',
        permission: ['exception']
      }
    }, {
      path: '/exception/404',
      name: 'Exception404',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/exception/404'));
        });
      },
      meta: {
        title: '404',
        permission: ['exception']
      }
    }, {
      path: '/exception/500',
      name: 'Exception500',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/exception/500'));
        });
      },
      meta: {
        title: '500',
        permission: ['exception']
      }
    }]
  }, // account
  {
    path: '/account',
    component: RouteView,
    redirect: '/account/center',
    name: 'account',
    meta: {
      title: 'Account',
      icon: 'user',
      keepAlive: true,
      permission: ['user']
    },
    children: [{
      path: '/account/center',
      name: 'center',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/account/center'));
        });
      },
      meta: {
        title: 'Center',
        keepAlive: true,
        permission: ['user']
      }
    }, {
      path: '/account/settings',
      name: 'settings',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/account/settings/Index'));
        });
      },
      meta: {
        title: 'Settings',
        hideHeader: true,
        permission: ['user']
      },
      redirect: '/account/settings/base',
      hideChildrenInMenu: true,
      children: [{
        path: '/account/settings/base',
        name: 'BaseSettings',
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/account/settings/BaseSetting'));
          });
        },
        meta: {
          title: 'Base Settings',
          hidden: true,
          permission: ['user']
        }
      }, {
        path: '/account/settings/security',
        name: 'SecuritySettings',
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/account/settings/Security'));
          });
        },
        meta: {
          title: 'Security Settings',
          hidden: true,
          keepAlive: true,
          permission: ['user']
        }
      }, {
        path: '/account/settings/custom',
        name: 'CustomSettings',
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/account/settings/Custom'));
          });
        },
        meta: {
          title: 'Custom Settings',
          hidden: true,
          keepAlive: true,
          permission: ['user']
        }
      }, {
        path: '/account/settings/binding',
        name: 'BindingSettings',
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/account/settings/Binding'));
          });
        },
        meta: {
          title: 'Binding Settings',
          hidden: true,
          keepAlive: true,
          permission: ['user']
        }
      }, {
        path: '/account/settings/notification',
        name: 'NotificationSettings',
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require('@/views/account/settings/Notification'));
          });
        },
        meta: {
          title: 'Notification Settings',
          hidden: true,
          keepAlive: true,
          permission: ['user']
        }
      }]
    }]
  } // other

  /*
  {
    path: '/other',
    name: 'otherPage',
    component: PageView,
    meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
    redirect: '/other/icon-selector',
    children: [
      {
        path: '/other/icon-selector',
        name: 'TestIconSelect',
        component: () => import('@/views/other/IconSelectorView'),
        meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
      },
      {
        path: '/other/list',
        component: RouteView,
        meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
        redirect: '/other/list/tree-list',
        children: [
          {
            path: '/other/list/tree-list',
            name: 'TreeList',
            component: () => import('@/views/other/TreeList'),
            meta: { title: '树目录表格', keepAlive: true }
          },
          {
            path: '/other/list/edit-table',
            name: 'EditList',
            component: () => import('@/views/other/TableInnerEditList'),
            meta: { title: '内联编辑表格', keepAlive: true }
          },
          {
            path: '/other/list/user-list',
            name: 'UserList',
            component: () => import('@/views/other/UserList'),
            meta: { title: '用户列表', keepAlive: true }
          },
          {
            path: '/other/list/role-list',
            name: 'RoleList',
            component: () => import('@/views/other/RoleList'),
            meta: { title: '角色列表', keepAlive: true }
          },
          {
            path: '/other/list/system-role',
            name: 'SystemRole',
            component: () => import('@/views/role/RoleList'),
            meta: { title: '角色列表2', keepAlive: true }
          },
          {
            path: '/other/list/permission-list',
            name: 'PermissionList',
            component: () => import('@/views/other/PermissionList'),
            meta: { title: '权限列表', keepAlive: true }
          }
        ]
      }
    ]
  }
  */
  ]
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